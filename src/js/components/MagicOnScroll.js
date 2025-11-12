export class MagicOnScroll {
    constructor() {
        this.objects = document.querySelectorAll('[data-mos]');
        this.raf = null;
        this.objHandlers = [];
        this.visibleObjects = new Set();
        this.observer = null;
        this.mutationObserver = null;
        this.lastScrollY = window.scrollY;

        this.init()
    }

    init() {
        this.setupIntersectionObserver();
        this.setupMutationObserver();

        this.objects = document.querySelectorAll('[data-mos]');
        this.objects.forEach(object => {
            this.objHandlers.push(new MosHandler(object));
        });
        this.startRAF();

        window.addEventListener('resize', () => this.onWindowEvent());
    }

    setupMutationObserver() {
        if (!this.mutationObserver ) {
            this.mutationObserver = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.matches("[data-mos]")) {
                            console.log("Neues animierbares Element erkannt:", node);
                            this.objHandlers.push(new MosHandler(node));
                        }
                    });
                });
            });

            this.mutationObserver .observe(document.body, { childList: true, subtree: true });
        }
    }

    startRAF() {
        if (!this.raf) {
            this.raf = requestAnimationFrame(() => this.loop());
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-40px',
            threshold: 0 
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Objekt ist sichtbar: zu sichtbaren Objekten hinzufügen
                    if (!this.visibleObjects.has(entry.target)) {
                        this.visibleObjects.add(entry.target);
                    }
                } else {
                    // Objekt ist nicht sichtbar: aus sichtbaren Objekten entfernen
                    this.visibleObjects.delete(entry.target);
                }
            });
        }, observerOptions);

        // Beobachten der Objekte
        this.objects.forEach(object => this.observer.observe(object));
    }

    loop() {
        const currentScrollY = window.scrollY;
        if (currentScrollY !== this.lastScrollY) {
            this.objHandlers.forEach(objHandler => {
                if (this.visibleObjects.has(objHandler.object)) {
                    objHandler.animate();
                }
            });
            this.lastScrollY = currentScrollY;
        }
        this.raf = requestAnimationFrame(() => this.loop());
    }

    onWindowEvent() {
        cancelAnimationFrame(this.raf);
        this.raf = null;
        this.startRAF();
    }
}

class MosHandler {
    constructor(object) {
        this.object = object;
        this.triggerPoint = window.innerHeight / 2;

        // startViews of the scroll Animations when set in the object datasets
        this.startValues = object.dataset.mosStart;
        // point on the viewport where the start is triggered (default is the bottom of the viewport)
        this.startView = window.innerHeight;
        // postion of the object who triggers the start (default is the top of the object)
        this.startTrigger = 0;

        // endViews of the scroll Animations when set in the object datasets
        this.endValues = object.dataset.mosEnd;
        // point on the viewport where the end is triggered (default is the top of the viewport)
        this.endView = 0;
        // postion of the object who triggers the end (default is the end of the object)
        this.endTrigger = 1;

        this.objRect = object.getBoundingClientRect();


        // this.distance = parseFloat(object.dataset.distance);
        this.trigger = object.dataset.scrolltrigger;
        
        this.id = object.dataset.mosId;
        this.stepCount = parseInt(object.dataset.mosSteps)
        this.steps = object.querySelectorAll('[data-mos-step]');
        this.namespace = '';
        this.curve = {
            p0: {x: 0, y: 0},
            p1: {x: 0.48, y: 0},
            p2: {x: 0.44, y: 1},
            p3: {x: 1, y: 1}
        }

        if (this.object.dataset.mosEase) {
            const values = this.object.dataset.mosEase.split(" ").map(v => parseFloat(v));
            if (values.length === 4) {
                this.curve = { p0: {x: 0, y: 0}, p1: {x: values[0], y: values[1]}, p2: {x: values[2], y: values[3]}, p3: {x: 1, y: 1} };
            }
        }

        if(this.object.hasAttribute('data-mos-letters')) {
            this.letterMagic = true;
            this.letters = this.object.querySelectorAll('[data-mos-letter]');
            this.letterCount = this.letters.length;
            this.overlapFactor = parseFloat(this.object.dataset.mosOverlap) || 0.4; 
            console.log(this.overlapFactor);
        }

        this.marker = object.hasAttribute('data-mos-marker');

        this.init();
    }

    init() {
        // Namespace für CSS-Variablen
        if(this.id != '' && this.id != undefined && this.id != null) {
            this.namespace = '-'+this.id;
        }

        if(this.trigger != '' && this.trigger != undefined && this.trigger != null) {
            // check if trigger set globally
            let options = this.trigger.split(' ');
            if(options.length > 1 && options[1] == 'global') {
                this.trigger = document.querySelector('[data-global-trigger="'+options[0]+'"]'); 
            } else {
                this.trigger = document.querySelector('[data-trigger="'+this.trigger+'"]');
            }
        }

        this.setStartAndEnd();

        this.animate(true);

        if(this.marker) {
            this.createMarkers();
        }
    }

    update() {
        this.objRect = this.object.getBoundingClientRect();
        this.removeMarkers();
        this.setStartAndEnd();
        this.createMarkers();

        this.animate();
    }

    setStartAndEnd() {        
        if(this.startValues != undefined && this.startValues != '') {
            this.startValues = this.object.dataset.mosStart.split(' ');
            if(this.startValues[0]) {
                this.startView = parseFloat(this.startValues[0]);
                this.startView = window.innerHeight * (+this.startView);
            }
            if(this.startValues[1]) {
                this.startTrigger = parseFloat(this.startValues[1]);
            }
        }

        if(this.endValues != undefined && this.endValues != '') {   
            this.endValues = this.object.dataset.mosEnd.split(' ');
            if(this.endValues[0]) {
                this.endView = parseFloat(this.endValues[0]);
                this.endView = window.innerHeight * (+this.endView);
            }
            if(this.endValues[1]) {
                this.endTrigger = parseFloat(this.endValues[1]);
            }
        }
    }

    animate(init = false) {
        let percentage = 0;
        this.objRect = this.object.getBoundingClientRect();
        const triggerPosStart   = this.objRect.top + (this.objRect.height * (+this.startTrigger));
        const triggerPosEnd     = this.objRect.top + (this.objRect.height * (+this.endTrigger));

        if(this.markerStart) {
            this.markerStart.style.top = triggerPosStart + 'px';
        }
        if(this.markerEnd) {
            this.markerEnd.style.top = triggerPosEnd + 'px';
        }

        if(init && parseFloat(this.object.style.getPropertyValue('--percentage'+this.namespace)) === 1) {
            return
        }

        // Streckenberechnung
        var TriggerDistance = triggerPosEnd - triggerPosStart;
        var ViewDistance = this.startView - this.endView;

        // Berechnung des Prozentsatzes 
        percentage = ((triggerPosStart + TriggerDistance) - this.endView) / (ViewDistance + TriggerDistance);
        
        // Invertieren des Prozentsatzes
        percentage = 1 - percentage;

        // Einschränken des Prozentsatzes auf den Bereich [0, 1]
        percentage = Math.min(Math.max(percentage, 0), 1);
        percentage =  Math.round(percentage * 1000) / 1000;
        const bezier = this.curve;
        let easedPercentage = this.easer(percentage, bezier.p0, bezier.p1, bezier.p2, bezier.p3);
        easedPercentage =  Math.round(easedPercentage * 1000) / 1000;

        if (parseFloat(this.object.style.getPropertyValue('--percentage'+this.namespace)) !== percentage) {
            this.object.style.setProperty('--percentage'+this.namespace, percentage);
            this.object.style.setProperty('--percentage'+this.namespace+'--eased', easedPercentage);

            if(this.stepCount != '0' && this.stepCount != undefined && !isNaN(this.stepCount)) {
                this.updateSteps(percentage);
            }
        }

        if(this.letterMagic) {
            this.letters.forEach(letter => {
                this.updateLetter(letter, percentage);
            });
        }

        if(percentage < 1 && this.object.dataset.scrolled != 'false') {
            this.object.dataset.scrolled = false
        } else if(percentage >= 1 && this.object.dataset.scrolled != 'true') {
            this.object.dataset.scrolled = true
        }

        if(percentage > 0 && percentage < 1 && this.object.dataset.inprogress != 'true') {
            this.object.dataset.inprogress = true;
        } else if((percentage == 1 || percentage == 0) && this.object.dataset.inprogress != 'false') {
            this.object.dataset.inprogress = false;
        }
    }

    updateLetter(letter, percentage) {
        let letterPosition = parseInt(letter.dataset.mosLetter);
        percentage = percentage * 100;

        let step = 100 / (this.letterCount);
        let area = step * letterPosition;
        let letterPercentage = ((percentage * 1) - (area)) / step * 100;

        letterPercentage = Math.min(Math.max(letterPercentage, 0), 100);
        letterPercentage =  letterPercentage / 100;

        const bezier = this.curve;
        let easedPercentage = this.easer(letterPercentage, bezier.p0, bezier.p1, bezier.p2, bezier.p3);
        easedPercentage =  Math.round(easedPercentage * 1000) / 1000;

        if (parseFloat(letter.style.getPropertyValue('--letter-percentage')) !== easedPercentage) {
            letter.style.setProperty('--letter-percentage', easedPercentage);
        }
    }

    updateSteps(percentage) {
        if(this.stepCount != '' && this.stepCount != undefined && this.stepCount != null) {

            let step = 1 / (this.stepCount);
            let currentStep = Math.floor(percentage / step) + 1;
            this.object.dataset.step = currentStep;

            if((currentStep == 1 && this.object.dataset.edge != 'true') || (currentStep == this.stepCount + 1 && this.object.dataset.edge != 'true')) {
                this.object.dataset.edge = "true";
            } else if(currentStep != 1 && currentStep != this.stepCount + 1 && this.object.dataset.edge != 'false') {
                this.object.dataset.edge = "false";
            }

            if(this.steps != undefined) {
                this.steps.forEach(step => {
                    if(step.dataset.magicStep == currentStep && step.dataset.active != 'true') {
                        step.dataset.active = "true";
                    } else if(step.dataset.magicStep != currentStep && step.dataset.active != 'false') {
                        step.dataset.active = "false";
                    }
                });
            }
        }
    }

    easer(input, p0, p1, p2, p3) {
        // Clamping the input value to the range [0, 1]
        input = Math.max(0, Math.min(1, input));
    
        // Bezier function equation: B(t) = (1-t)^3 * p0 + 3*(1-t)^2 * t * p1 + 3*(1-t) * t^2 * p2 + t^3 * p3
        const t = input;
        const oneMinusT = 1 - t;
    
        const cubicTerm = t * t * t;
        const quadraticTerm = 3 * t * t * oneMinusT;
        const linearTerm = 3 * t * oneMinusT * oneMinusT;
        const constantTerm = oneMinusT * oneMinusT * oneMinusT;
    
        // Calculate x and y values for the bezier curve
        const x = constantTerm * p0.x + linearTerm * p1.x + quadraticTerm * p2.x + cubicTerm * p3.x;
        const y = constantTerm * p0.y + linearTerm * p1.y + quadraticTerm * p2.y + cubicTerm * p3.y;
    
        // Return the value (x, y) if needed; currently returns only y for easing.
        return y;
    }

    createMarker(value, position) {
        let marker = document.createElement('div');
        marker.classList.add('mos-marker', 'fixed', 'z-1000', '-translate-y-1/2', 'left-0');
        marker.style.top = position + 'px';
        if(value == 'start') {
            marker.innerHTML = 'Start';
            marker.style.color = 'green';
        } else {
            marker.innerHTML = 'End';
            marker.style.color = 'red';
        }
        document.body.appendChild(marker);

        return marker;
    }

    createMarkers() {
        this.markerStart = this.createMarker('start', this.objRect.top + (this.objRect.height * (+this.startTrigger)));
        this.markerEnd = this.createMarker('end', this.objRect.top + (this.objRect.height * (+this.endTrigger)));

        this.viewMarkerStart = this.createMarker('start', this.startView);
        this.viewMarkerEnd = this.createMarker('end', this.endView);
    }

    removeMarkers() {
        [this.markerStart, this.markerEnd, this.viewMarkerStart, this.viewMarkerEnd]
        .forEach(marker => marker?.remove());
    }
}
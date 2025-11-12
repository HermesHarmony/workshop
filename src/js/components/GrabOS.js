export class GrabOS {

    constructor(cookies) {

        this.startX = 0; this.startY = 0;
        this.cursorX = 0; this.cursorY = 0;
        this.initX = 0, this.initY = 0;
        this.minW = 768;
        this.moveElement = false;

        this.cookie = cookies;

        this.deviceType = "";

        // Ceck Touch Device
        this.isTouchDevice();

        window.addEventListener("mousedown", (e) => {
            this.checkTargetAndInit(e);
        });

        window.addEventListener("mousemove", (e) => {
            this.moveTarget(e);
        });
            
        //mouse up / touch end
        window.addEventListener("mouseup", this.stopMovement);
    }

    checkTargetAndInit(e) {
        if(window.innerWidth > this.minW) {
            this.startX = !this.isTouchDevice() ? e.clientX : e.touches[0].clientX;
            this.startY = !this.isTouchDevice() ? e.clientY : e.touches[0].clientY;
            this.moveElement = e.target.closest('[data-grabOS]');

            if(this.moveElement && this.moveElement != undefined) {
                let xy = this.getTranslateValues(this.moveElement);
                this.initX = parseInt(xy[0]) || 0;
                this.initY = parseInt(xy[1]) || 0;
            }
        }
    }

    moveTarget(e) {
        this.cursorX = !this.isTouchDevice() ? e.clientX : e.touches[0].clientX;
        this.cursorY = !this.isTouchDevice() ? e.clientY : e.touches[0].clientY;

        let trackX = (this.startX - this.cursorX) * -1;
        let trackY = (this.startY - this.cursorY) * -1;

        if(this.moveElement && this.moveElement != undefined) {
            document.body.classList.add('select-none');
            let card = this.moveElement;

            let moreX = trackX + this.initX;
            let moreY = trackY + this.initY;

            card.classList.add('transform');

            card.style.setProperty('--tw-translate-x', moreX + "px")
            card.style.setProperty('--tw-translate-y', moreY + "px")

            card.dataset.grabX = moreX; 
            card.dataset.grabY = moreY;

            this.puzzleSolved();
        }
    }
   

    isTouchDevice = () => {
        try {
            // Try to create a TouchEvent
            document.createEvent("TouchEvent");
            this.deviceType = "touch";
            return true;
        } catch (e) {
            this.deviceType = "mouse";
            return false;
        }
    };

    cookieTrash = () => {
        let message = document.getElementById('cookie-message');
        let trash = document.getElementById('cookie-trash');

        if(this.moveElement === message && trash != undefined) {
            let bulletRect = message.getBoundingClientRect();
            let targetRect = trash.getBoundingClientRect();

            if(this.isOverlapping(bulletRect, targetRect)) {
                this.cookie.closeAnimated();
            } 
        }
    }

    stopMovement = () => {
        this.cookieTrash()
        this.moveElement = false;
        document.body.classList.remove('select-none');
    };

    puzzleSolved = () => {
        let bullet = document.getElementById('bullet');
        let target = document.getElementById('target');

        if(this.moveElement === bullet && target != undefined) {
            let bulletRect = bullet.querySelector('.marker').getBoundingClientRect();
            let targetRect = target.querySelector('.marker').getBoundingClientRect();

            if(this.isOverlapping(bulletRect, targetRect)) {
                console.log('Hurray! Solved! 🎉')

                bullet.style.setProperty('--tw-translate-x', "0px")
                bullet.style.setProperty('--tw-translate-y', "0px")

                delete bullet.dataset.grabos

                this.stopMovement()
            } 
        }
    }

    isOverlapping(rect1, rect2) {
        if(!(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom)) {
            return true 
        } else {
            return false
        }
    }

    getTranslateValues (element) {
        const style = window.getComputedStyle(element)
        const matrix = style['transform'];
      
        // No transform property. Simply return 0 values.
        if (matrix === 'none' || typeof matrix === 'undefined') {
            return {
                x: 0,
                y: 0,
            }
        }

        // Can either be 2d or 3d transform
        const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

        return [
            matrixValues[4],
            matrixValues[5],
        ]
    }
}
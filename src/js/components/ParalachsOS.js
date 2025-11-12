// para🐟

export class ParalachsOS {
    constructor() {
        this.speed = 0.5;
        this.objects = document.querySelectorAll('[data-paralachs]');

        this.init();
    }

    init() {  
        this.render();

        window.addEventListener("scroll", (e) => {
            this.render();
        }, { passive: true });
    }

    render() {
        this.objects.forEach(object => {
            this.setObjectPosition(object);
        });    
    }

    setObjectPosition(object) {
        const level = object.dataset.paralachs;
        if(level != undefined || level != '') {
            object.style.setProperty('--level', level);
        }

        object.style.setProperty('--speed', this.getSpeed(object)+'px');
    }

    getSpeed(obj) {
        const rect = obj.getBoundingClientRect();
        const position = rect.bottom - (window.innerHeight / 2)
        return position * this.speed;
    }
}
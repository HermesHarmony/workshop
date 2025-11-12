export class BigTextOS {
    constructor() {
        this.targets = document.querySelectorAll('[data-bigtext-container]');

        this.init();
    }

    init() {
        if(this.targets.length > 0) {
            this.targets.forEach(target => {
                let isNav = target.dataset.bigtextContainer === 'true' ? true : false;
                this.textResizer(target, isNav);
            });
        }

        window.addEventListener('resize', (e) => {
            this.targets.forEach(target => {
                let isNav = target.dataset.bigtextContainer === 'true' ? true : false;
                this.textResizer(target, isNav);
            });
        });
    }

    textResizer(container, isNav = false) {
        var size = 1;
        let text = container.querySelector('[data-bigtext-text]');
        text.style.setProperty('--font-size', size + 'px');

        if(isNav) {
            document.body.style.setProperty('--header-height', container.offsetHeight + 'px');
        }

        while(text.offsetWidth < container.offsetWidth && size < 400) {
            size += 0.7;
            text.style.setProperty('--font-size', size + 'px');

            if(isNav) {
                document.body.style.setProperty('--header-height', container.offsetHeight + 'px');
            }
        }
    }
}
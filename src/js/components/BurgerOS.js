
export class BurgerOS {
    constructor() {
        this.burgerTrigger = document.querySelectorAll('[data-burger-trigger]');
        this.init();
    }

    init() {
        this.burgerTrigger.forEach(trigger => {
            const id = trigger.dataset.burgerTrigger;
            const content = document.querySelector(`[data-burger-content="${id}"]`);
            if(!content) {
                console.error(`No burger content found with id: ${id}`);
                return;
            }
            new Burger(trigger, content);
        });
    }
}

export class Burger {

    constructor(trigger, content) {
        this.trigger = trigger;
        this.content = content;
        this.fog = this.content.querySelector('[data-burger-fog]');

        this.init();
    }

    init() {
        this.trigger.addEventListener('click', () => {
            this.toggle();
        });

        if(this.fog) {
            this.fog.addEventListener('click', () => {
                this.closeItem(this.content);
            });
        }

        this.trigger.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                this.toggle();
            }
        });

        if(this.content.hasAttribute('data-burger-closeonscroll')) {
            this.createScrollCloser();
        }
    }

    toggle() {
        const isOpen = this.content.dataset.burgerOpen === 'true';

        if(isOpen) {
            this.closeItem(this.content);
        } else {
            this.openItem(this.content);
        }
    }

    createScrollCloser() {
        this.handleScroll();
        this.scrollHandler = this.handleScroll.bind(this); //
        window.addEventListener('scroll', this.scrollHandler);
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.closeItem(this.content);
            window.removeEventListener('scroll', this.handleScroll); 
        }
    }

    openItem(item) {
        item.dataset.burgerOpen = 'true';
        this.trigger.setAttribute('aria-expanded', 'true');
        this.trigger.setAttribute('aria-label', 'Close');
        this.trigger.dataset.burgerOpen = 'true';
        // update aria-expanded
        item.setAttribute('aria-expanded', 'true');
    }

    closeItem(item) {
        item.dataset.burgerOpen = 'false';
        this.trigger.setAttribute('aria-expanded', 'false');
        this.trigger.setAttribute('aria-label', 'Open');
        this.trigger.dataset.burgerOpen = 'false';
        // update aria-expanded
        item.setAttribute('aria-expanded', 'false');
    }

}

export class Accordions {
    constructor() {
        this.accordions = document.querySelectorAll('.accordion');
        this.init();
    }

    init() {
        this.accordions.forEach(accordion => {
            new accordion(accordion);
        });
    }
}

export class Accordion {

    constructor(accordion) {
        this.accordion = accordion;

        if(!this.accordion) {
            console.error('No accordion found, please define a spcific accordion or use the accordions class to initialize all accordions on the page.');
            return;
        }
        this.items = this.accordion.querySelectorAll('.accordion-item');
        this.images = this.accordion.querySelectorAll('.accordion-image');

        this.init();
    }

    init() {
        this.items.forEach(item => {
            item.addEventListener('click', (e) => {
                this.clickHandler(item);
                e.preventDefault();
            });
        });
    }

    clickHandler(item) {
        this.items.forEach(item => {
            this.closeItem(item);
        });

        this.openItem(item);

        this.images.forEach(image => {
            image.dataset.selected = 'false';

            if(image.dataset.index === item.dataset.index) {
                image.dataset.selected = 'true';
            }
        });
    }

    openItem(item) {
        item.dataset.open = 'true';
        // update aria-expanded
        item.setAttribute('aria-expanded', 'true');
    }

    closeItem(item) {
        item.dataset.open = 'false';
        // update aria-expanded
        item.setAttribute('aria-expanded', 'false');
    }
}

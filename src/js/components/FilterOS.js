export class FilterOS {
    constructor() {
        this.instances = document.querySelectorAll('[data-fltr-instance]');

        if(this.instances.length > 0) {
            this.instances.forEach(instance => {
                new FilterInstance(instance);
            });
        }
    }
}

export class FilterInstance {
    constructor(instance) {
        this.instance = instance;

        if(!this.instance) {
            console.error('No filter found, please define a spcific filter or use the FilterOS class to initialize all filters on the page.');
            return;
        }

        this.fltrButtons = this.instance.querySelectorAll('[data-fltr-selector]');
        this.fltrItems = this.instance.querySelectorAll('[data-fltr-value]');
        this.fallback = this.instance.querySelector('[data-fltr-selector="all"]');
        this.marker = this.instance.querySelector('[data-fltr-marker]');
        this.currentFilter = null;

        if(this.fallback == null) this.fallback = this.fltrButtons[0];
        
        if(this.fltrButtons.length > 0) {
            this.currentFilter = this.fallback.dataset.fltrSelector;
        } else {
            this.currentFilter = 'all';
        }

        this.init();
    }

    init() {
        this.updateFilter();

        this.fltrButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentFilter = button.dataset.fltrSelector;
                this.updateFilter();
            });
        });

        window.addEventListener('resize', () => {
            this.setMarker();
        });
    }

    updateFilter() {
        this.fltrItems = this.instance.querySelectorAll('[data-fltr-value]');
        this.updateFilterButtons();
        this.updateItems();
        this.setMarker();
    }

    setMarker() {
        if(this.marker == null) return;

        let button = this.instance.querySelector(`[data-fltr-selector="${this.currentFilter}"]`);
        this.marker.style.setProperty('--marker-w', `${button.offsetWidth}px`);
        this.marker.style.setProperty('--marker-x', `${button.offsetLeft}px`);

        if(button.dataset.fltrColor !== undefined) {
            this.marker.style.setProperty('--marker-color', button.dataset.fltrColor);
        }

    }

    updateItems() {
        this.fltrItems.forEach(item => {
            if(this.currentFilter == 'all') {
                item.dataset.fltrVisible = 'true';
            } else {
                item.dataset.fltrVisible = item.dataset.fltrValue.includes(this.currentFilter) ? 'true' : 'false';
            }
        });
    }

    updateFilterButtons() {
        this.fltrButtons.forEach(button => {
            if(button.dataset.fltrSelector == this.currentFilter) {
                button.dataset.fltrActive = 'true';
            } else {
                button.dataset.fltrActive = 'false';
            }
        });
    }    
}
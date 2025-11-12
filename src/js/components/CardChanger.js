export class CardChangers {
    constructor() {
        this.containers = document.querySelectorAll('[data-cardchanger]');

        if(this.containers.length > 0) {
            this.init();
        }
    }

    init() {
        this.containers.forEach(container => {
            new CardChanger(container);
        });
    }
}

export class CardChanger {

    constructor(container) {
        this.container = container;
        this.cards = this.container.querySelectorAll('[data-card]');
        this.prev = this.container.querySelector('[data-cardbutton="prev"]');
        this.next = this.container.querySelector('[data-cardbutton="next"]');
        this.posView = this.container.querySelector('#pos');
        this.pos = this.cards.length / 2;
        this.pos = Math.floor(this.pos);
        this.cardCount = this.cards.length;

        if(this.container.dataset.cardAutoplay !== undefined) {
            this.autoplay = parseInt(this.container.dataset.cardAutoplay);
            this.autoplayInstance = null;
        } else {
            this.autoplay = false;
        }

        this.init();
    };

    init() {
        this.moveCards();
        this.updateInterface();

        this.prev.addEventListener('click', (e) => {
            this.updatePos('prev');
        });

        this.next.addEventListener('click', (e) => {
            this.updatePos('next');
        });

        this.cards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                this.updatePos(false, String(index));
            });
        });

        if(this.autoplay) {
            this.startTimer();
            this.autoplayHandler();
        }
    }

    updatePos(direction, target) {
        if(!isNaN(parseInt(target))){
            this.pos =  parseInt(target);
        } else {
            if(direction === 'prev') {
                if(this.pos > 0) {
                    this.pos--;
                }
            } else {
                if(this.pos < this.cardCount - 1) {
                    this.pos++;
                }
            }
        }

        this.moveCards();
        this.updateInterface();
        this.restartAutoplay();
        this.startTimer();
    }

    startTimer() {
        let card = this.cards[this.pos];

        let bar = card.querySelector('.card-timer');

        bar.style.setProperty('--timer-duration', `${this.autoplay}ms`);
        bar.classList.add('active');
    }

    removeTimer() {
        this.cards.forEach(card => {
            let bar = card.querySelector('.card-timer');
            bar.classList.remove('active');
        });
    }

    autoplayHandler() {
        this.autoplayInstance = window.setInterval(() => {
            if(this.pos < this.cardCount - 1) {
                this.updatePos('next');
            } else {
                this.updatePos(false, 0);
            }
        } , this.autoplay);
    }

    restartAutoplay() {
        this.removeTimer();
        window.clearInterval(this.autoplayInstance);
        this.autoplayHandler();
    }

    moveCards() {
        this.cards.forEach((card, index) => {
            if(index === this.pos) {
                card.dataset.active = true;
            } else {
                card.dataset.active = false;
            }

            if(index < this.pos - 1) {
                card.dataset.place = 'left';
            }else if(index < this.pos) {
                card.dataset.place = 'center-left';
            } else if(index > this.pos + 1) {
                card.dataset.place = 'right';
            } else if(index > this.pos) {
                card.dataset.place = 'center-right';
            } else {
                card.dataset.place = 'center';
            }

            if(index === this.pos - 1 || index === this.pos + 1 || index === this.pos - 2 || index === this.pos + 2 || index === this.pos) {
                card.dataset.inrange = true;
            } else {
                card.dataset.inrange = false;
            }
        });
    }

    updateInterface() {
        if(this.pos === 0) {
            this.prev.disabled = true;
        } else {
            this.prev.disabled = false;
        }

        if(this.pos === this.cardCount - 1) {
            this.next.disabled = true;
        } else {
            this.next.disabled = false;
        }

        if(this.posView !== null) {
            this.posView.innerHTML = this.pos + 1;
        }
    }
}
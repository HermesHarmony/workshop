export class CursorOS {

    constructor() {
        this.cursor = document.getElementById('cursor');
        this.cursorInfo = document.getElementById('cursorInfo');
        this.cursorTargets = document.querySelectorAll('[data-cursorInfo],a,button');
        this.cursorPositions = [0,0]

        this.init();

        this.speed = 0.2;
        this.delayedSpeed = 0.001;

        this.cursorX = null;
        this.cursorY = null;

        this.cursorXpast = 0;
        this.cursorYpast = 0;

        this.target = {x: 0, y: 0};
        this.raf = false;

        this.isTouchDevice = 
            ( 'ontouchstart' in window ) || 
            ( navigator.maxTouchPoints > 0 ) || 
            ( navigator.msMaxTouchPoints > 0 );
    }

    init() {
        if(!this.isTouchDevice) {
            document.body.dataset.touch = 'false';

            document.addEventListener("mousemove", (e) => {
                this.trackCursor(e)
            }, true);

            this.raf = requestAnimationFrame(this.renderCursor);
        } else {
            document.body.dataset.touch = 'true';
        }
    }

    trackCursor = (e) => {
        this.target.x = e.clientX;
        this.target.y = e.clientY;
        if (!this.raf) this.raf = requestAnimationFrame(this.renderCursor);
    }

    renderCursor = () => {
        const lerp = (a, b, n) => (1 - n) * a + n * b;

        // fast cursor
        this.cursorX = lerp(this.cursorX, this.target.x, this.speed);
        this.cursorY = lerp(this.cursorY, this.target.y, this.speed); 

        this.cursorX = Math.round(this.cursorX * 10) / 10;
        this.cursorY = Math.round(this.cursorY * 10) / 10;

        document.body.style.setProperty('--cursor-x',  this.cursorX != 0 ? `${this.cursorX}px` : `50vw`);
        document.body.style.setProperty('--cursor-y',  this.cursorY != 0 ? `${this.cursorY}px` : `50vh`);

        // relative cursor
        let cursorXrel = this.cursorX / window.innerWidth;
        let cursorYrel = this.cursorY / window.innerHeight;

        cursorXrel = Math.round(cursorXrel * 1000) / 1000;
        cursorYrel = Math.round(cursorYrel * 1000) / 1000;

        document.body.style.setProperty('--cursor-x-percentage',  this.cursorX != 0 ? `${cursorXrel}` : `0`);
        document.body.style.setProperty('--cursor-y-percentage',  this.cursorY != 0 ? `${cursorYrel}` : `0`);

        // render logic
        const delta = Math.sqrt(
            Math.pow(this.target.x - this.cursorX, 2) +
            Math.pow(this.target.y - this.cursorY, 2)
        );
        if (delta < 0.001) {
          cancelAnimationFrame(this.raf);
          this.raf = null;
          return;
        }

        this.raf = requestAnimationFrame(this.renderCursor);
    }
}
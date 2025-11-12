
export class FuckYouSwiper {

    constructor(slider) {
        this.container = slider;
        this.slider = this.container.querySelector('.fys-slider');
        this.track = this.container.querySelector('.fys-track');
        this.slides = this.track.querySelectorAll('.fys-slide');
        this.prev = this.container.querySelector('.fys-prev');
        this.next = this.container.querySelector('.fys-next');
        this.pos = 0;
        this.gap = parseInt(getComputedStyle(this.track).gap)

        this.init();
    };

    init() {
        this.track.style.transform = "translateX(var(--fys-track-move))";
        this.updateButtonStates()

        this.prev.addEventListener('click', (e) => {
            this.moveTrack(true);
        });

        this.next.addEventListener('click', (e) => {
            this.moveTrack(false);
        });
    }

    changeActiveSlide(target = false) {

        for(const slide of this.slides) {
            slide.classList.remove('active-slide')
        }

        if(this.slides[this.pos] && !target) {
            this.slides[this.pos].classList.add('active-slide')
        } else if(target && this.slides[target]) {
            this.slides[target].classList.add('active-slide')
        }
    }

    isNotOutOfRange(back = false) {
        if(!back) {
            if(this.pos < this.slides.length - 1) {
                return true
            } else {
                return false
            }
        } else {
            console.log('rückwärts')
            if(this.pos > 0) {
                return true
            } else {
                return false
            }
        }
    }

    updateButtonStates() {
        this.snapped ? this.next.disabled = true : this.next.disabled = false;
        this.pos == 0 ? this.prev.disabled = true : this.prev.disabled = false;
    }

    moveTrack(back = false) {
        console.log('POS:'+this.pos)

        if(this.isNotOutOfRange(back)) {
            var offset = back ? -1 : 1;
            var potientialNewSlide = this.slides[this.pos + offset]
            var slidePos = potientialNewSlide.offsetLeft;

            // Position of Slider
            let width = (potientialNewSlide.offsetWidth + this.gap) * offset;
            let trackPos = parseInt(getComputedStyle(this.track).getPropertyValue('--fys-track-move')) || 0;
            let rest = this.track.offsetWidth - ((Math.abs(trackPos)) + width + this.slider.offsetWidth);
    
            if(rest > 0 || back) {
                this.pos += offset;
                this.snapped = false;

                this.track.style.setProperty('--fys-track-move', (slidePos * -1) + 'px');
                this.changeActiveSlide();
                this.updateButtonStates();
            } else if(!this.snapped) {
                this.pos += offset;
                this.snapped = true;

                this.track.style.setProperty('--fys-track-move', (this.track.offsetWidth - this.slider.offsetWidth) * -1 + 'px');
                this.changeActiveSlide( this.slides.length - 1);
                this.updateButtonStates();
            }

        } else {
            console.log('end')
        }   
    }
}
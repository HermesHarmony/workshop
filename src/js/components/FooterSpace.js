export class FooterSpace {
    constructor() {
        this.footer = document.querySelector('#footer');
        this.init();
    }

    init() {
        this.updateFooterPadding();
        window.addEventListener('resize', this.updateFooterPadding);
    }

    updateFooterPadding() {
        document.body.style.setProperty('--footer-height', this.footer.offsetHeight + 'px');
    }

    destroy() {
        console.log('footer deleted');
    }
}
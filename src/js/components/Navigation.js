export class NavController {
    constructor() {
        this.nav = document.querySelector('#nav')
        this.burger = document.querySelector('#burger')
        this.overlay = document.querySelector('#overlay')
        this.isOpen = false

        this.burger.addEventListener('click', (e) => {
            this.toggleNav();
        })

        if(this.overlay ?? false) {
            this.overlay.addEventListener('click', (e) => {
                this.closeNav();
            })
        }
    }

    toggleNav() {
        this.isOpen = !this.isOpen;
        this.updateNavState();
    }

    closeNav()  {
        this.isOpen = false;
        this.updateNavState();
    }

    openNav() {
        this.isOpen = true;
        this.updateNavState();
    }

    updateNavState() {
        this.nav.dataset.state = this.isOpen ? 'true' : 'false'
    }
}
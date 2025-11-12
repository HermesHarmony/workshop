export class fish {
  constructor() {
    this.fish = document.querySelector('#fish');
    this.fishContainer = document.querySelector('#fish-container');

    this.init()
  }

  init() {
    this.placeFish();

    window.addEventListener('resize', () => {
        this.placeFish();
    });
  }

  placeFish() {
    const containerWidth = this.fishContainer.offsetWidth;
    const containerHeight = this.fishContainer.offsetHeight;
    const containerX = this.fishContainer.offsetLeft + (containerWidth / 2);
    const containerY = this.fishContainer.offsetTop + (containerHeight / 2);
    // how much in percentage the fish is from the top of the container
    const percentageY = (containerY / window.innerHeight) * 100;

    this.fish.style.setProperty('--fish-size', containerWidth + 'px');
    this.fish.style.setProperty('--screen-size', window.innerWidth + 'px');
    this.fish.style.setProperty('--fish-x', containerX + 'px');
    this.fish.style.setProperty('--fish-y', containerY + 'px');
    this.fish.style.setProperty('--mask-y', percentageY + '%');
  }
}

export class loader {
  constructor() {
    this.video = document.querySelector('#video');
    this.init()
  }

  init() {
    this.video.addEventListener('loadeddata', () => {

    });
  }

  decloak() {
    body.dataset.loaded = true;
  }
}


new fish();

import '../core.js';



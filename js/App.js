'use strict';
class App {
  constructor() {
    this.previousPosition = window.innerWidth;
    this.lines = [];
    this.interval = null;
    this.artistList = [
      'Fabiano&nbsp;Alborghetti',
      'Maiser',
      'Dumenic&nbsp;Andry',
      'Sablun',
      'Michael&nbsp;Fehr',
      'Glanz&nbsp;und&nbsp;Schatten',
      'Baptiste&nbsp;Gaillard',
      'Un&nbsp;domaine&nbsp;des&nbsp;corpuscules',
      'Yael&nbsp;Inokai',
      'Mahlstrom',
      'Friederike&nbsp;Kretzen',
      'Schule&nbsp;der&nbsp;Indienfahrer',
      'Jérôme&nbsp;Meizoz',
      'Faire&nbsp;le&nbsp;garçon',
    ];
    this.titles = [
      'Schweizer',
      'Literaturpreise',
      '2018',
      'Prix',
      'suisses',
      'de',
      'littérature',
      '2018',
      'Premi',
      'svizzeri',
      'di',
      'letteratura',
      '2018',
      'Premis',
      'svizzers',
      'da',
      'litteratura',
      '2018',
    ];
    this.keywords = [this.artistList, this.titles];
    this.init();
  }

  init() {
    // this.interval = setInterval(this.addWord.bind(this), 200);
    document.addEventListener('keydown', this.onkeydown.bind(this));
    this.addWord();
    this.draw();
  }

  onkeydown(e) {
    let shifted = this.keywords.shift();
    this.keywords.push(shifted);
    console.log(this.keywords);
  }

  addWord() {
    let shifted = this.keywords[0].shift();
    let word = new Word(shifted, window.innerWidth + 10);
    this.previousPosition += word.width;
    console.log(shifted, word.width);
    this.keywords[0].push(shifted);
    this.lines.push(word);
  }

  draw() {
    for (let i = 0; i < this.lines.length; i++) {
      this.lines[i].update();
      if (!this.lines[i].isInside &&
          Math.abs(
              parseInt(this.lines[i].container.style.left) -
              window.innerWidth) > this.lines[i].width &&
          parseInt(this.lines[i].container.style.left) < window.innerWidth) {
        this.lines[i].isInside = true;
        this.addWord();
      }
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}

class Word {
  constructor(string, pos) {
    this.isInside = false;
    this.text = string;
    this.container = document.createElement('div');
    this.container.classList.add('moving_word');
    this.container.style.left = pos + 'px';
    this.container.innerHTML = string;
    this.wrapper = document.getElementsByClassName('wrapper')[0];
    this.wrapper.appendChild(this.container);
    this.width = this.container.getBoundingClientRect().width;
    // console.log('width', this.width);
  }

  update() {
    this.container.style.left =
        (parseInt(this.container.style.left) - 1) + 'px';
  }
}

window.onload = function() {
  new App();
}

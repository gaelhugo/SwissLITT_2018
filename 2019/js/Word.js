'use strict';
/*

  ATTENTION A CHANGER L'année ACTIVE !

*/
class Word {
  constructor(string, scope, state) {
    this.container = document.createElement('div');
    this.container.classList.add('word');
    if (state) {
      this.container.classList.add('fadeout');
    }
    this.container.innerHTML = string;
    this.scope = scope;
    this.scope.container.appendChild(this.container);
    if (string == GLOBAL_YEAR) {
      this.container.classList.add('beforeyear');
    }
    this.width = Math.ceil(this.container.getBoundingClientRect().width);
    if (string == GLOBAL_YEAR) {
      this.container.classList.add('year');
    }
    this.speed = 1;
    this.position = 0;
    this.word = string;
    this.isTheOne = false;
    this.noColorChange = false;
  }
  setPosition(position) {
    this.container.style.left = position + 'px';
    this.position = position;
  }
  update() {
    this.position = (parseFloat(this.container.style.left) + this.speed);
    this.container.style.left = this.position + 'px';
  }
}

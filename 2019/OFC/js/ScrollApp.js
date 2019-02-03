'use strict';
/*
  SPACEBAR  --> create logo
  left      --> switch plateau
  enter     --> launch motion
  1-9       --> set author

  to fix:
  || when name is null ...
  speed
  || positionnement non dépendant de la vitesse.
  || this.start+=this.speed
  || this.end +=this.speed

  to finish:
  add image slideshow
*/

class ScrollApp {
  constructor() {
    // this.positionGoals = [
    //   [
    //     null,
    //     null,
    //     {'position': 845, 'word': 'Schweizer'},
    //     {'position': 945, 'word': 'Literaturpreise'},
    //     {'position': 882, 'word': '2018'},
    //     {'position': 778, 'word': 'Prix&nbsp;suisses'},
    //     {'position': 710, 'word': 'de&nbsp;littérature'},
    //     {'position': 772, 'word': '2018'},
    //     {'position': 836, 'word': 'Premi&nbsp;svizzeri'},
    //     {'position': 964, 'word': 'di&nbsp;letteratura'},
    //     {'position': 908, 'word': '2018'},
    //     {'position': 816, 'word': 'Premis&nbsp;svizzers'},
    //     {'position': 708, 'word': 'da&nbsp;litteratura'},
    //     {'position': 772, 'word': '2018'},
    //     null,
    //     null,
    //   ],
    //   [
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     {'position': 820, 'word': 'Fabiano&nbsp;'},
    //     {'position': 880, 'word': 'Alborghetti&nbsp;'},
    //     {'position': 870, 'word': 'Meiser&nbsp;'},
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //   ],
    // ];
    this.body = document.getElementsByTagName('body')[0];
    this.transitionEnd = this.transitionEndEventName();
    this.allLines = [];
    this.slideshowIsBlocked = false;
    this.singleton = null;
    this.initListeners();
    // this.init();
    fetch('data/tapis.json').then((r) => r.json()).then((json) => {
      this.titles = json.tapis;
      // this.titles_copy = json.tapis;
      this.loadWinners();
    });
  }

  loadWinners() {
    fetch('data/winners.json').then((r) => r.json()).then((json) => {
      this.positionGoals = json.goals;
      this.images = json.images;
      this.initSlideshow();
      this.init();
    });
  }

  initListeners() {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
      // spacebar
      case 32:
        for (let i = 0; i < this.allLines.length; i++) {
          this.allLines[i].isYellow = true;
          this.allLines[i].goAndStop(this.positionGoals[0][i]);
        }
        break;
      // left
      case 39:
        // this.restart();
        this.fadeout();
        break;
        // laureats
        // touch 1
      case 49:
        this.getWinner(1);
        break;
        // touch 2
      case 50:
        this.getWinner(2);
        break;
      case 51:
        this.getWinner(3);
        break;
      case 52:
        this.getWinner(4);
        break;
      case 53:
        this.getWinner(5);
        break;
      case 54:
        this.getWinner(6);
        break;
        // touch 7
      case 55:
        this.getWinner(7);
        break;
      case 56:
        this.getWinner(8);
        break;
      case 57:
        this.getWinner(9);
        break;

        // ENTER
      case 13:
        for (let i = 0; i < this.allLines.length; i++) {
          this.allLines[i].restart();
        }
        break;
        // back
      case 8:
        if (this.slideshowIsBlocked) {
          console.log('blocked', this.singleton);
          let elems = this.slideshowWrapper.children;
          elems.item(this.singleton - 1).classList.add('dark');
          this.slideshowWrapper.style.left =
              this.goal - 2 * elems.item(this.singleton - 1).width;
          this.slideshowIsBlocked = false;
        } else {
          // launch slideshow
          this.slideshow_index = 0;
          this.goal = window.innerWidth / 2 +
              this.slideshowWrapper.children.item(0).width / 2;
          // this.slideshowWrapper.style.left = window.innerWidth / 2;
          if (this.slideshowWrapper.classList.contains('notransition')) {
            this.slideshowWrapper.classList.remove('notransition');
          }
          this.rollSlideshow();
        }
        break;

      // a
      case 65:
        this.changeTapis(0);
        break;
      // s
      case 83:
        this.changeTapis(1);
        break;
      // d
      case 68:
        this.changeTapis(2);
        break;
      // f
      case 70:
        this.changeTapis(3);
        break;
      // g
      case 71:
        this.changeTapis(4);
        break;
      // h
      case 72:
        this.changeTapis(5);
        break;
        // j
      case 74:
        this.changeTapis(6);
        break;
        // k
      case 75:
        this.changeTapis(0);
        break;

      // CREDITS
      // y
      case 89:
        this.getCredits(10);
        break;
      // x
      case 88:
        this.getCredits(11);
        break;
      // c
      case 67:
        this.getCredits(12);
        break;
      // v
      case 86:
        this.getCredits(13);
        break;
      // b
      case 66:
        this.getCredits(14);
        break;
    }
  }

  rollSlideshow() {
    let elems = this.slideshowWrapper.children;
    let elem = elems.item(this.slideshow_index);
    if (elem) {
      if (elems.item(this.slideshow_index - 1)) {
        elems.item(this.slideshow_index - 1).classList.add('dark');
      }
      elem.classList.remove('dark');
      this.goal -= elem.width;
      this.slideshowWrapper.style.left = this.goal;
    }

    if (this.slideshow_index < this.slideshowWrapper.children.length) {
      let timer = (this.slideshowWrapper.children.length == 1) ? 100 : 10000;
      setTimeout(this.rollSlideshow.bind(this), timer);
    } else if (this.slideshowWrapper.children.length == 1) {
      // Don't leave automatically
      console.log('now is ok');
      this.slideshowIsBlocked = true;
      this.singleton = this.slideshow_index;
    } else {
      elems.item(this.slideshow_index - 1).classList.add('dark');
      this.slideshowWrapper.style.left =
          this.goal - 2 * elems.item(this.slideshow_index - 1).width;
    }
    this.slideshow_index++;
  }

  getCredits(id) {
    this.slideshowWrapper.innerHTML = '';
    this.slideshowWrapper.classList.add('notransition');
    this.slideshowWrapper.style.left = null;
    if (!this.slideshowWrapper.classList.contains('start')) {
      this.slideshowWrapper.classList.add('start');
    }
    // create image collection
    for (let i = 0; i < this.images[id].length; i++) {
      let img = document.createElement('img');
      img.src = 'data/images/' + this.images[id][i];
      img.onload = function() {
        this.height = window.innerHeight;
        this.width = window.innerHeight * this.width / this.height;
      };
      if (i != 0) img.classList.add('dark');
      this.slideshowWrapper.appendChild(img);
    }
  }

  getWinner(id) {
    this.slideshowWrapper.innerHTML = '';
    this.slideshowWrapper.classList.add('notransition');
    this.slideshowWrapper.style.left = null;
    if (!this.slideshowWrapper.classList.contains('start')) {
      this.slideshowWrapper.classList.add('start');
    }
    // create image collection
    for (let i = 0; i < this.images[id].length; i++) {
      let img = document.createElement('img');
      img.src = 'data/images/' + this.images[id][i];
      img.onload = function() {
        this.height = window.innerHeight;
        this.width = window.innerHeight * this.width / this.height;
      };
      if (i != 0) img.classList.add('dark');
      this.slideshowWrapper.appendChild(img);
    }

    for (let i = 0; i < this.allLines.length; i++) {
      this.allLines[i].goAndStop(this.positionGoals[id][i]);
    }
  }

  changeTapis(val) {
    for (let i = 0; i < this.allLines.length; i++) {
      this.allLines[i].target = val;
    }
    this.fadeout();
  }

  restart() {
    // change color to black
    document.getElementsByTagName('body')[0].classList.add('black');
    for (let i = 0; i < this.allLines.length; i++) {
      //  this.allLines[i].goNext();
      // this.allLines[i].restart();
      this.allLines[i].test();
    }
  }

  fadeout() {
    this.body.classList.add('black');
    this.bound = this.updateContent.bind(this);
    this.body.addEventListener(this.transitionEnd, this.bound, false);
    for (let i = 0; i < this.allLines.length; i++) {
      this.allLines[i].fadeout();
    }
  }

  updateContent() {
    this.body.removeEventListener(this.transitionEnd, this.bound);
    // remove all elements
    for (let i = 0; i < this.allLines.length; i++) {
      this.allLines[i].isYellow = false;
      this.allLines[i].updateContent();
    }
  }

  initSlideshow() {
    this.slideshow = document.createElement('div');
    this.slideshow.classList.add('slideshow');
    this.body.appendChild(this.slideshow);
    this.slideshowWrapper = document.createElement('div');
    this.slideshowWrapper.classList.add('slideshow_wrapper');
    this.slideshow.appendChild(this.slideshowWrapper);
  }

  init() {
    let _height = 0;
    let counter = 0;
    while (_height < 480) {
      let line = new Line(counter, this);
      this.allLines.push(line);
      _height += 30;
      counter++;
    }
    this.draw();
  }

  draw() {
    for (let i = 0; i < this.allLines.length; i++) {
      this.allLines[i].update();
    }
    requestAnimationFrame(this.draw.bind(this));
  }

  transitionEndEventName() {
    let i;
    let el = document.createElement('div');
    let transitions = {
      'transition': 'transitionend',
      'OTransition': 'otransitionend',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
    };

    for (i in transitions) {
      if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
        return transitions[i];
      }
    }

    // TODO: throw 'TransitionEnd event is not supported in this browser';
  }
}

window.onload = function() {
  new ScrollApp();
};

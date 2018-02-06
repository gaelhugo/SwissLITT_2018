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
    this.initListeners();
    // this.init();
    fetch('data/tapis.json').then((r) => r.json()).then((json) => {
      this.titles = json.tapis;
      this.loadWinners();
    });
  }

  loadWinners() {
    fetch('data/winners.json').then((r) => r.json()).then((json) => {
      this.positionGoals = json.goals;
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


      case 13:
        for (let i = 0; i < this.allLines.length; i++) {
          this.allLines[i].restart();
        }
        break;
    }
  }

  getWinner(id) {
    for (let i = 0; i < this.allLines.length; i++) {
      this.allLines[i].goAndStop(this.positionGoals[id][i]);
    }
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
      this.allLines[i].updateContent();
    }
  }

  init() {
    let _height = 0;
    let counter = 0;
    while (_height < window.innerHeight) {
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

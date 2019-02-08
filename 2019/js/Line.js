'use strict';
class Line {
  constructor(id, scope, speed) {
    this.titles = scope.titles.slice();
    this.titles_copy = scope.titles.slice();
    // console.log(this.titles_copy);

    // this.titles = [
    //   [
    //     'Schweizer',
    //     'Literaturpreise',
    //     '2018',
    //     'Prix&nbsp;suisses',
    //     'de&nbsp;littérature',
    //     '2018',
    //     'Premi&nbsp;svizzeri',
    //     'di&nbsp;letteratura',
    //     '2018',
    //     'Premis&nbsp;svizzers',
    //     'da&nbsp;litteratura',
    //     '2018',
    //   ],
    //   [
    //     'Preisträgerinnen&nbsp;und&nbsp;Preisträger',
    //     '2018',
    //     'Lauréates&nbsp;et&nbsp;lauréats',
    //     '2018',
    //     'Vincitrici&nbsp;e&nbsp;vincitori',
    //     '2018',
    //     'Victuras&nbsp;e&nbsp;victurs',
    //     '2018',
    //   ],
    //   [
    //     'Fabiano&nbsp;',    'Alborghetti&nbsp;', 'Meiser&nbsp;',
    //     'Dumenic&nbsp;',    'Andry&nbsp;',       'Sablun&nbsp;',
    //     'Michael&nbsp;',    'Fehr&nbsp;',        'Baptiste&nbsp;',
    //     'Gaillard&nbsp;',   'Yael&nbsp;',        'Inokai&nbsp;',
    //     'Friederike&nbsp;', 'Kretzen&nbsp;',     'Jerome&nbsp;',
    //     'Meizoz&nbsp;',     'Yla&nbsp;',         'Von&nbsp;',
    //     'Dach&nbsp;',       'Anna&nbsp;',        'Felder&nbsp;',
    //   ],
    // ];
    this.allWords = [];
    this.container = document.createElement('div');
    this.container.classList.add('wrapper');
    document.body.appendChild(this.container);
    this.speed = (speed) ?
        speed :
        ((0.2 + Math.random()) * (Math.random() < 0.5 ? -1 : 1)) * .5;
    this.originalSpeed = this.speed;
    this.end = 0;
    this.start = 0;
    this.minimum = -window.innerWidth * 1.5;
    this.maximum = (window.innerWidth + window.innerWidth) * 1.5;
    // set starting point;
    this.end = this.minimum;
    this.start = this.minimum;
    this.goal = null;
    this.lookForPosition = false;
    this.lookForKeyword = '';
    this._pos = 0;
    this.stop = false;
    this.id = id;
    this.biggestWidth = 0;
    this.lookup = null;
    this.target = null;
    this.isYellow = false;
    this.init();
  }

  init() {
    this.buildContent();
    // let _width = 0;
    // window.innerWidth
    // let index = Math.floor(Math.random() * this.titles[0].length);
    // let left = this.titles[0].slice(0, index);
    // let right = this.titles[0].slice(index);
    // // console.log(left, right);
    //
    // this.titles[0] = right.concat(left);
    // // let long = this.titles.length - 1 - index;
    // // let splicer = this.titles.splice(0, index);
    // // this.titles.concat(splicer);
    // // console.log(this.titles);
    // while (this.end < this.maximum) {
    //   // let word = new Word(
    //   //     this.titles[Math.floor(Math.random() * this.titles.length)],
    //   this); let word = new Word(this.titles[0][0], this); word.speed =
    //   this.speed; word.setPosition(this.end); this.allWords.push(word);
    //   this.end += word.width;
    //   let shift = this.titles[0].shift();
    //   this.titles[0].push(shift);
    //   if (word.width > this.biggestWidth) {
    //     this.biggestWidth = word.width;
    //   }
    // }
    // add one more extra word depending the speed
    // let word = new Word(
    //     this.titles[Math.floor(Math.random() * this.titles.length)], this);
    // word.speed = this.speed;
    // this.allWords.push(word);
    // if (this.speed > 0) {
    //   word.setPosition(-word.width);
    //   this.start = -word.width;
    // } else {
    //   word.setPosition(this.end);
    //   this.end += word.width;
    // }
  }

  // update() {
  //   this.end += this.speed;
  //   this.start += this.speed;
  //   for (let i = this.allWords.length - 1; i >= 0; i--) {
  //     this.allWords[i].update();
  //     if ((parseInt(this.allWords[i].container.style.left) <=
  //              -this.allWords[i].width &&
  //          this.speed < 0) ||
  //         (parseInt(this.allWords[i].container.style.left) >=
  //              window.innerWidth &&
  //          this.speed > 0)) {
  //       // remove word
  //       this.container.removeChild(this.allWords[i].container);
  //       this.allWords.splice(i, 1);
  //       // add Word
  //       let word = new Word(
  //           this.titles[Math.floor(Math.random() * this.titles.length)],
  //           this);
  //       word.speed = this.speed;
  //       this.allWords.push(word);
  //       if (this.speed > 0) {
  //         this.start -= word.width;
  //         word.setPosition(this.start);
  //         // this.start -= word.width;
  //       } else {
  //         word.setPosition(this.end);
  //         this.end += word.width;
  //       }
  //     }
  //   }
  // }

  buildContent(state) {
    let hidden = state || false;
    let index = Math.floor(Math.random() * this.titles[0].length);
    let left = this.titles[0].slice(0, index);
    let right = this.titles[0].slice(index);
    // console.log(left, right);

    this.titles[0] = right.concat(left);
    // let long = this.titles.length - 1 - index;
    // let splicer = this.titles.splice(0, index);
    // this.titles.concat(splicer);
    // console.log(this.titles);
    while (this.end < this.maximum) {
      // let word = new Word(
      //     this.titles[Math.floor(Math.random() * this.titles.length)], this);
      let word = new Word(this.titles[0][0], this, hidden);
      word.speed = this.speed;
      word.setPosition(this.end);
      this.allWords.push(word);
      this.end += word.width;
      let shift = this.titles[0].shift();
      this.titles[0].push(shift);
      if (word.width > this.biggestWidth) {
        this.biggestWidth = word.width;
      }
    }
  }

  buildContentTarget(state, target) {
    console.log('target', target);
    // reset original this.title
    let l = this.titles_copy.slice(0, target);
    let r = this.titles_copy.slice(target);
    this.titles = r.concat(l);

    let hidden = state || false;
    let index = Math.floor(Math.random() * this.titles_copy[target].length);
    let left = this.titles_copy[target].slice(0, index);
    let right = this.titles_copy[target].slice(index);
    this.titles_copy[target] = right.concat(left);
    while (this.end < this.maximum) {
      let word = new Word(this.titles_copy[target][0], this, hidden);
      word.speed = this.speed;
      word.setPosition(this.end);
      this.allWords.push(word);
      this.end += word.width;
      let shift = this.titles_copy[target].shift();
      this.titles_copy[target].push(shift);
      if (word.width > this.biggestWidth) {
        this.biggestWidth = word.width;
      }
    }
    this.target = null;
  }

  update() {
    for (let i = this.allWords.length - 1; i >= 0; i--) {
      if (!this.lookForPosition && !this.stop) {
        this.allWords[i].update();
      } else if (!this.stop) {
        if (this._pos) {
          let diff = this.goal - this._pos;
          // 0.07
          this.speed = diff * 0.05;
          this.allWords[i].speed = this.speed;
        }
        this.allWords[i].update();
        if (this.allWords[i].isTheOne) {
          this._pos = this.allWords[i].position;
        }


        if (this.distance(this.allWords[i].position, this.goal) <= 1 &&
            this.allWords[i].word == this.lookForKeyword) {
          //
          this.allWords[i].speed = this.speed;
          if (!this.allWords[i].noColorChange) {
            this.allWords[i].container.classList.add('focus');
          }
          this.allWords[i].container.style.left = this.goal + 'px';
          this.speed = 0;
          this.stop = true;
          this.lookForPosition = false;
          //
        }
      }
      if ((parseInt(this.allWords[i].container.style.left) <= this.minimum &&
           this.speed < 0) ||
          (parseInt(this.allWords[i].container.style.left) >= this.maximum &&
           this.speed > 0)) {
        // remove word
        this.container.removeChild(this.allWords[i].container);

        // on enlève le mot qui dépasse la limite
        this.allWords.splice(i, 1);

        // add Word
        // let word = new Word(
        //     this.titles[Math.floor(Math.random() * this.titles.length)],
        //     this);
        let word;
        if (this.speed > 0) {
          word = new Word(this.titles[0][this.titles.length - 1], this);
          // on enlève le dernier élément du tableau
          // attention ici on devrait changer la gamme des mots
          let poped = this.titles[0].pop();
          this.titles[0].unshift(poped);
        } else {
          word = new Word(this.titles[0][0], this);
          // on enlève le premier élément du tableau
          // attention ici on devrait changer la gamme des mots
          let shift = this.titles[0].shift();
          this.titles[0].push(shift);
        }

        if (this.speed > 0) {
          this.start -= word.width;
          word.setPosition(this.start);
          // this.start -= word.width;
        } else {
          word.setPosition(this.end);
          this.end += word.width;
        }

        word.speed = this.speed;
        // on remet le mot dans la mémoire.
        this.allWords.push(word);
      }
      // END OF condition for LOOPER

      // --change to isYellow
      if (this.isYellow && this.stop) {
        this.allWords[i].container.classList.add('isYellow');
      }
    }
    this.end = this.getTheEnd();      //+= this.speed;
    this.start = this.getTheStart();  // += this.speed;

    if (this.lookup) {
      this.goAndStop(this.lookup);
    }
    this.readjust();
  }

  readjust() {
    this.allWords.sort(function(a, b) {
      return a.position - b.position;
    });
    for (let i = 1; i < this.allWords.length; i++) {
      this.allWords[i].container.style.left =
          parseFloat(this.allWords[i - 1].container.style.left) +
          this.allWords[i - 1].width;
    }
  }

  getTheEnd() {
    let end = 0;
    for (let i = 0; i < this.allWords.length; i++) {
      if (parseFloat(this.allWords[i].container.style.left) +
              this.allWords[i].width >=
          end) {
        end = parseFloat(this.allWords[i].container.style.left) +
            this.allWords[i].width;
      }
    }
    return end;
  }
  getTheStart() {
    let start = window.innerWidth;
    for (let i = 0; i < this.allWords.length; i++) {
      if (parseFloat(this.allWords[i].container.style.left) < start) {
        start = parseFloat(this.allWords[i].container.style.left);
      }
    }
    return start;
  }

  /*
   TRY TO GET THE NEXT NEAREST KEYWORD
   IF NOTHING IS SET, WE CHECK THE NEAREST KEYWORD TO THE CENTER
   */
  goAndStop(goal) {
    if (goal) {
      this.lookup = null;
      this.goal = goal.position;
      this.lookForPosition = true;
      this.lookForKeyword = goal.word;
      this._pos = this.getNextKeyWord();
      // console.log(this._pos);
      if (this._pos == null) {
        // console.log('problem');
        this.goal = null;
        this.lookForPosition = false;
        this.lookForKeyword = '';
        let s = (this.speed <= 0) ? -50 : 50;
        this.updateSpeed(s);
        this.lookup = goal;
      }
    } else {
      this.getMiddleWord();
    }
  }
  updateSpeed(val) {
    this.speed = val;
    for (let i = this.allWords.length - 1; i >= 0; i--) {
      this.allWords[i].speed = val;
    }
  }
  getNextKeyWord() {
    if (this.speed < 0) {
      for (let i = 0; i < this.allWords.length; i++) {
        if (this.allWords[i].word == this.lookForKeyword &&
            this.allWords[i].position > this.goal) {
          this.allWords[i].isTheOne = true;
          return this.allWords[i].position;
        }
      }
    } else {
      for (let i = this.allWords.length - 1; i >= 0; i--) {
        if (this.allWords[i].word == this.lookForKeyword &&
            this.allWords[i].position < this.goal) {
          this.allWords[i].isTheOne = true;
          return this.allWords[i].position;
        }
      }
    }
    return null;

    // for (let i = 0; i < this.allWords.length; i++) {
    //   if (this.speed < 0) {
    //     if (this.allWords[i].word == this.lookForKeyword &&
    //         this.allWords[i].position > this.goal) {
    //       this.allWords[i].isTheOne = true;
    //       return this.allWords[i].position;
    //     }
    //     // else if (
    //     //     this.allWords[i].word == this.lookForKeyword &&
    //     //     this.allWords[i].position < this.goal) {
    //     //   this.allWords[i].isTheOne = true;
    //     //   this.speed *= -1;
    //     //   this.allWords[i].speed = this.speed;
    //     //   return this.allWords[i].position;
    //     // }
    //   } else {
    //     if (this.allWords[i].word == this.lookForKeyword &&
    //         this.allWords[i].position < this.goal) {
    //       this.allWords[i].isTheOne = true;
    //       return this.allWords[i].position;
    //     }
    //     // else if ((this.allWords[i].word == this.lookForKeyword &&
    //     //             this.allWords[i].position > this.goal)) {
    //     //   this.allWords[i].isTheOne = true;
    //     //   this.speed *= -1;
    //     //   this.allWords[i].speed = this.speed;
    //     //   return this.allWords[i].position;
    //     // }
    //   }
    // }
    // return null;
  }

  getMiddleWord() {
    for (let i = 0; i < this.allWords.length; i++) {
      if (this.speed < 0) {
        if (this.allWords[i].position > window.innerWidth / 2) {
          // this.allWords[i].container.classList.add('debug');
          if (this.allWords[i - 1] != undefined &&
              this.allWords[i - 1].position > window.innerWidth / 2) {
            // this.allWords[i].container.classList.remove('debug');
            this.allWords[i].isTheOne = true;
            this.allWords[i].noColorChange = true;
            this.goal = this.allWords[i].position - this.allWords[i].width;
            this.lookForPosition = true;
            this.lookForKeyword = this.allWords[i].word;
            this._pos = this.allWords[i].position;
            return this.allWords[i].position;
          }
        }
      } else {
        if (this.allWords[i].position < window.innerWidth / 2) {
          // this.allWords[i].container.classList.add('debug');
          if (this.allWords[i + 1] != undefined &&
              this.allWords[i + 1].position < window.innerWidth / 2) {
            // this.allWords[i].container.classList.remove('debug');
            this.allWords[i].isTheOne = true;
            this.allWords[i].noColorChange = true;
            this.goal = this.allWords[i].position + this.allWords[i].width;
            this.lookForPosition = true;
            this.lookForKeyword = this.allWords[i].word;
            this._pos = this.allWords[i].position;
            return this.allWords[i].position;
          }
        }
      }
    }
  }

  restart() {
    // this.goNext();
    this.lookup = null;
    this.goal = null;
    this.lookForPosition = false;
    this.lookForKeyword = '';
    this._pos = 0;
    this.stop = false;
    this.speed = this.originalSpeed;
    for (let i = 0; i < this.allWords.length; i++) {
      this.allWords[i].speed = this.speed;
      this.allWords[i].noColorChange = false;
      this.allWords[i].isTheOne = false;
      this.allWords[i].container.classList.remove('focus');
      if (this.allWords[i].container.classList.contains('isYellow')) {
        this.allWords[i].container.classList.remove('isYellow');
      }
    }
  }

  goNext() {
    let shifted = this.titles.shift();
    this.titles.push(shifted);
  }

  distance(a, b) {
    return Math.abs(b - a);
  }

  fadeout() {
    for (let i = 0; i < this.allWords.length; i++) {
      this.allWords[i].container.classList.remove('focus');
      this.allWords[i].container.classList.add('fadeout');
    }
  }
  updateContent() {
    for (let i = this.allWords.length - 1; i >= 0; i--) {
      this.container.removeChild(this.allWords[i].container);
    }
    this.allWords = [];
    // rebuild new content.
    this.end = this.minimum;
    this.goNext();
    if (this.target != null) {
      this.buildContentTarget(true, this.target);
    } else {
      this.buildContent(true);
    }
    this.restart();
    for (let i = this.allWords.length - 1; i >= 0; i--) {
      // this.allWords[i].container.classList.add('longer');
      this.allWords[i].container.classList.remove('fadeout');
    }
  }

  /*
  TEST
  */
  test() {
    let limitRight = window.innerWidth;
    let limitLeft = -this.biggestWidth;
    if (this.originalSpeed < 0) {
      // this.container.classList.add('debug');
      for (let i = this.allWords.length - 1; i >= 0; i--) {
        if (parseFloat(this.allWords[i].container.style.left) > limitRight) {
          if (parseFloat(this.allWords[i].container.style.left) < this.end) {
            this.end = parseFloat(this.allWords[i].container.style.left);
          }
          this.container.removeChild(this.allWords[i].container);
          // on enlève le mot qui dépasse la limite
          this.allWords.splice(i, 1);
        }
        // else {
        //   this.end = parseFloat(this.allWords[i].container.style.left) +
        //       this.allWords[i].width;
        // }
      }
      this.goNext();
      while (this.end < this.maximum) {
        this.fillup();
      }
    } else {
      for (let i = this.allWords.length - 1; i >= 0; i--) {
        if (parseFloat(this.allWords[i].container.style.left) < limitLeft) {
          if (parseFloat(this.allWords[i].container.style.left) +
                  this.allWords[i].width >
              this.start) {
            this.start = parseFloat(this.allWords[i].container.style.left) +
                this.allWords[i].width;
          }
          this.container.removeChild(this.allWords[i].container);
          // on enlève le mot qui dépasse la limite
          this.allWords.splice(i, 1);
        }
        // else {
        //   this.start = parseFloat(this.allWords[i].container.style.left) -
        //       this.allWords[i].width;
        // }
      }
      this.goNext();
      while (this.start > this.minimum) {
        this.fillup();
      }
    }

    this.restart();
  }

  fillup() {
    let word;
    if (this.originalSpeed > 0) {
      word = new Word(this.titles[0][this.titles.length - 1], this);
      // on enlève le dernier élément du tableau
      // attention ici on devrait changer la gamme des mots
      let poped = this.titles[0].pop();
      this.titles[0].unshift(poped);
    } else {
      word = new Word(this.titles[0][0], this);
      // on enlève le premier élément du tableau
      // attention ici on devrait changer la gamme des mots
      let shift = this.titles[0].shift();
      this.titles[0].push(shift);
    }

    // word.speed = this.speed;
    // on remet le mot dans la mémoire.
    this.allWords.push(word);

    if (this.originalSpeed > 0) {
      this.start -= word.width;
      word.setPosition(this.start);
      // this.start -= word.width;
    } else {
      word.setPosition(this.end);
      this.end += word.width;
    }
  }
}

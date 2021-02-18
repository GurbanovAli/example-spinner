"use strict";

function Reel(strip, num, numImg) {
  PIXI.Container.call(this);
  this.reelstrip = strip;
  this.num = num;
  this.numImg = numImg; //reelSequenceNumber

  this.arrTexture = [];
  this.arrSprits4 = [];
  this.vy = null;
  this.stopElement = null;
  this.state = null;
  this.bufferArr = [];
  this.heightSprite = 168;
  this.widthSprite = 198;
  this.value = null;
}

Reel.prototype = Object.create(PIXI.Container.prototype);
Reel.prototype.constructor = Reel;

Reel.prototype.init = function () {
  for (i = 0; i < this.num; i++) {
    this.arrTexture.push(resources["gsym_" + i].texture);
  }

  for (i = 0; i < 4; i++) {
    this.arrSprits4[i] = new PIXI.Sprite(this.arrTexture[this.reelstrip[i]]);
    this.arrSprits4[i].anchor.set(0.5, 0.5);
    this.arrSprits4[i].y = this.heightSprite * i - this.heightSprite / 2;
    this.arrSprits4[i].x = this.widthSprite / 2;
    this.addChild(this.arrSprits4[i]);
  } //mask


  var rectangle = new PIXI.Graphics();
  rectangle.drawRect(0, 0, reelPanel.width - 20, reelPanel.height - 20);
  this.mask = rectangle;
  this.addChild(rectangle);
};

Reel.prototype.spin = function (_boolean) {
  for (i = 0; i < this.arrSprits4.length; i++) {
    this.arrSprits4[i].y += this.vy;
  }

  if (_boolean && this.arrSprits4[0].y > this.heightSprite / 2) {
    this.arrSprits4.unshift(this.arrSprits4.pop());
    this.arrSprits4[0].y = this.arrSprits4[1].y - this.heightSprite;

    if (this.bufferArr.length > 0) {
      this.arrSprits4[0].texture = this.arrTexture[this.bufferArr.pop()];
    }
  }
};

Reel.prototype.stop = function () {
  if (this.bufferArr.length === 0 && this.arrSprits4[1].y > reelPanel.height / 2 - 139 && this.arrSprits4[1].y <= reelPanel.height / 2 + 30 && this.vy > 1) {
    this.state = 1;
    this.vy = 12;
    this.spin(false);
  } else if (this.bufferArr.length === 0 && this.arrSprits4[1].y >= reelPanel.height / 2 + 30 && this.vy > 0) {
    this.vy = -1;
    this.spin(false);
  } else if (this.bufferArr.length === 0 && this.arrSprits4[2].y === reelPanel.height / 2 - 10 && this.vy < 0) {
    this.vy = 0;
    this.state = 2;
  } else {
    this.spin(true);
  } //console.log(this.arrSprits4)

};

Reel.prototype.getPosition = function (n) {
  this.stopElement = n; // Math.floor(Math.random() * ((this.reelstrip.length - 1) + 1));

  var currentEl = this.stopElement;
  currentEl--;

  for (i = 0; i < this.numImg * 5 + 3; i++) {
    if (currentEl > this.reelstrip.length - 1) {
      currentEl -= this.reelstrip.length;
    }

    if (currentEl < 0) {
      currentEl += this.reelstrip.length;
    }

    this.bufferArr.push(this.reelstrip[currentEl]);
    currentEl++;
  }
};
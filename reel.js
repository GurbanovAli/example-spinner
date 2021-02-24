function Reel(strip, n, numImg) {
   PIXI.Container.call(this);
   this.reelstrip = strip;
   this.numImg = numImg;
   this.arrTextures = [];
   this.arrSprits = [];
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

Reel.prototype.init = function() {
   for (i = 0; i < 9; i++) {
      let currentArr = [];
      for (j = 0; j < 11; j++) {
         currentArr.push(resources["gsym"].textures["gsym_" + i + "_" + j]);
      }
      this.arrTextures.push(currentArr)
   }

   for (i = 0; i < 4; i++) {
      this.arrSprits[i] = new PIXI.extras.AnimatedSprite(this.arrTextures[this.reelstrip[i]]);
      this.arrSprits[i].animationSpeed = 0.2;
      this.arrSprits[i].anchor.set(0.5, 0.5);
      this.arrSprits[i].loop = false;
      this.arrSprits[i].y = this.heightSprite * i - this.heightSprite / 2;
      this.arrSprits[i].x = this.widthSprite / 2;
      this.addChild(this.arrSprits[i]);
   }

   //mask
   let rectangle = new PIXI.Graphics();
   rectangle.drawRect(0, 0, reelPanel.width - 20, reelPanel.height - 20);
   this.mask = rectangle;
   this.addChild(rectangle);
};

Reel.prototype.spin = function(boolean) {
   for (i = 0; i < this.arrSprits.length; i++) {
      this.arrSprits[i].y += this.vy;
      if (this.arrSprits[i].y < -this.heightSprite / 2 + 20) {
         this.arrSprits[i].visible = false;
      } else {
         this.arrSprits[i].visible = true;
      }
   }
   if (boolean && this.arrSprits[0].y > this.heightSprite / 2) {
      this.arrSprits.unshift(this.arrSprits.pop());
      this.arrSprits[0].y = this.arrSprits[1].y - this.heightSprite;
      if (this.bufferArr.length > 0) {
         this.arrSprits[0].textures = this.arrTextures[this.bufferArr.pop()];
         this.arrSprits[0].updateTexture();
      }
      if (this.arrSprits[0].textures === this.arrTextures[8]) {
         this.setChildIndex(this.arrSprits[0], this.children.length - 1);
      };
   }
}

Reel.prototype.stop = function() {
   if (this.bufferArr.length === 0 && this.arrSprits[1].y > reelPanel.height / 2 - 139 && this.arrSprits[1].y <= reelPanel.height / 2 + 30 && this.vy > 1) {
      this.state = 1;
      this.vy = 30;
      this.spin(false);
   } else if (this.bufferArr.length === 0 && this.arrSprits[1].y >= reelPanel.height / 2 + 30 && this.vy > 0) {
      this.vy = -1;
      this.spin(false);
   } else if (this.bufferArr.length === 0 && this.arrSprits[2].y === reelPanel.height / 2 - 10 && this.vy < 0) {
      this.vy = 0;
      this.state = 2;
   } else {
      this.spin(true);
   }
}

Reel.prototype.getPosition = function() {
   // if you want to make three identical elements
   //this.stopElement = n
   // let currentEl = this.stopElement
   let currentEl = Math.floor(Math.random() * ((this.reelstrip.length - 1) + 1));
   currentEl--;
   for (i = 0; i < this.numImg * 5 + 3; i++) {
      if (currentEl > this.reelstrip.length - 1) {
         currentEl -= this.reelstrip.length
      }
      if (currentEl < 0) {
         currentEl += this.reelstrip.length
      }
      this.bufferArr.push(this.reelstrip[currentEl])
      currentEl++;
   }
}

Reel.prototype.speed = function() {
   if (this.bufferArr.length > 3)
      this.bufferArr.length = 3
}
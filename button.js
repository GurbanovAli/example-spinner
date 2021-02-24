function Button(icoPlay, textureUp, textureDown, pressBtn, releaseBtn) {
   PIXI.Container.call(this);
   this.icoPlay = icoPlay;
   this.textureUp = textureUp;
   this.textureDown = textureDown;
   this.button = null;
   this.pressBtn = pressBtn;
   this.releaseBtn = releaseBtn;
}

Button.prototype = Object.create(PIXI.Container.prototype);
Button.prototype.constructor = Button;

Button.prototype.init = function() {
   this.icoPlay.position.set(10, 10);
   this.button = new PIXI.Sprite(this.textureUp);
   this.addChild(this.button);

   this.icoPlay.interactive = true;
   this.icoPlay.on("mousedown", () => this.pressBtn());
   this.icoPlay.on("mouseup", () => this.releaseBtn());
   this.addChild(this.icoPlay);
}

Button.prototype.pressBtn = function() {
   this.pressBtn();
}

Button.prototype.releaseBtn = function() {
   this.button.texture = this.textureUp;
};
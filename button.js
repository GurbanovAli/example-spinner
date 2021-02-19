function Button() {
    PIXI.Container.call(this);
    this.icoPlay = null;
    this.textureUp = null;
    this.textureDown = null;
    this.button = null;
}

Button.prototype = Object.create(PIXI.Container.prototype);
Button.prototype.constructor = Button;

Button.prototype.init = function () {
    textureUp = this.textureUp;
    textureDown = this.textureDown;
    button = this.button;
    icoPlay = this.icoPlay;

    const BtnContainerPlay = new PIXI.Container();
    this.addChild(BtnContainerPlay)
    icoPlay = new PIXI.Sprite(resources.ico_play.texture)
    icoPlay.position.set(10, 10)

    textureUp = resources.btn.texture;
    textureDown = resources.btn_pressed.texture;
    button = new PIXI.Sprite(textureUp);

    BtnContainerPlay.addChild(button)

    icoPlay.interactive = true;
    icoPlay.on("mousedown", this.pressBtn);
    icoPlay.on("mouseup", this.releaseBtn);
    BtnContainerPlay.addChild(icoPlay);
    stage.addChild(this);
}
Button.prototype.pressBtn = function () {
    button.texture = textureDown;
    if (stateBtn === null) {
        ticker.add(stop);
        reel1.getPosition(0);
        reel2.getPosition(9);
        reel3.getPosition(2);
        reel1.arrSprits[2].gotoAndStop(0)
        reel2.arrSprits[2].gotoAndStop(0)
        reel3.arrSprits[2].gotoAndStop(0)
        ticker.add(getStop);
        reel1.vy = 24;
        reel2.vy = 24;
        reel3.vy = 24;
        stateBtn = 1;
    } else if (stateBtn === 1 && reel1.state == null && reel2.state == null && reel3.state == null) {
        reel1.vy = 30;
        reel2.vy = 30;
        reel3.vy = 30;
        stateBtn = null;
    } else if (stateBtn === 1 && reel1.state == null && reel2.state == null) {
        reel1.vy = 30;
        reel2.vy = 30;
        stateBtn = null;
    } else if (stateBtn === 1 && reel1.state == null && reel3.state == null) {
        reel1.vy = 30;
        reel3.vy = 30;
        stateBtn = null;
    } else if (stateBtn === 1 && reel2.state == null && reel3.state == null) {
        reel2.vy = 30;
        reel3.vy = 30;
        stateBtn = null;
    } else if (stateBtn === 1 && reel1.state == null) {
        reel1.vy = 30;
        stateBtn = null;
    } else if (stateBtn === 1 && reel2.state == null) {
        reel2.vy = 30;
        stateBtn = null;
    } else if (stateBtn === 1 && reel3.state == null) {
        reel3.vy = 30;
        stateBtn = null;
    };
}

Button.prototype.releaseBtn = function () {
    button.texture = textureUp;
};

function getStop() {
    reel1.stop();
    reel2.stop();
    reel3.stop();
};

function stop() {
    if (reel1.state == 2 && reel2.state == 2 && reel3.state == 2) {
        ticker.remove(getStop);
        reel1.state = null;
        reel2.state = null;
        reel3.state = null;
        stateBtn = null;
        if (reel1.arrSprits[2].texture === reel2.arrSprits[2].texture && reel2.arrSprits[2].texture === reel3.arrSprits[2].texture) {
            reel1.arrSprits[2].play();
            reel2.arrSprits[2].play();
            reel3.arrSprits[2].play();
        }
        ticker.remove(stop);
    }
}
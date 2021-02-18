function Button() {
    PIXI.Container.call(this);
    this.icoPlay = null;
    this.textureUp = null;
    this.textureDown = null;
    this.button = null;
}

Button.prototype = Object.create(PIXI.Container.prototype);
Button.prototype.constructor = Button;

Button.prototype.initBtn = function () {
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
        ticker.add(isStop);
        reel1.getPosition(0);
        reel2.getPosition(9);
        reel3.getPosition(2);
        ticker.add(stop);
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

function stop() {
    reel1.stop();
    reel2.stop();
    reel3.stop();
};

function isStop() {
    if (reel1.state == 2 && reel2.state == 2 && reel3.state == 2) {
        ticker.remove(stop);
        reel1.state = null;
        reel2.state = null;
        reel3.state = null;
        stateBtn = null;
        ticker.remove(isStop);
        if (reel1.arrSprits4[2].texture === reel2.arrSprits4[2].texture && reel2.arrSprits4[2].texture === reel3.arrSprits4[2].texture) {
            console.log(reel1.arrTexture[2].baseTexture.imageUrl)
             var arr = reel1.arrSprits4.pop(reel1.arrSprits4[2]);
            for (let i = 0; i < 4; i++) {
                arr.pop(arrSprits4)
                var texture = resources["gsym"].textures["gsym_0_" + i]
                arr.push(texture);
            }
        //      var b = new PIXI.extras.AnimatedSprite(arr);
        //    // b.animationSpeed = 0.167;
        //    //b.play();
        // //     // stage.addChild(bgr);
        //   stage.addChild(arr);
        }
    }
}
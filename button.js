function Button() {

    PIXI.Container.call(this);
    let btn = new PIXI.Sprite(resources.btn.texture)
    let play = new PIXI.Sprite(resources.play.texture)
    let btnPress = new PIXI.Sprite(resources.btnPress.texture)
    btn.position.set(stage.width - 550, stage.height / 3.5);
    play.position.set(10, 10)
    btnPress.position.set(stage.width - 550, stage.height / 3.5);
    textureUp = resources.btn.texture;
    textureDown = resources.btnPress.texture;

    btn.interactive = true;

    this.addChild(btn)
    btn.addChild(play)

    ticker = PIXI.ticker.shared;
    btn.addListener('click',
        pressBtn
    );
    var state = false;

    function pressBtn() {
        if (!state) {
            state = true
            btn.texture = textureDown;
            ticker.remove(reelStopOne);
            ticker.remove(reelStopTwo);
            ticker.remove(reelStopThree);
            ticker.add(reelPlayOne);
            ticker.add(reelPlayTwo);
            ticker.add(reelPlayThree);
        }
        setTimeout(() => {
            btn.texture = textureUp;
            stopBtn()
        }, 1000);

    }

    const reelPlayOne = () => {
        renderer.render(stage);
        reel1.spin()
    }
    const reelPlayTwo = () => {
        renderer.render(stage);
        reel2.spin()
    }
    const reelPlayThree = () => {
        renderer.render(stage);
        reel3.spin()
    }
    const reelStopOne = () => {
        renderer.render(stage);
        reel1.stop()
    }
    const reelStopTwo = () => {
        renderer.render(stage);
        reel2.stop()
    }
    const reelStopThree = () => {
        renderer.render(stage);
        reel3.stop()
    }

    function stopBtn() {
        state = false
        setTimeout(() => {
            ticker.remove(reelPlayOne);
            ticker.add(reelStopOne)
        }, 1000)
        setTimeout(() => {
            ticker.remove(reelPlayTwo);
            ticker.add(reelStopTwo)
        }, 2000)
        setTimeout(() => {
            ticker.remove(reelPlayThree);
            ticker.add(reelStopThree)
        }, 3000)
    }

}

Button.prototype = Object.create(PIXI.Container.prototype);
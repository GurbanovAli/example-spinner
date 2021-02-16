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
            btn.texture = textureDown;
            playBtn()
        } else {
            stopBtn()
        }
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

    function playBtn() {

        state = true
        setTimeout(() => {
            btn.texture = textureUp;
        }, 100)
        ticker.remove(reelStopOne);
        ticker.remove(reelStopTwo);
        ticker.remove(reelStopThree);
        ticker.add(reelPlayOne);
        ticker.add(reelPlayTwo);
        ticker.add(reelPlayThree);

        setTimeout(() => {
            if (state) {
                state = false
                setTimeout(() => {
                    ticker.remove(reelPlayOne);
                    ticker.add(reelStopOne)
                }, 100)
                setTimeout(() => {
                    ticker.remove(reelPlayTwo);
                    ticker.add(reelStopTwo)
                }, 300)
                setTimeout(() => {
                    ticker.remove(reelPlayThree);
                    ticker.add(reelStopThree)
                }, 500)
                ticker.add(reelPlayOne);
                ticker.add(reelPlayTwo);
                ticker.add(reelPlayThree);
            }
        }, 2000)
    }

    function stopBtn() {
        setTimeout(() => {
            btn.texture = textureUp;
        }, 100)
        if (state) {
            state = false
            setTimeout(() => {
                ticker.remove(reelPlayOne);
                ticker.add(reelStopOne)
            }, 100)
            setTimeout(() => {
                ticker.remove(reelPlayTwo);
                ticker.add(reelStopTwo)
            }, 300)
            setTimeout(() => {
                ticker.remove(reelPlayThree);
                ticker.add(reelStopThree)
            }, 500)
        }
        ticker.add(reelPlayOne);
        ticker.add(reelPlayTwo);
        ticker.add(reelPlayThree);
    }

}

Button.prototype = Object.create(PIXI.Container.prototype);
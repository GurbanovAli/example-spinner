

function Button() {
    PIXI.Container.call(this);

    var btnContainer, icoPlay, textureUp, textureDown, button;
    btnContainer = new PIXI.Graphics();
    btnContainer.drawCircle(0.5, 0.5, 100);
    btnContainer.position.set(1050, 300)
    icoPlay = new PIXI.Sprite(resources.ico_play.texture)
    icoPlay.position.set(10, 10)
    textureUp = resources.btn.texture;
    textureDown = resources.btn_pressed.texture;
    button = new PIXI.Sprite(textureUp);

    btnContainer.addChild(button)

    btnContainer.interactive = true;
    btnContainer.on("mousedown", pressBtn);
    btnContainer.on("mouseup", releaseBtn);
    btnContainer.addChild(icoPlay)

    function pressBtn() {
        button.texture = textureDown;
        if (stateBtn === null) {
            ticker.add(isStop);
            ticker.add(play);
            reel1.vy = 24;
            reel2.vy = 24;
            reel3.vy = 24;
            stateBtn = 1
        } else if (stateBtn === 2 && reel1.state == null && reel2.state == null && reel3.state == null) {
            reel1.vy = 69;
            reel2.vy = 69;
            reel3.vy = 69;
            stateBtn = 3;
        } else if (stateBtn === 2 && reel1.state == null && reel2.state == null) {
            reel1.vy = 69;
            reel2.vy = 69;
            stateBtn = 3;
        } else if (stateBtn === 2 && reel1.state == null && reel3.state == null) {
            reel1.vy = 69;
            reel3.vy = 69;
            stateBtn = 3;
        } else if (stateBtn === 2 && reel2.state == null && reel3.state == null) {
            reel2.vy = 69;
            reel3.vy = 69;
            stateBtn = 3;
        } else if (stateBtn === 2 && reel1.state == null) {
            reel1.vy = 69;
            stateBtn = 3;
        } else if (stateBtn === 2 && reel2.state == null) {
            reel2.vy = 69;
            stateBtn = 3;
        } else if (stateBtn === 2 && reel3.state == null) {
            reel3.vy = 69;
            stateBtn = 3;
        };

    };

    function releaseBtn() {
        button.texture = textureUp;
        if (stateBtn === 1) {
            reel1.randomInt();
            reel2.randomInt();
            reel3.randomInt();
            ticker.remove(play);
            ticker.add(stop);
            stateBtn = 2;
        };

    };
    stage.addChild(btnContainer);
}

Button.prototype = Object.create(PIXI.Container.prototype);
Button.prototype.constructor = Button;


Button.prototype.plays = function () {
    reel1.spin();
	reel2.spin();
	reel3.spin();
}

Button.prototype.stops = function () {
    reel1.stop();
	reel2.stop();
	reel3.stop();
}

Button.prototype.isStops = function () {
	if (reel1.state == 2 && reel2.state == 2 && reel3.state == 2) {
		ticker.remove(stop);
		reel1.state = null;
		reel2.state = null;
		reel3.state = null;
		stateBtn = null;
		ticker.remove(isStop);
	}
}

// function play() {
// 	reel1.spin();
// 	reel2.spin();
// 	reel3.spin();
// };

// function stop() {
// 	reel1.stop();
// 	reel2.stop();
// 	reel3.stop();
// };
var width = 1280,
	height = 720,
	loader = PIXI.loader,
	resources = loader.resources,
	renderer = new PIXI.autoDetectRenderer(width, height, {
		view: document.getElementById("canvas")
	}),
	stage = new PIXI.Container(),
	reelPanelOne = new PIXI.Container(),
	stateBtn = null,
	ticker = null,
	reelPanel = null,
	reel1 = null,
	reel2 = null,
	reel3 = null,
	reelPaneltrip1 = [
		0, //Seven
		1, //Bar
		2, //Melon
		3, //Grapes
		4, //Plum
		5, //Orange
		6, //Lemon
		7, //Cherry
		8, //Star
		0, //Seven
		2, //Melon
		4, //Plum
		6, //Lemon
		1, //Bar
		3, //Grapes
		5, //Orange
		7, //Cherry
		8 //Star
	],
	reelPaneltrip2 = [
		0, //Seven
		1, //Bar
		1, //Bar
		2, //Melon
		3, //Grapes
		4, //Plum
		6, //Lemon
		6, //Lemon
		7, //Cherry
		8, //Star
		0, //Seven
		2, //Melon
		4, //Plum
	],
	reelPaneltrip3 = [
		0, //Seven
		0, //Seven
		8, //Star
		3, //Grapes
		4, //Plum
		5, //Orange
		6, //Lemon
		7, //Cherry
		7, //Cherry
		2, //Melon
		4, //Plum
		2, //Melon
		6, //Lemon
		1, //Bar
		1, //Bar
		3, //Grapes
		5, //Orange
		7, //Cherry
		7, //Cherry
		2 //Melon
	],
	score = [40, 20, 16, 16, 2, 2, 2, 2, 50],
	wfd;
loader
	.add('bgr', 'images/bgr.png')
	.add('reelPanel', 'images/reels.png')
	.add('gsym', 'images/gsym.json')
	.add('btn_pressed', 'images/btn_pressed.png')
	.add('ico_play', 'images/ico_play.png')
	.add('btn', 'images/btn.png')
	.add('paytable', 'images/paytable.png')
	.add('logo', 'images/logo.png')
	.add('wfd', 'images/wfd.png')
	.load(onAssetsLoaded);

function onAssetsLoaded() {
	init();
}

function init() {
	const bgr = new PIXI.Sprite(resources.bgr.texture);
	stage.addChild(bgr);

	reelPanel = new PIXI.Sprite(resources.reelPanel.texture);
	reelPanelOne.addChild(reelPanel);

	reelPanelOne.position.set(renderer.width / 2 - reelPanel.width / 2, renderer.height / 2 - reelPanel.height / 2);

	var paytableSprite = new PIXI.Sprite(resources.paytable.texture),
		paytable = new Paytable(paytableSprite, score);
	paytable.position.set(25, renderer.height / 2 - paytableSprite.height / 2);
	paytable.init();
	stage.addChild(paytable)

	reel1 = new Reel(reelPaneltrip1, 9, 1);
	reel1.init();

	reel1.position.set(10, 10);
	reelPanelOne.addChild(reel1)

	reel2 = new Reel(reelPaneltrip2, 9, 2);
	reel2.init();

	reel2.position.set(218, 10);
	reelPanelOne.addChild(reel2)

	reel3 = new Reel(reelPaneltrip3, 9, 3);
	reel3.init();

	reel3.position.set(426, 10);
	reelPanelOne.addChild(reel3);

	var logo = new PIXI.Sprite(resources.logo.texture);
	logo.position.set(renderer.width / 2 - logo.width / 2, 20);
	//logo.visible = false;
	stage.addChild(logo);

	wfd = new PIXI.Sprite(resources.wfd.texture);
	wfd.position.set(renderer.width / 2 - wfd.width / 2, 20);
	wfd.visible = false;
	stage.addChild(wfd)

	var icoPlay = new PIXI.Sprite(resources.ico_play.texture),
		textureUp = resources.btn.texture,
		textureDown = resources.btn_pressed.texture,
		button = new Button(icoPlay, textureUp, textureDown, pressBtn, releaseBtn);
	button.position.set(1050, 300);
	button.init();
	stage.addChild(button);


	stage.addChild(reelPanelOne);
	ticker = PIXI.ticker.shared;
	ticker.add(render);
	render();
}

function pressBtn() {
	this.button.texture = this.textureDown;
	if (stateBtn === null) {
		ticker.add(stop);
		reel1.getPosition(0);
		reel2.getPosition(0);
		reel3.getPosition(0);
		wfd.visible = false;
		reel1.arrSprits[1].gotoAndStop(0)
		reel2.arrSprits[1].gotoAndStop(0)
		reel3.arrSprits[1].gotoAndStop(0)
		reel1.arrSprits[2].gotoAndStop(0)
		reel2.arrSprits[2].gotoAndStop(0)
		reel3.arrSprits[2].gotoAndStop(0)
		ticker.add(getStop);
		reel1.vy = 30;
		reel2.vy = 30;
		reel3.vy = 30;
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

function releaseBtn() {
	this.button.texture = this.textureUp;
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
		winPosition()
		ticker.remove(winPosition);
		ticker.remove(stop);
	}
}

function render() {
	renderer.render(stage);
};

function winPosition() {

	if (reel1.arrSprits[2].texture === reel2.arrSprits[2].texture && reel2.arrSprits[2].texture === reel3.arrSprits[2].texture) {
		scores(reel1.arrSprits[2].textures)
		wfd.visible = true;
		reel1.arrSprits[2].play();
		reel2.arrSprits[2].play();
		reel3.arrSprits[2].play();
	}

	if (reel1.arrSprits[1].texture === reel2.arrSprits[1].texture && reel2.arrSprits[1].texture === reel3.arrSprits[1].texture) {
		scores(reel1.arrSprits[1].textures)
		reel1.arrSprits[1].play();
		reel2.arrSprits[1].play();
		reel3.arrSprits[1].play();
	}

	if (reel1.arrSprits[3].texture === reel2.arrSprits[3].texture && reel2.arrSprits[3].texture === reel3.arrSprits[3].texture) {
		scores(reel1.arrSprits[3].textures)
		reel1.arrSprits[3].play();
		reel2.arrSprits[3].play();
		reel3.arrSprits[3].play();
	}

	if (reel1.arrSprits[1].texture === reel2.arrSprits[2].texture && reel2.arrSprits[2].texture === reel3.arrSprits[3].texture) {
		scores(reel1.arrSprits[1].textures)
		reel1.arrSprits[1].play();
		reel2.arrSprits[2].play();
		reel3.arrSprits[3].play();
	}

	if (reel1.arrSprits[3].texture === reel2.arrSprits[2].texture && reel2.arrSprits[2].texture === reel3.arrSprits[1].texture) {
		scores(reel1.arrSprits[3].textures)
		reel1.arrSprits[3].play();
		reel2.arrSprits[2].play();
		reel3.arrSprits[1].play();
	}

}

function scores(text) {
	var indexArr = reel1.arrTextures.indexOf(text)
	var getScore = score.find((item, i) => i === indexArr)

	var style = {
        fontSize: "48px",
        fontWeight: "bold",
        fill: "white"
    };

	var countingText = new PIXI.Text('0', style);
	var count = 0;
	ticker.add(animate)

	// if(count == getScore) {
	// 	ticker.remove(animate)
	// 	ticker.add(animate2)
	// }

	function animate() {

		if(count <= getScore) {
			count += 0.005;
			// count -= 0.005;

		}
		
        countingText.text = Math.floor(count);
		countingText.position.set(renderer.width / 2 , 50);
		countingText.anchor.set(0.5, 0.5);
		stage.addChild(countingText);

        requestAnimationFrame(animate);

    }
	if(count == getScore ){
		console.log(true)
	}
	// function animate2() {

	// 	if(count == getScore) count -= 0.005;

		
		
    //     countingText.text = Math.floor(count);
	// 	countingText.position.set(renderer.width / 2 , 50);
	// 	countingText.anchor.set(0.5, 0.5);
	// 	stage.addChild(countingText);

    //     requestAnimationFrame(animate2);

    // }
}
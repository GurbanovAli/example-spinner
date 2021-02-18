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
		2, //Melon
		4, //Plum
		6 //Lemon
	],
	reelPaneltrip2 = [
		3, //Grapes
		4, //Plum
		6, //Lemon
		6, //Lemon
		7, //Cherry
		8, //Star
		0, //Seven
		2, //Melon
		4, //Plum
		0, //Seven
		1, //Bar
		1, //Bar
		2, //Melon
		3, //Grapes
		4, //Plum
		6, //Lemon
		6, //Lemon
		4, //Plum
		6, //Lemon
		6 //Lemon
	],
	reelPaneltrip3 = [
		2, //Melon
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
		2, //Melon
		0, //Seven
		7, //Cherry
		2, //Melon
		0 //Seven
	];
loader
	.add('bgr', 'images/bgr.png')
	.add('reelPanel', 'images/reels.png')
	.add('gsym_0', 'images/gsym_0.png')
	.add('gsym', 'jsonЫ/gsym.json')
	.add('gsym_1', 'images/gsym_1.png')
	.add('gsym_2', 'images/gsym_2.png')
	.add('gsym_3', 'images/gsym_3.png')
	.add('gsym_4', 'images/gsym_4.png')
	.add('gsym_5', 'images/gsym_5.png')
	.add('gsym_6', 'images/gsym_6.png')
	.add('gsym_7', 'images/gsym_7.png')
	.add('gsym_8', 'images/gsym_8.png')
	.add('btn_pressed', 'images/btn_pressed.png')
	.add('ico_play', 'images/ico_play.png')
	.add('btn', 'images/btn.png')
	
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

	//button
	const button = new Button();
	button.position.set(1050, 300);
	button.initBtn()
	//end

	stage.addChild(reelPanelOne);
	ticker = PIXI.ticker.shared;
	ticker.add(render);
	render();
}

function render() {
	renderer.render(stage);
};


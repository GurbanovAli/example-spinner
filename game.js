var width = 1280,
	height = 720,
	loader = PIXI.loader,
	resources = loader.resources,
	renderer = new PIXI.autoDetectRenderer(width, height, {view: document.getElementById("canvas")});
	stage = new PIXI.Container();
	stageReel = new PIXI.Container();
	stageReelstrip = new PIXI.Container();
	
	// Sprite = PIXI.Sprite,
	ticker = null,
	reelPanel = null,
	reel1 = null,
	reelstrip1 = [
		0, //Seven
		1, //Bar
		2, //Melon
		3, //Grapes
		4, //Plum
		5, //Orange
		6, //Lemon
		7, //Cherry
		0, //Seven
		2, //Melon
		4, //Plum
		6, //Lemon
		1, //Bar
		3, //Grapes
		5, //Orange
		7  //Cherry
	];
	
loader
	.add('bgr', 'images/bgr.jpg')
	.add('reels', 'images/reels.png')	
	.add('seven', 'images/gsym_0.png')
	.add('bar', 'images/gsym_1.png')
	.add('melon', 'images/gsym_2.png')
	.add('grapes', 'images/gsym_3.png')
	.add('plum', 'images/gsym_4.png')
	.add('orange', 'images/gsym_5.png')
	.add('lemon', 'images/gsym_6.png')
	.add('cherry', 'images/gsym_7.png')
	.load(onAssetsLoaded);

function onAssetsLoaded() 
{
	init();
}
				
function init()
{
	var bgr = new PIXI.Sprite(resources.bgr.texture);
	var reels = new PIXI.Sprite(resources.reels.texture)
	var seven = new PIXI.Sprite(resources.seven.texture)
	var bar = new PIXI.Sprite(resources.bar.texture)
	var melon = new PIXI.Sprite(resources.melon.texture)
	
	stage.addChild(bgr);
	stage.addChild(stageReel)
	stageReel.addChild(reels).position.set(512, 96)
	stageReel.addChild(stageReelstrip)
	stageReelstrip.addChild(seven).position.set(522,106)
	stageReelstrip.addChild(bar).position.set(522,274)
	stageReelstrip.addChild(melon).position.set(522,424)
		
	//TODO init the reelPanel (Sprite) and add it at the center of the stage
		
	//TODO init the reel1 (see reel.js) and position it at the center of the stage
		
	ticker = PIXI.ticker.shared;
	ticker.add(render);
}

function render()
{
	//TODO call the spin function of the reel
	
	renderer.render(stage);
};
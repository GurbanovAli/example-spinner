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
   arrAnimation = [],
   getScore = 0,
   winPanel;

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
   .add('win_font', 'images/win_font.fnt')
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

   paytableSprite = new PIXI.Sprite(resources.paytable.texture),
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
   stage.addChild(logo);

   var icoPlay = new PIXI.Sprite(resources.ico_play.texture),
      textureUp = resources.btn.texture,
      textureDown = resources.btn_pressed.texture,
      button = new Button(icoPlay, textureUp, textureDown, pressBtn, releaseBtn);
   button.position.set(1050, 300);
   button.init();
   stage.addChild(button);

   winPanel = new WinPanel();
   winPanel.position.set(width / 2 - winPanel.width / 2, reelPanelOne.y - winPanel.height - 5);
   stage.addChild(winPanel);
   winPanel.visible = false;

   stage.addChild(reelPanelOne);
   ticker = PIXI.ticker.shared;
   ticker.add(render);
   render();
}

function render() {
   renderer.render(stage);
};

function pressBtn() {
   this.button.texture = this.textureDown;
   if (stateBtn === null) {
      reel1.getPosition();
      reel2.getPosition();
      reel3.getPosition();
      for (var i = 1; i < 4; i++) {
         reel1.arrSprits[i].gotoAndStop(0);
         reel2.arrSprits[i].gotoAndStop(0);
         reel3.arrSprits[i].gotoAndStop(0);
      }
      reel1.vy = 30;
      reel2.vy = 30;
      reel3.vy = 30;
      stateBtn = 1;
      ticker.add(stop);
      ticker.remove(playAnimation);
      winPanel.visible = false;
      arrAnimation = [];
      winPanel.count = -1;
   } else if (stateBtn === 1 && reel1.state == null && reel2.state == null && reel3.state == null) {
      reel1.vy = 30;
      reel2.vy = 30;
      reel3.vy = 30;
      stateBtn = null;
   } else if (stateBtn === 1 && reel1.state === null && reel2.state === null && reel3.state === null) {
      reel1.speed();
      reel2.speed();
      reel3.speed();
      reel1.vy = 50;
      reel2.vy = 50;
      reel3.vy = 50;
      stateBtn = 2;
   } else if (stateBtn === 1 && reel2.state === null && reel3.state === null) {
      reel2.speed();
      reel3.speed();
      reel2.vy = 50;
      reel3.vy = 50;
      stateBtn = 2;
   } else if (stateBtn === 1 && reel3.state == null) {
      reel3.speed();
      reel3.vy = 50;
      stateBtn = 2;
   }
}

function releaseBtn() {
   this.button.texture = this.textureUp;
};

function stop() {
   reel1.stop();
   reel2.stop();
   reel3.stop();
   if (reel1.state == 2 && reel2.state == 2 && reel3.state == 2) {
      winPosition()
      reel1.state = null;
      reel2.state = null;
      reel3.state = null;
      stateBtn = null;
      ticker.remove(stop);
   }
}

function winPosition() {

   var winState = false;
   if (reel1.arrSprits[1].texture === reel2.arrSprits[1].texture && reel2.arrSprits[1].texture === reel3.arrSprits[1].texture) {
      arrAnimation.push([reel1.arrSprits[1], reel2.arrSprits[1], reel3.arrSprits[1]]);
      scores(reel1.arrSprits[1].textures);
      winState = true;
   };
   if (reel1.arrSprits[2].texture === reel2.arrSprits[2].texture && reel2.arrSprits[2].texture === reel3.arrSprits[2].texture) {
      arrAnimation.push([reel1.arrSprits[2], reel2.arrSprits[2], reel3.arrSprits[2]]);
      scores(reel1.arrSprits[2].textures);
      winState = true;
   };
   if (reel1.arrSprits[3].texture === reel2.arrSprits[3].texture && reel2.arrSprits[3].texture === reel3.arrSprits[3].texture) {
      arrAnimation.push([reel1.arrSprits[3], reel2.arrSprits[3], reel3.arrSprits[3]]);
      scores(reel1.arrSprits[3].textures);
      winState = true;
   };
   if (reel1.arrSprits[1].texture === reel2.arrSprits[2].texture && reel2.arrSprits[2].texture === reel3.arrSprits[3].texture) {
      arrAnimation.push([reel1.arrSprits[1], reel2.arrSprits[2], reel3.arrSprits[3]]);
      scores(reel1.arrSprits[1].textures);
      winState = true;
   };
   if (reel1.arrSprits[3].texture === reel2.arrSprits[2].texture && reel2.arrSprits[2].texture === reel3.arrSprits[1].texture) {
      arrAnimation.push([reel1.arrSprits[3], reel2.arrSprits[2], reel3.arrSprits[1]]);
      scores(reel1.arrSprits[3].textures);
      winState = true;
   };
   if (winState) {
      ticker.add(playAnimation);
      winPanel.count = 0;
      ticker.add(totalScore);
   };
}

function playAnimation() {
   if (!arrAnimation[arrAnimation.length - 1][2].playing) {
      for (var j = 0; j < 3; j++) {
         arrAnimation[0][j].gotoAndPlay(0);
      }
      arrAnimation.push(arrAnimation.shift());
   }
}

function scores(text) {
   getScore += score[reel1.arrTextures.indexOf(text)];
};

function totalScore() {
   winPanel.init()
};
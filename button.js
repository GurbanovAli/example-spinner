function Button() {

    PIXI.Container.call(this);
    var btn = new PIXI.Sprite(resources.btn.texture)
    var play = new PIXI.Sprite(resources.play.texture)
    btn.position.set(stage.width - 550, stage.height / 3.5);
    play.position.set(10, 10)

    btn.interactive = true;

    this.addChild(btn)
    btn.addChild(play)

    let state = false;
    ticker = PIXI.ticker.shared;
    btn.addListener('click',
        pressBtn
    );

    function pressBtn() {
        if (!state) {
            ticker.add(plays);
            state = true;
        } else {
            ticker.remove(plays)
            
            ticker.add(exe)
            state = false
        }
    }
}

Button.prototype = Object.create(PIXI.Container.prototype);
Button.prototype.constructor = Button;

function plays() {
    renderer.render(stage)
    reel1.spin();
    
    reel2.spin();
    reel3.spin();
}
function exe(){
    //renderer.render(stage)
    reel1.stop();
    // reel2.stop();
    // reel3.stop();
}








































// // Aliases
// // var Container = PIXI.Container,
// //     autoDetectRenderer = PIXI.autoDetectRenderer,
// //     loader = PIXI.loader,
// //     resources = PIXI.loader.resources,
// //     TextureCache = PIXI.utils.TextureCache,
// //     Rectangle = PIXI.Rectangle,
// //     Sprite = PIXI.Sprite,
// //     Graphics = PIXI.Graphics,
// //     Text = PIXI.Text,
// //     MovieClip = PIXI.extras.MovieClip,
// //     TilingSprite = PIXI.extras.TilingSprite,
// //     ParticleContainer = PIXI.ParticleContainer,
//     var Point = PIXI.Point,
//     // Rope = PIXI.mesh.Rope;

// // var app = autoDetectRenderer(500, 500);
// // document.body.appendChild(app.view);
// // var stage = new Container();

// // var b = new Bump(PIXI);
// // var su = new SpriteUtilities(PIXI);
// // var d = new Dust(PIXI);
// // var c = new Charm(PIXI);
// // var t = new Tink(PIXI, app.view);

// loader
//     .add("images/btn.png")


// var id, star, playButton, over, up, down;

// function setup() {
//     pointer = t.makePointer();

//     over = TextureCache["images/over.png"];
//     up = TextureCache["images/up.png"];
//     down = TextureCache["images/down.png"];
//     playButton = t.button([up, over, down], 32, 96);
//     stage.addChild(playButton);

//     stars = d.emitter(
//         1000,
//         function () {
//             d.create(
//                 256,
//                 256,
//                 () =>
//                 su.sprite("images/star.png"),
//                 stage,
//                 50,
//                 0,
//                 true,
//                 0, 6.28,
//                 12, 24,
//                 2, 5,
//                 0.005, 0.01,
//                 0.005, 0.01,
//                 0.05, 0.1

//             )
//         }

//     );

//     // id = resources["images/button.json"].textures;

//     // //The button state textures
//     // var buttonFrames = [id["up.png"], id["over.png"], id["down.png"]];

//     // //The `playButton`
//     // playButton = t.button(buttonFrames, 32, 96);

//     // //Add the button to the stage
//     // stage.addChild(playButton);

//     //Define the button's actions
//     playButton.over = function () {
//         return console.log("over");
//     };
//     playButton.out = function () {
//         return console.log("out");
//     };
//     playButton.press = function () {
//         stars.play();
//     };
//     playButton.release = function () {
//         stars.stop();
//     };
//     playButton.tap = function () {
//         return console.log("tapped");
//     };

//     state = play;
//     gooLoop()

// }

// function gooLoop() {
//     requestAnimationFrame(gooLoop);
//     state();
//     d.update();
//     t.update();
//     app.render(stage);
// }

// function play() {}
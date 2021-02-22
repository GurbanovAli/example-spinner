function Paytable(sprite, arr) {
    PIXI.Container.call(this);
    this.sprite = sprite
    this.arr = arr

}

Paytable.prototype = Object.create(PIXI.Container.prototype);
Paytable.prototype.constructor = Paytable;

Paytable.prototype.init = function () {
    this.addChild(this.sprite)
    
    var style = {
        fontSize: "48px",
        fontWeight: "bold",
        fill: "white"
    };
     arr = this.arr
    for (var i = 0; i < arr.length; i++) {
        var text = new PIXI.Text(arr[i], style);
        text.anchor.set(0.5, 0.5);
        text.position.set(this.width / 2 + 70, i * 48 + text.height / 2);
        this.addChild(text);
    }
}
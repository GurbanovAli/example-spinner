function Reel(strip) {
    PIXI.Container.call(this);
    this.reelstrip = strip;
    this.arrSprits = [];
    this.arrWild = [];
    this.vy = null;
    this.stopElement = null;
    this.state = null;
}

Reel.prototype = Object.create(PIXI.Container.prototype);
Reel.prototype.constructor = Reel;

Reel.prototype.init = function() {
    for (var i = 0; i < this.reelstrip.length; i++) {
        if (this.reelstrip[i] === 8) {
            var element = new PIXI.Sprite(resources["gsym_" + this.reelstrip[i]].texture);
            element.y = 169 * i - 84;
            element.x = 103;
            element.anchor.set(0.5, 0.5)
            this.arrSprits.push(element);
            this.arrWild.push(element);
        } else {
            var element = new PIXI.Sprite(resources["gsym_" + this.reelstrip[i]].texture);
            element.y = 169 * i - 84
            element.x = 99;
            element.anchor.set(0.5, 0.5)
            this.arrSprits.push(element)
            this.addChild(element);
        }
    };
    for (var j = 0; j < this.arrWild.length; j++) {
        this.addChild(this.arrWild[j]);
    }
    //mask
    var rectangle = new PIXI.Graphics();
    rectangle.drawRect(0, 0, reelPanel.width - 20, reelPanel.height - 20);
    this.mask = rectangle;
    this.addChild(rectangle);

};
Reel.prototype.spin = function() {
    for (i = 0; i < this.arrSprits.length; i++) {
        this.arrSprits[i].y += this.vy;
        if (this.arrSprits[i].y < -73 || this.arrSprits[i].y > reelPanel.height + 50) {
            this.arrSprits[i].visible = false;
        } else this.arrSprits[i].visible = true;
    }
    for (i = 0; i < this.arrSprits.length; i++) {
        if (i === this.arrSprits.length - 1 && this.arrSprits[0].y > 0 && this.arrSprits[0].y < reelPanel.height / 2) {
            this.arrSprits[i].y = this.arrSprits[0].y - 169;
        } else if (i < this.arrSprits.length - 1 && this.arrSprits[i + 1].y > 0 && this.arrSprits[i + 1].y < reelPanel.height / 2) {
            this.arrSprits[i].y = this.arrSprits[i + 1].y - 169;
        }
    }
}
Reel.prototype.stop = function() {
    if (this.stopElement.y > reelPanel.height / 2 - 159 && this.stopElement.y <= reelPanel.height / 2 + 10 && this.vy > 12) {
        this.state = 1;
        this.vy = 12;
        this.spin();
    } else if (this.stopElement.y > reelPanel.height / 2 + 10 && this.vy === 12) {
        this.vy = -1;
        this.spin();
    } else if (this.stopElement.y === reelPanel.height / 2 - 10 && this.vy < 0) {
        this.vy = 0;
        this.state = 2;
    } else {
        this.spin()
    };
};

Reel.prototype.randomInt = function() {
    var stopNum = Math.floor(Math.random() * (this.arrSprits.length - 1 + 1));
    this.stopElement = this.arrSprits[stopNum];
};

Reel.prototype.positions = function(arg) {

    arr = this.arrSprits;
    for (var i = 0; i <= arr.length; i++) {
        (arr[i].y >= 168) && (arr[i].y <= 336) && (this.reelstrip[i] === 0) ? arg = arr[i]: ''

        //console.log(this.reelstrip[i])
        // console.log(arg)
    }
    return arg




}
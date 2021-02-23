function WinPanel() {
    PIXI.Container.call(this);
    this.sprite = new PIXI.Sprite(resources.wfd.texture);
    this.addChild(this.sprite);
    this.state = false;
    this.count = 0;
    this.style = {
        font: "win_font",
    };
    // this.indexArr = reel1.arrTextures.indexOf(text)
    // this.getScore = score.find((item, i) => i === this.indexArr)
    this.countingText = new PIXI.extras.BitmapText('0', this.style);
    this.countingText.anchor.set(0.5, 0.5);
    this.countingText.position.set(this.width / 2, this.height / 2 + 4);
    this.addChild(this.countingText);
}

WinPanel.prototype = Object.create(PIXI.Container.prototype);
WinPanel.prototype.constructor = WinPanel;

WinPanel.prototype.init = function () {
    this.visible = true;
    if (!this.state && this.count < getScore) {
        console.log(true)
        this.count += 0.5;
        this.countingText = Math.floor(this.count);
    // } else if (!this.state && this.count < getScore + 40) {
    //     this.count += 1;
    // } else if (!this.state && this.count === getScore + 40) {
    //     this.count = getScore
    //     this.state = true;
    } else if (this.state && this.count !== 0) {
        this.count -= 0.5;
        this.countingText.text = Math.ceil(this.count).toString();
    } else if (this.state && this.count === 0) {
        this.state = false;
        getScore = 0;
        this.visible = false;
        ticker.remove(totalScore);
    };
}
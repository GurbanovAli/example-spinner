function Reel(strip) {
	PIXI.Container.call(this);
	this.reelstrip = strip;
	this.arr = [];
	this.arrWild = [];
}

Reel.prototype = Object.create(PIXI.Container.prototype);
Reel.prototype.constructor = Reel;

Reel.prototype.init = function () {

	for (let i = 0; i < this.reelstrip.length; i++) {
		if (this.reelstrip[i] === 8) {
			let element = new PIXI.Sprite(resources["gsym_" + this.reelstrip[i]].texture);
			element.y = 168 * i - 176;
			element.x = -9;
			

			this.arr.push(element);
			this.arrWild.push(element);
		} else {
			let element = new PIXI.Sprite(resources["gsym_" + this.reelstrip[i]].texture);
			element.y = 168 * i - 168
			this.arr.push(element)
			this.addChild(element);
		}
	}

	for (let j = 0; j < this.arrWild.length; j++) {
		this.addChild(this.arrWild[j]);
	}

	//mask
	let rectangle = new PIXI.Graphics();
	rectangle.drawRect(0, 0, 198, 504);
	this.mask = rectangle;
	this.addChild(rectangle);

};

Reel.prototype.spin = function () {

	for (i = 0; i < this.arr.length; i++) {
		this.arr[i].y += 30;
		if (this.arr[i].y < -20 || this.arr[i].y > reelPanel.height + 50) {
			this.arr[i].visible = false;
		} else this.arr[i].visible = true;
	}
	
	for (i = 0; i < this.arr.length; i++) {
		if (i === this.arr.length - 1 && this.arr[0].y > 0 && this.arr[0].y < reelPanel.height / 2) {
			this.arr[i].y = this.arr[0].y - 168;
		} else if (i < this.arr.length - 1 && this.arr[i + 1].y > 0 && this.arr[i + 1].y < reelPanel.height / 2) {
			this.arr[i].y = this.arr[i + 1].y - 168;
		}
	}
}

Reel.prototype.stop = function () {
	let value;

	for (let i = 0; i < this.arr.length; i++) {
		if (this.arr[i].y >= 0 && this.arr[i].y <= 168) {
			value = this.arr[i].y;
			for (let j = 0; j < this.arr.length; j++) {
				this.arr[j].y -= value / 24;
			}
		}
	}
}


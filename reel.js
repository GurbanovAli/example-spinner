function Reel(strip)
{
	PIXI.Container.call(this);
	
	this.reelstrip = strip;
}
Reel.prototype = Object.create(PIXI.Container.prototype);
Reel.prototype.constructor = Reel;

Reel.prototype.init = function()
{
	/*
	 * TODO add all necessary elements of the reel (sprites, mask) here
	 *
	 * Add 4 symbols (sprites) and position them on the reel 
	 * The first symbol is positioned outside of the reel
	 * The second symbol is the first visible symbol followed by the other symbols
	 * The mask is covering the visible part of the reel
	 */
};

Reel.prototype.spin = function()
{
	/*
	 * TODO implement the spin functionality here
	 * 
	 * Move all symbols downwards 
	 * If a symbol is out of the reel
	 * position it above the reel (where first symbol is positioned at the start) 
	 * and change the symbol according to the reelstrip
	 */
};

//TODO add additional used functions of the reel element here
var canvas;
var real;

function setup(){
	canvas = createCanvas(600, 600);
	canvas.id('game-canvas');
	real = document.getElementById('game-canvas');
}

function draw(){
	clear();
	real.style.zIndex = -1;
	if(!playing){
		return;
	}
	real.style.zIndex = 1;

	background(255, 255, 255);

}
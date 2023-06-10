function setup(){
createCanvas(1000, 1000);
}

function draw(){
	background(255, 0, 0);
	fill(random(0, 255));
	rect(random(0, 100), random(0, 100), 100, 100);
}
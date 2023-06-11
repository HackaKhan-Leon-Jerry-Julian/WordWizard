var canvas;
var real;

var x, y, vx = 0, vy = 0, left, right, up, down, typing = false;

var input = '';
var health = 100;

var time = 0;
var enemies = [];

var effects = [];

function setup(){
    canvas = createCanvas(600, 600);
	canvas.id('game-canvas');
	real = document.getElementById('game-canvas');

    x = width/2;
    y = height/2;
	frameRate(60);
}


function draw(){
	noStroke();
	rectMode(CENTER);
	textAlign(CENTER);
	textSize(20);
	// textMode(CENTER);
	if(!playing || cards.length === 0){
		clear();
		real.style.display = "none";
		time = 0;
		health = 100;
		enemies = [];
		effects = [];
		x = width/2;
    	y = height/2;
    	vx = 0;
    	vy = 0;
		return;
	}
	real.style.display = "block";

	if(health < 1){
		fill(255, 0, 0, 10);
		rect(width/2, height/2, width, height);
		time++;
		if(time > 100){
			fill(150, 0, 0, 50);
			textSize(50);
			text("YOU ARE DEAD", width / 2, height / 2);
		}
		return;
	}
	background(60, 60, 60);

	fill(0, 0, 0, 50);
	rect(x - 5, y + 5, 20, 20);
	text(input, x - 5, y - 15);

	fill(200, 200, 200);
	rect(x, y, 20, 20);

	fill(255, 255, 255);
	text(input, x, y - 20);

	x += vx;
	y += vy;
	vx *= 0.8;
	vy *= 0.8;
	time += 1;

	if(left){
		vx -= 2;
	}
	if(right){
		vx += 2;
	}
	if(up){
		vy -= 2;
	}
	if(down){
		vy += 2;
	}

	for(var i = 0;i < 10;i++){
		fill(0, 0, 0, 50);
		rect(10 + i * 20 - 5, 15, 15, 15);
		fill(40, 40, 40);
		rect(10 + i * 20, 10, 15, 15);
	}
	for(var i = 0;i < (health - 1) / 10;i++){
		fill(200, 100, 100);
		if(i >= health / 10 - 1){
			rect(10 + i * 20, 10, 15 * (((health - 1) % 10) + 1) / 10, 15 * (((health - 1) % 10) + 1) / 10);
		}else{
			rect(10 + i * 20, 10, 15, 15);
		}
	}

	if(x < 0){
		x = 0;
	}
	if(x > width){
		x = width;
	}
	if(y < 0){
		y = 0;
	}
	if(y > height){
		y = height;
	}

	if(random(0, 1) < time * 0.000001 + 0.01){
		var spawnx = 0, spawny = 0, side = round(random(-0.49, 3.49));
		if(side === 0){
			spawnx = -10;
			spawny = random(0, height);
		}
		if(side === 1){
			spawnx = width + 10;
			spawny = random(0, height);
		}
		if(side === 2){
			spawny = -10;
			spawnx = random(0, width);
		}
		if(side === 3){
			spawny = height + 10;
			spawnx = random(0, width);
		}
		enemies.push({
			x: spawnx,
			y: spawny,
			word: round(random(-0.49, cards.length - 0.51))
		});
	}

	for(var i = 0;i < enemies.length;i++){
		enemies[i].x -= (enemies[i].x - x) / 100;
		enemies[i].y -= (enemies[i].y - y) / 100;

		fill(0, 0, 0, 50);
		rect(enemies[i].x - 5, enemies[i].y + 5, 20, 20);

		fill(0, 0, 0, 50);
		text(cards[enemies[i].word][0], enemies[i].x - 5, enemies[i].y - 15);

		fill(220, 50, 50);
		rect(enemies[i].x, enemies[i].y, 20, 20);
		fill(225, 100, 100);
		text(cards[enemies[i].word][0], enemies[i].x, enemies[i].y - 20);

		if(sqrt((enemies[i].x - x) * (enemies[i].x - x) + (enemies[i].y - y) * (enemies[i].y - y)) < 20){
			health -= 0.2;
		}
	}

	for(var i = 0;i < effects.length;i++){
		effects[i].drawer(effects[i]);
		if(effects[i].time > effects[i].lifetime){
			effects.splice(i, 1);
			i--;
		}
	}
}

function keyPressed(){
	if(!typing){
	    if (key == 'w' || key == 'W') {
	      up = true;
	    }
	    if (key == 's' || key == 'S') {
	      down = true;
	    }
	    if (key == 'a' || key == 'A') {
	      left = true;
	    }
	    if (key == 'd' || key == 'D') {
	      right = true;
	    }
	}

    if (keyCode === ENTER){
    	if(typing){
    		for(var i = 0;i < enemies.length;i++){
    			if(cards[enemies[i].word][1].toLowerCase() === input.toLowerCase()){
    				effects.push({
    					time: 0,
    					lifetime: 15,
    					x: enemies[i].x,
    					y: enemies[i].y,
    					vx: enemies[i].x - x,
    					vy: enemies[i].y - y,
    					randoms: [random(0, 2), random(0, 2), random(0, 2), random(0, 2)],
    					drawer: e => {
    						var len = sqrt(e.vx * e.vx + e.vy * e.vy);
    						e.time ++;
    						for(var i = 0;i < 3;i++){
	    						var rx = e.x + e.vx / len * e.time / e.lifetime * e.randoms[i] * 200;
	    						var ry = e.y + e.vy / len * e.time / e.lifetime * e.randoms[i+1] * 200;
	    						fill(220, 50, 50);
	    						rect(rx, ry, 20 * (1 - e.time / e.lifetime), 20 * (1 - e.time / e.lifetime));
    						}
    					}
    				});
    				enemies.splice(i, 1);
    				i--;
    			}
    		}
    		effects.push({
    			time: 0,
				lifetime: 5,
				drawer: e => {
					fill(255, 255, 255, 100 - 100 * e.time / e.lifetime);
					e.time++;
					rect(width/2, height/2, width, height);
				}
    		});
    	}
    	typing = !typing;
    	input = '';
	}
	if(typing){
		if(keyCode === BACKSPACE){
			input = input.slice(0, input.length - 1);
		}
		if(keyCode !== ENTER && keyCode !== BACKSPACE && keyCode !== SHIFT){
			input += key;
		}
	}
}
  
function keyReleased() {
	if (key == 'w' || key == 'W') {
      up = false;
    }
    if (key == 's' || key == 'S') {
      down = false;
    }
    if (key == 'a' || key == 'A') {
      left = false;
    }
    if (key == 'd' || key == 'D') {
      right = false;
    }
} 
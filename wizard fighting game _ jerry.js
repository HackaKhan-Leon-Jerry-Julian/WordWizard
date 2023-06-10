var x, y;
var wMove = false, aMove = false, sMove = false, dMove = false, typing = false;

const questions = ['sus', 'amogus', 'baka', 'leon'];
const answers = ['sussy', 'soos', 'cringe', 'wang'];

const enemyList = []; 
const enemyBoard = [];
  var rVal = 0; 
  var bVal = 255; 
  var gVal = 150
  
var textType = '';
var inp;



function setup(){
    createCanvas(500, 500);
    x = width/2;
    y = height/2;
  frameRate(30);
  
  
  inp = createInput('');
  inp.position(0, height);
  inp.size(width);
  
  // let inp = createInput('');
  // // inp.position(width, height);
  // // inp.size(100);
  // inp.input(myInputEvent);
  
  
  for (i = 0; i < questions.length; i++){
    enemyList.push({ques:questions[i], ans:answers[i]});
}

}

function draw(){
  print(frameCount);

	background(154, 32, 191);
	fill(rVal, bVal, gVal);
	rect(x-50, y-50, 100, 100);

  // console.log(textType);
  
  if (((frameRate/2) % 100) > 0){
    spawnEnemies(Math.round(frameRate/200));
  }
  
    
  if (typing){
      
  inp.position(0, height);
  inp.size(width);
  inp.input(myInputEvent);
    rVal = 255;
    bVal = 0;
    gVAl = 0;
    
  textSize(32);
  fill (0)
  text(textType, x-100, y + 100);
  }
   else{
     rVal = 0; 
  bVal = 255; 
  gVal = 150
  if (wMove)
    y-=10;
  if (aMove)
    x-=10;
  if (sMove)
    y+=10;
  if (dMove)
    x+=10;
    }

    for (j = 0; j < enemyBoard.length; j++){
      var theText = enemyBoard[j].enemyData.ques;
      if (j%2 == 0)
        fill(red);
      else 
        fill(blue)
      
      
      xDir = x - enemyBoard[j].enemyX;
      yDir = y - enemyBoard[j].enemyY;
      
      enemyBoard[j].enemyX += xDir/40;
      enemyBoard[j].enemyY += yDir/40;
      
      
      rect(enemyBoard[j].enemyX, enemyBoard[j].enemyY, 150, 150);
      print("enemy spawned at :", enemyBoard[j].enemyX, enemyBoard[j].enemyY, 150, 150)
    }

    
}

  
function myInputEvent() {
  
    textType = this.value();
}
  

function spawnEnemy(num){
  for (i = 0; i < num; i++){   
    if (random(0, 2) >= 1){
      
    enemyBoard.push({enemyData: enemyList[random(0, enemyList.length)], enemyX:width + 200, enemyY:height + 200});
    } else enemyBoard.push({enemyData: enemyList[random(0, enemyList.length)], enemyX:-200, enemyY:-200});
    
  }
}


function keyPressed(){
        
    if (key == 'w' || key == 'W') {

      wMove = true;

    }
    if (key == 's' || key == 'S') {

      sMove = true;

    }
    if (key == 'a' || key == 'A') {

      aMove = true;

    }
    if (key == 'd' || key == 'D') {

      dMove = true;

    }

      if (keyCode == TAB ) {

      typing = true;
      inp.remove();
      inp = createInput('');
        

    }
  if (keyCode == ENTER){
    
    typing = false;
    killEnemies(textType);
      inp.remove();
      inp = createInput('');
    
  }
    
}

function killEnemies(attack){
  for (i = 0; i < enemyBoard.length; i++)
    if (enemyBoard[i].enemyData.ans == attack){
      enemyBoard.remove(i);
      i--;
    }
}
  
  
function keyReleased() {

    if (key == 'w' || key == 'W') {

      wMove = false;

    }
    if (key == 's' || key == 'S') {

      sMove = false;

    }
    if (key == 'a' || key == 'A') {

      aMove = false;

    }
    if (key == 'd' || key == 'D') {

      dMove = false;

    }
    
  
  return false;
}

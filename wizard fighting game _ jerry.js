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
var playerHealth;



function setup(){
    createCanvas(1000, 1000);
    x = width/2;
    y = height/2;
  frameRate(30);
  playerHealth = 100;
  
  
  inp = createInput('');
  inp.position(0, height);
  inp.size(width);
  
  // let inp = createInput('');
  // // inp.position(width, height);
  // // inp.size(100);
  // inp.input(myInputEvent);
  
  
  for (i = 0; i < questions.length; i++){
    enemyList.push({ques: questions[i], ans:answers[i]});
    // print("pushed an enemy to the list:", enemyList[i].ques, enemyList[i].ans);
}

}

function draw(){
  if (playerHealth <= 0) {
    background(255, 0, 0);
    text("You died!!!!!", 500, 500)
    
  }else {
  
  // print(frameCount, second());

	background(154, 32, 191);
	fill(rVal, bVal, gVal);
	rect(x, y, 100, 100);
  fill(0, 255, 0);
    rect(0, height-20, playerHealth * 10, 20)

  // console.log(textType);  wang
  
  
  if (frameCount % 200 == 0){
    spawnEnemy(Math.floor(frameCount/2000) + 1);
    // print ("spawned", Math.ceil(frameCount/200), "enemies")
    // print (enemyBoard.length, "enemies on the board")
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
      var theText = enemyBoard[j].ques;
      if (j%2 == 0)
        fill(255, 0, 0);  
      else 
        fill(0, 0, 255)
      
      
      xDir = x - enemyBoard[j].enemyX;
      yDir = y - enemyBoard[j].enemyY;
      
      enemyBoard[j].enemyX += xDir/60;
      enemyBoard[j].enemyY += yDir/60;
      
      
      rect(enemyBoard[j].enemyX, enemyBoard[j].enemyY, 150, 150);
      fill(0, 0, 0)
      textSize(theText.length/10*-0.5  + 32);
      text(theText, enemyBoard[j].enemyX, enemyBoard[j].enemyY)
      
      if (doOverlap(enemyBoard[j].enemyX, enemyBoard[j].enemyX+150, enemyBoard[j].enemyY, enemyBoard[j].enemyY+150, x, x+100, y, y+100)){
        print ("overlaps")
        playerHealth-=0.1;
      }
      // print("enemy spawned at :", enemyBoard[j].enemyX, enemyBoard[j].enemyY, 150, 150)
    }
  }
    
}


   function doOverlap(pleft, pright, ptop, pbottom,  pcleft, pcright, pctop, pcbottom) {
 if(((pleft < pcright) && (pright > pcleft) && (pbottom > pctop) && (ptop < pcbottom)))
     {      
        return true; 
      }
     else return false
    }

  
function myInputEvent() {
  
    textType = this.value();
}
  

function spawnEnemy(num){
  for (i = 0; i < num; i++){   
    
      g  = Math.floor(random(0, enemyList.length)) ;
      
    enemyBoard.push({ques: enemyList[g].ques, ans:enemyList[g].ans, enemyX:width *(random(0, 4))  + 200, enemyY:height*(random(0, 4)) + 200});
    
    // print("enemy pushed")
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
    if (enemyBoard[i].ans == attack){
      enemyBoard.splice(i, 1);
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

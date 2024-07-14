const CHANGABLE = 0.2;

let firstPress = true;

let can,ctxGame;

let playX,playY, playVectorX,playVectorY;
let pTrain = [];

let enemX,enemY, enemVectorX,enemVectorY;
let eTrain = [];

let sizeTrain = 7;

function Draw()
{
  ctxGame.fillStyle = "rgb(20,20,215)";	//clear
  ctxGame.fillRect(0, 0, 256, 256);

  ctxGame.fillStyle = "rgb(255,255,255)"; //Player
  ctxGame.fillRect(playX*16+1, playY*16+1, 14, 14);
  
  let i;  
  for (i=0; i<pTrain.length; i++){
	ctxGame.fillStyle = "rgb(205,205,205)"; //Train of Player
	ctxGame.fillRect(pTrain[i].x*16+3, pTrain[i].y*16+3, 10, 10);
  }
  
  ctxGame.fillStyle = "rgb(255,255,0)"; //Enemy
  ctxGame.fillRect(enemX*16+1, enemY*16+1, 14, 14);
  
  for (i=0; i<eTrain.length; i++){
	ctxGame.fillStyle = "rgb(205,205,0)"; //Train of Enemy
	ctxGame.fillRect(eTrain[i].x*16+3, eTrain[i].y*16+3, 10, 10);
  }
 
}

function DrawEnd()
{
  ctxGame.fillStyle = "rgb(215,0,0)";
  ctxGame.fillRect(0, 0, 256, 256);
}

function DrawEndCondrat()
{
  ctxGame.fillStyle = "rgb(0,205,0)";
  ctxGame.fillRect(0, 0, 256, 256);
}

function testCollis(tX,tY,bEnem)
{
	let eBOOM = false;
	let notIX,notIY;
	if (bEnem){
		notIX = playX; notIY = playY;
	}
	else {
		notIX = enemX; notIY = enemY;
	}
  
	if (((tX == notIX) && (tY == notIY)) ||
		(tX < 0) || (tX > 15) ||
		(tY < 0) || (tY > 15)
	)
		eBOOM = true;
	
	for (i=0; i<eTrain.length; i++)
	{
		if ((tX == eTrain[i].x) && (tY == eTrain[i].y))
		eBOOM = true;
	}
	for (i=0; i<pTrain.length; i++)
	{
		if ((tX == pTrain[i].x) && (tY == pTrain[i].y))
		eBOOM = true;
	}
  
	return eBOOM;
}

function Loop()
{
	pTrain.push({x:playX,y:playY});
	if (pTrain.length >= sizeTrain)
		pTrain.shift();
	playX += playVectorX;
	playY += playVectorY;
  
  
	eTrain.push({x:enemX,y:enemY});
	if (eTrain.length >= sizeTrain)
		eTrain.shift();
	/////// calculate: enemVectorX,enemVectorY 
  
	let tmpBOOM = false;
	let bDir = false;
	let direction;
	
	if ((Math.random()<CHANGABLE) ||
	   testCollis(enemX+enemVectorX,enemY+enemVectorY,true))
	{
		if (Math.random()<0.5){
			if (enemVectorX!=0)
			{
				if (!(testCollis(enemX,enemY+1,true))){
					enemVectorX = 0;
					enemVectorY = 1;
				}
				else if (!(testCollis(enemX,enemY-1,true))){
					enemVectorX = 0;
					enemVectorY = -1;
				}
				else					
					enemVectorY = 0;
			} else {
				if (!(testCollis(enemX+1,enemY,true))){
					enemVectorX = 1;
					enemVectorY = 0;
				}
				else if (!(testCollis(enemX-1,enemY,true))){
					enemVectorX = -1;
					enemVectorY = 0;
				}
				else
					enemVectorX = 0;
			}
		} else {
			if (enemVectorX!=0)
			{
				if (!(testCollis(enemX,enemY-1,true))){
					enemVectorX = 0;
					enemVectorY = -1;
				}
				else if (!(testCollis(enemX,enemY+1,true))){
					enemVectorX = 0;
					enemVectorY = 1;
				}
				else					
					enemVectorY = 0;
			} else {
				if (!(testCollis(enemX-1,enemY,true))){
					enemVectorX = -1;
					enemVectorY = 0;
				}
				else if (!(testCollis(enemX+1,enemY,true))){
					enemVectorX = 1;
					enemVectorY = 0;
				}
				else
					enemVectorX = 0;
			}
		}
		
		
		
	}	
	
	
	
 ////////////////////////////////////// 
	enemX+=enemVectorX;
	enemY+=enemVectorY;
  
	Draw();
  
  //////////////////////////////////////
	let BOOM = false;
	let eBOOM = false;
  
	BOOM  = testCollis(playX,playY,false);
	eBOOM  = testCollis(enemX,enemY,true);

	if (eBOOM)
	{
		DrawEndCondrat();
	
		firstPress = true;
		document.getElementById('do_press').style.display='block';
		alert("Win!");
		startGame();
	} 
	else if (BOOM)
	{
		DrawEnd();
	
		firstPress = true;
		document.getElementById('do_press').style.display='block';
		alert("Game over");
		startGame();
	}
	else
		setTimeout(Loop, 200);
}

function incSizeTrain()
{
	sizeTrain++;
	setTimeout(incSizeTrain, 5000);
}
function startGame()		//prepare
{

  firstPress = false;
  document.getElementById('do_press').style.display='none';

  can = document.getElementById("can");
  ctxGame = can.getContext('2d');
  ctxGame.fillStyle = "rgb(20,20,215)";
  ctxGame.fillRect(0, 0, 256, 256);

  playX = 1;
  playY = 1;
  playVectorX = 1;
  playVectorY = 0;
  enemX = 8;
  enemY = 8;
  enemVectorX = -1;
  enemVectorY = 0;
  pTrain = [];
  eTrain = [];
  sizeTrain = 7;
  setTimeout(Loop, 200);
  setTimeout(incSizeTrain, 5000);
}


function dopress(e)
{
	
  if(firstPress){
    startGame();
  }


  switch(e.keyCode){
   case 37: 
     playVectorX = -1;
     playVectorY = 0;
     break;
   case 38:  
     playVectorX = 0;
     playVectorY = -1;
     break;
   case 39:   
     playVectorX = 1;
     playVectorY = 0;   
     break;
   case 40:   
     playVectorX = 0;
     playVectorY = 1;
     break;
   }

}




addEventListener("keydown", dopress);
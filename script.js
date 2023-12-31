document.addEventListener('DOMContentLoaded',all,false);
    
function all(){

  let lostGame=document.getElementById('lose_game');
  let restartBtn=document.getElementById('restart');
  let scoreView=document.getElementById('score_view');
  let endScore=document.getElementById('end_score');
 
  const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext('2d');

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

  let rectX=canvas.width / 2;
  let rectY=canvas.height / 2 ;
    let snake_array;


    let right='d';
    let left='a';
    let top='w';
    let bottom='s';
     let speed;
     let vectorX;
 
     if(canvas.width>1500){
      vectorX=11;
      speed=11; 
      snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6];
   }else if(canvas.width>1200 && canvas.width<1500){
     vectorX=9;    
    speed=9;
        snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6];
      }else if(canvas.width>900 && canvas.width<1200){
        vectorX=7;
        speed=7;
      snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6];

      }else if(canvas.width>600 && canvas.width<900){
        vectorX=4;
         speed=4;
        snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6,5,5,5,5];
      }else if(canvas.width<600){
       vectorX=3;
        speed=3;
     snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6,5,5,5,5,5];
    }
    let vectorY=0;
    let snakeWidth=canvas.width/37;
    let snakeHeight=canvas.height/32;
    let foodWidth=snakeWidth;
    let foodHeight=snakeHeight;

    let borderWidth=canvas.width-foodWidth;                 //borders for width and height limit of foodX and foodY
    let borderHeight=canvas.height-foodHeight;              

    let foodX=Math.random() * borderWidth;
    let foodY=Math.random() * borderHeight;
    let eatCount=0;

let swipeStartX = 0;
let swipeEndX = 0;
let swipeStartY = 0;
let swipeEndY = 0;
let allowed=false;
// Mobile devices (touchscreen devices);

window.addEventListener('touchstart', (e) => {
  swipeStartX = e.touches[0].clientX;
  swipeStartY = e.touches[0].clientY;
  allowed=true;
});

window.addEventListener('touchend', (e) => {
  swipeEndX = e.changedTouches[0].clientX;
  swipeEndY = e.changedTouches[0].clientY;
});


function deathParams(){
  lostGame.style.display='block';
  vectorX=0;
  vectorY=0;
  endScore.innerText='🎉 your score is: '+eatCount+' 🎉';
  eatCount=0;
  scoreView.innerText='0';
  canvas.style.boxShadow="0 0 7px 5px rgb(238, 5, 5)";
  canvas.style.border="2px solid red";

  if(canvas.width>1500){
    snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6];
 }else if(canvas.width>1200 && canvas.width<1500){
      snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6];
    }else if(canvas.width>900 && canvas.width<1200){
    snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6];

    }else if(canvas.width>600 && canvas.width<900){
    snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6,5,5,5,5];
  }else if(canvas.width<600){
    snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6,5,5,5,5,5];
  }

}



function tailDeath() {
  for (let i = 1; i < snake_array.length; i++) {
    if (snake_array[i].x === snake_array[0].x && snake_array[i].y === snake_array[0].y && lostGame.style.display==="none") {
    deathParams();
  }
  }
}




function calcSwipe() {
  let distanceX = swipeEndX - swipeStartX;
  let distanceY = swipeEndY - swipeStartY;

  if(allowed===true && lostGame.style.display==='none'){
    if (allowed === true && lostGame.style.display === 'none') {
      if (distanceX > 0 && distanceY > 0 && distanceX > distanceY && vectorX !== -speed) {
        vectorX = speed;
        vectorY = 0;
      }
    
      if (distanceX > 0 && distanceY > 0 && distanceY > distanceX && vectorY !== -speed) {
        vectorY = speed;
        vectorX = 0;
      }
    
      if (distanceX < 0 && distanceY > 0 && -distanceX > distanceY && vectorX !== speed) {
        vectorX = -speed;
        vectorY = 0;
      }
    
      if (distanceX > 0 && distanceY < 0 && distanceX > -distanceY && vectorX !== -speed) {
        vectorX = speed;
        vectorY = 0;
      }
    
      if (distanceX > 0 && distanceY < 0 && -distanceY > distanceX && vectorY !== speed) {
        vectorY = -speed;
        vectorX = 0;
      }
    
      if (distanceX < 0 && distanceY < 0 && -distanceX > -distanceY && vectorX !== speed) {
        vectorX = -speed;
        vectorY = 0;
      }
    
      if (distanceX < 0 && distanceY < 0 && -distanceY > -distanceX && vectorY !== speed) {
        vectorY = -speed;
        vectorX = 0;
      }
    
      if (distanceX < 0 && distanceY > 0 && -distanceX < distanceY && vectorY !== -speed) {
        vectorY = speed;
        vectorX = 0;
      }
    }
    



}
}

  function refresh(){
   
  if(canvas.width>1500){
    vectorX=11;
    speed=11; 
 }else if(canvas.width>1200 && canvas.width<1500){
   vectorX=9;    
  speed=9;
    }else if(canvas.width>900 && canvas.width<1200){
     speed=7;
     vectorX=7;
    }else if(canvas.width>600 && canvas.width<900){
      speed=4;
      vectorX=4;
    }else if(canvas.width<600){
   speed=3;
   vectorX=3;
  }
    vectorY=0;
    snake_array[0].x=rectX;
    snake_array[0].y=rectY;
    drawFood();
    canvas.style.border="3px solid black";
    canvas.style.boxShadow="none";
  }

    function snake(){
    for(let i=0;i<snake_array.length;i++){
        ctx.fillStyle = "green";
        ctx.fillRect(snake_array[i].x,snake_array[i].y,snakeWidth,snakeHeight);
    }
}


function checkEatCount(){
    if(eatCount % 5===0 && eatCount!==0){
        ctx.fillStyle='blue';
        foodWidth=snakeWidth+15;
        foodHeight=snakeHeight+13;
        }else{
        ctx.fillStyle='red';        
        foodWidth=snakeWidth;
        foodHeight=snakeHeight;
    }
}

function drawFood(){ 
    checkEatCount();
  ctx.fillRect(foodX,foodY,foodWidth,foodHeight);
}

function eatFood(){
 if(snake_array[0].y<foodY+foodHeight && snake_array[0].y+snakeHeight>foodY && snake_array[0].x + snakeWidth>foodX && snake_array[0].x<foodX+foodWidth){
    snake_array.push(Math.random());
    foodX=Math.random() * canvas.width;
    foodY=Math.random() * canvas.height;
    eatCount+=1;
   scoreView.innerText=eatCount;
   if(eatCount % 5===0){
    speed+=1;
   }

}
}

function moveSnake(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
    drawFood();
  let head={x: snake_array[0].x + vectorX , y: snake_array[0].y + vectorY}
  if(snake_array[0].x+snakeWidth>=canvas.width ||snake_array[0].x<=0 || snake_array[0].y<=0 || snake_array[0].y+snakeHeight>=canvas.height){   
  deathParams();
    }else{
    snake_array.unshift(head);
    snake_array.pop();
    snake();
    eatFood();
    calcSwipe();
    tailDeath();
}
requestAnimationFrame(moveSnake); 
}

moveSnake();


//computer devices (clickable)

window.addEventListener('keypress',(e)=>{

   allowed=false;

   if(allowed===false){

    if(lostGame.style.display='none'){
      
    if(e.key===bottom && vectorY!==-speed){
        vectorY=speed;
        vectorX=0;
      }else if(e.key===right && vectorX!==-speed){
        vectorX=speed;
        vectorY=0;
    }else if(e.key===left && vectorX!==speed){
        vectorX=-speed;
        vectorY=0;
    }else if(e.key===top && vectorY!==speed){
        vectorX=0;
        vectorY=-speed;
    }
    }
  }
});
 
restartBtn.addEventListener('click',()=>{
   lostGame.style.display='none';
   refresh();
});

window.addEventListener('keydown',()=>{
    if(lostGame.style.display==='block'){
        lostGame.style.display='none';
        refresh();
    }
 });
window.addEventListener('touchmove',(event)=>{
 event.preventDefault();
}, { passive: false })
}

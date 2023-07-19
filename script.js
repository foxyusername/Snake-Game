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
    let snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6,7,8,3,2,4,5,5,5,5];

    let right='d';
    let left='a';
    let top='w';
    let bottom='s';
    let vectorX=4;
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
    let speed=4;


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
    vectorX=3;
    vectorY=0;
    snake_array[0].x=rectX;
    snake_array[0].y=rectY;
    drawFood();
    speed=3;
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
        foodWidth=snakeWidth+10;
        foodHeight=snakeHeight+20;
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
     lostGame.style.display='block';
     vectorX=0;
     vectorY=0;
     snake_array=[{x:rectX,y:rectY},1,3,4,6,7,5,6,7,8,3,2,4,5,5,5,5];
     endScore.innerText='🎉 your score is: '+eatCount+' 🎉';
     eatCount=0;
     scoreView.innerText='0';
     speed=5;
     canvas.style.boxShadow="0 0 7px 5px rgb(238, 5, 5)";
     canvas.style.border="2px solid red";
    }else{
    snake_array.unshift(head);
    snake_array.pop();
    snake();
    eatFood();
    calcSwipe();
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

const speed=4
let lastrendertime=0
let snakebody=[{x:10,y:10}]
let food={x:5,y:6}
let inputdirection={x:0,y:0}
let score=0
// localStorage.setItem("hiscore","0")
const scorehtml=document.querySelector(".score")
const hiscorehtml=document.querySelector(".hiscore")
const board=document.querySelector(".board")
///// sounds
const backgroundmusic= new Audio("music/music.mp3")
backgroundmusic.volume=.4
const eat=new Audio("music/food.mp3")
const gameover=new Audio("music/gameover.mp3")
const turn=new Audio("music/move.mp3")
////

//main funtion
  function main(currenttime){
    window.requestAnimationFrame(main)
if ((currenttime-lastrendertime)/1000<1/speed) return
    lastrendertime=currenttime;

   
    gameengine()
}

function gameovergame(){
if(snakebody[0].x>=18||snakebody[0].x<=0 ||snakebody[0].y>=18||snakebody[0].y<=0)
{
    return true
}
for (let i = 1; i < snakebody.length; i++) {
    if (snakebody[0].x===snakebody[i].x&&snakebody[0].y===snakebody[i].y) {
     return true   
    }
}
}

function gameengine(){

if(gameovergame())
{
    gameover.play()
    backgroundmusic.pause()
    inputdirection={x:0,y:0}
    alert("game over to play press any key ")
 snakebody=[{x:10,y:10}]
        backgroundmusic.play()
        score=0
        // scorehtml.innerHTML="score :"+score
  
}

// if you eaten food 

if(snakebody[0].x===food.x&&snakebody[0].y===food.y)
{
    eat.play()
    score+=1
    if (score>hiscorevalue) {
        svalue=score;
        localStorage.setItem("hiscore",JSON.stringify(svalue))
        hiscorehtml.innerHTML=" high score :"+svalue
    }
    scorehtml.innerHTML="score :"+score
    let a=2;
    let b=16;
  const foodx=Math.round(a+(b-a)*Math.random())
  const foody=Math.round(a+(b-a)*Math.random())
    food.x=foodx
    food.y=foody
    console.log(food.x,food.y)
    snakebody.unshift({x: snakebody[0].x + inputdirection.x,y:snakebody[0].y + inputdirection.y})
}
for (let i = snakebody.length-2; i >=0; i--) {
 snakebody[i+1]={...snakebody[i]} 
}
snakebody[0].x+=inputdirection.x
snakebody[0].y+=inputdirection.y


    board.innerHTML=''
/// draw the snake
snakebody.forEach((element,index)=>{
    const snakeEl= document.createElement("div")
    snakeEl.style.gridRowStart=element.y
    snakeEl.style.gridColumnStart=element.x
    if (index==0) {
    snakeEl.classList.add("head")
}else{
    snakeEl.classList.add("snakebody")
}
board.appendChild(snakeEl)
})

// draw food
    const foodEl= document.createElement("div")
    foodEl.style.gridRowStart=food.y
    foodEl.style.gridColumnStart=food.x
    foodEl.classList.add("food")
board.appendChild(foodEl)
}








const hiscorevalue=localStorage.getItem("hiscore")
console.log(hiscorevalue)

 if (hiscorevalue===null) {
    svalue=0;
    localStorage.setItem("hiscore",JSON.stringify(svalue))
 }
 else{
    svalue=JSON.parse(hiscorevalue)
    // localStorage.setItem("hiscore",JSON.stringify(hiscorevalue))
    hiscorehtml.innerHTML="high score :"+hiscorevalue

 }
//////
  window.requestAnimationFrame(main)

  // main logic starts here
  window.addEventListener("keydown",(e)=>{
console.log(e.key)

switch (e.key) {
    case "ArrowUp":
        if(inputdirection.y!=0)return
        inputdirection.x=0
        inputdirection.y=-1
        turn.play()
        break;
        case "ArrowDown":
            if(inputdirection.y!=0)return
            inputdirection.x=0
            inputdirection.y=1
            turn.play()

        break;
        case "ArrowLeft":
            if(inputdirection.x!=0)return
            inputdirection.x=-1
            inputdirection.y=0
            turn.play()

        break;
        case "ArrowRight":
            if(inputdirection.x!=0)return
            inputdirection.x=1
            inputdirection.y=0
            turn.play()

        break;   
}
backgroundmusic.play()
  })

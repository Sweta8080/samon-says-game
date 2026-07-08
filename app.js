let gameseq = [];
let userseq = [];
let highScore = localStorage.getItem("highScore") || 0;
let btns = ["red","purple","green","yellow"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
       console.log("game started");
       started = true;

       levelup();
    }
}); 

function btnFlash(btn){
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);

}


function levelup(){
    //console.log (randcolor);
    //console.log("randBtn")
    userseq = [];
    level++;
    h2.innerText =`Level ${level}`;

    // random button choose

    let randIdx = Math.floor(Math.random()*btns.length);
    let randcolor = btns[randIdx];
    let randBtn = document.querySelector(`.${randcolor}`);
      
    gameseq.push(randcolor);
    console.log (randcolor);
    console.log(randBtn);
    //console.log(randIdx);
    //console.log(randBtn);
    //console.log(randcolor);
    //gameseq.push(randcolor);
    console.log(gameseq);
    btnFlash(randBtn);
}

function checkAnswer(idx){
    //console.log("current level:", level);

    
    if(userseq[idx] == gameseq[idx]){
       if (userseq.length == gameseq.length){
        setTimeout(levelup,1000);
       }
    } else {

        if(level > highScore){
            highScore = level;
            localStorage.setItem("highScore",highScore);
        }


         h2.innerHTML =`game over! Your score was <b>${level}</b> <br> 
         High Score: <b>${highScore}</b> <br>
         Press any key to restart`;
         document.querySelector("body").style.backgroundColor = "red";
         setTimeout(function(){
           document.querySelector("body").style.backgroundColor = "white";
         },200);
         reset();
    }
}

function btnpress(){
    let btn = this;
   userFlash(btn);
   
  let usercolor = btn.getAttribute("id");
  userseq.push(usercolor);
  checkAnswer(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for( let btn of allBtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
started = false;
level = 0;
gameseq = [];
userseq = [];
}
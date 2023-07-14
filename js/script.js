"use strict";


const boxElement = document.querySelector('.items');
const mainContainer = document.querySelector('.__container');
const stage = document.querySelector('.stage');
const firstPerson = document.querySelector('.bot');
const secondPerson = document.querySelector('.user');
const firstTurboEngine = document.querySelector('.bot span');
const secondTurboEngine = document.querySelector(".user span");
const persons = [firstPerson,secondPerson];

const maxWidth = document.documentElement.clientWidth;
//alert(maxWidth)


let botChoice = null;
function RandomChoice(){
    let num = 0;
    num = Math.floor(Math.random() * 3)
    if(num === 0){
        botChoice = "paper";
    }else if(num === 1){
        botChoice = "rock";

    }else {
        botChoice = "scissors";
    }

    return botChoice;
    
}

let  result = null;
let botWins = 0;
let userWins = 0;

let checkUserWins = 0;
let checkBotWins = 0;

// counter box

let counterBox = document.createElement('div');       
function CreateCounter(){
    
    counterBox.className = "counter-box";
    counterBox.innerHTML = ` 
    
    <p> ${result}  </p>

    <p> your wins : ${userWins} </p>

    <p> iron^_^Bot wins : ${botWins}  </p>
    
    
    `;
    return counterBox;
}
//------------- message about  win ---------------------


let winNotification = document.createElement('div');
function CreateWinNotification(){
    winNotification.className = "win-notification";
    winNotification.innerHTML = ` <p> ${result}  </p>`;
}

//--------------ShowAlertMessage----------------------------------
let alertMessage = document.createElement('div') ;
function ShowAlertMessage(){
    alertMessage.className= 'alert-message' ;
    alertMessage.innerHTML=" turn left your phone to correct work the app" ;
    document.body.prepend(alertMessage);
    
}
if(maxWidth <= 425){
    setTimeout(ShowAlertMessage, 1500);
    setTimeout(() => alertMessage.remove(), 7500);
}
//-------------------------------------------------

//  start event click
boxElement.addEventListener("click", function(e){
    let target = e.target;

    target.parentElement.classList.toggle("__active");                  
    let userChoice = null;                                              // TODO  animation (paper обгортає собою камінь, камінь падає на ножиці, ножиці ріжуть папір )
    RandomChoice();                                                         // turn on function that generate random num // todo circle blue without center part (Ну і нащо це нажав ?? =>кнопка з написом  клік-клак вискакує помилка => Окей, жми сюди)
    if (target.closest('.paper')){
        userChoice = 'paper';
    }else if(target.closest('.rock')){                                       
        userChoice = 'rock';
    }else if(target.closest('.scissors')){
        userChoice = 'scissors';
    }
    
    firstPerson.classList.add(botChoice);
    secondPerson.classList.add(userChoice);

    // Addscill
    function AddScill(scill){ 

        let botCoordinates = firstPerson.getBoundingClientRect();
        let userCoordinates = secondPerson.getBoundingClientRect();
        let botLeft = botCoordinates.left + botCoordinates.width;
        let userLeft = userCoordinates.left;
        //console.log(botLeft)
        if(botLeft >= userLeft){
            if(checkBotWins ===1){
                secondPerson.classList.add(`${scill}reaction`);
                firstPerson.classList.add(`${scill}attack`);
            }else{
                secondPerson.classList.add(`${scill}attack`);
                firstPerson.classList.add(`${scill}reaction`);
            }
        }
        
    }
    //-----------------------------------------------------------
    function checkWin(){
        if(checkUserWins === 1){
            let timer  = setInterval(() =>{
                AddScill(userChoice);
                setTimeout(()=>{
                    clearInterval(timer);
                    firstPerson.classList.remove(`${userChoice}reaction`);
                    secondPerson.classList.remove(`${userChoice}attack`);
                }, 7000);
            },100);
        }else if(checkBotWins === 1){
            let timer  = setInterval(() =>{
                AddScill(botChoice);
                setTimeout(()=>{
                    clearInterval(timer);
                    firstPerson.classList.remove(`${botChoice}attack`);
                    secondPerson.classList.remove(`${botChoice}reaction`);
                }, 7000);
            },100);
        }else{
            let timer  = setInterval(() =>{
                AddScill('zero');
                setTimeout(()=>{
                    clearInterval(timer);
                    firstPerson.classList.remove(`zeroreaction`);
                    secondPerson.classList.remove(`zeroattack`);
                }, 7000);
            },100);
        }
    }
    function ShowResult(){
        target.parentElement.classList.remove("__active"); 
        if(userChoice ==='paper'){
            switch(botChoice){
                case 'rock' : 
                    result = "  You  wiiin this game!!!";
                    checkUserWins = 1;
                    userWins++;
                    break;
    
                case 'paper' : 
                    result = " It isss  draaaw )";
                    break;
    
                case 'scissors' :
                    result = " You lost this game :-(";
                    checkBotWins =1;
                    botWins++;
                    break;
    
            }
        }else if (userChoice ==='rock'){
            switch(botChoice){
                case 'rock' : 
                    result = " It isss  draaaw )";
                    break;
    
                case 'paper' : 
                    result = " Bot win you ";
                    checkBotWins =1;
                    botWins++;
                    break;
    
                case 'scissors' : 
                    result = " \\ You wiin this game //";
                    checkUserWins =1;
                    userWins++;
                    break;
    
            }
        }else if (userChoice ==='scissors'){
            switch(botChoice){
                case 'rock' : 
                    result = "  Bot win you )";
                    checkBotWins =1;
                    botWins++;
    
                    break;
    
                case 'paper' : 
                    result = " You win bot ,but It`s not EEnd !";
                    checkUserWins = 1;
                    userWins++;
                    break;
    
                case 'scissors' : 
                    result = " It isss  draaaw )";
                    break;
    
            }
        }


        /*
        let alertBox = document.createElement('div');
        alertBox.className = "alert-box";
        alertBox.innerHTML = ` ${result} ` ;
        
        */
        //console.log(CreateEl());


        //setInterval(ShowCoordinate,100)
        checkWin();
        CreateCounter();
        mainContainer.classList.add('__active');
        stage.classList.add('__active');
        firstPerson.classList.add('__active')
        firstPerson.addEventListener('animationstart',function(e){
            if(e.animationName === 'botmove'){
                firstTurboEngine.classList.add('__active');
            }
        });
        secondPerson.addEventListener('animationstart',function(e){
            if(e.animationName === 'usermove'){
                secondTurboEngine.classList.add('__active');
            }
        });
        secondPerson.classList.add('__active')
        boxElement.after(counterBox);
        setTimeout(()=>{
            CreateWinNotification();
            winNotification.classList.add("__active");
            stage.prepend(winNotification)
        },4400)
        stage.prepend(winNotification);


    }
    setTimeout(ShowResult, 1500);
    setTimeout(function(){
        mainContainer.classList.remove('__active');
        stage.classList.remove("__active");
        counterBox.classList.add("__active");
        persons.forEach((element) => {
            element.classList.remove('__active');
            element.classList.remove('rock');
            element.classList.remove('paper');
            element.classList.remove('scissors');
        });
        winNotification.classList.remove('__active');
        firstTurboEngine.classList.remove('__active');
        secondTurboEngine.classList.remove('__active');
        checkUserWins = 0;
        checkBotWins = 0;

    },8500)
    
});


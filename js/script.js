"use strict";


const boxElement = document.querySelector('.items');
const mainContainer = document.querySelector('.__container');
const stage = document.querySelector('.stage')
const firstPerson = document.querySelector('.bot')
const secondPerson = document.querySelector('.user')
const firstTurboEngine = document.querySelector('.bot span')

                                                                                  // todo make alert-message with  text : turn left your phone to correct work app
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

function CreatePersons(){
    const botPerson =  document.createElement('div');

}

// ------------  ---------------------------
function ShowCoordinate(){
    let botCoordinates = firstPerson.getBoundingClientRect();
    let userCoordinates = secondPerson.getBoundingClientRect();
    let botLeft = botCoordinates.left + botCoordinates.width;
    let userLeft = userCoordinates.left;
    if(botLeft >= userLeft){
        secondPerson.classList.add("__active");
    }
   
}









//  start event click
boxElement.addEventListener("click", function(e){
    let target = e.target;

    target.parentElement.classList.toggle("__active");                  
    let userChoice = null;                                              // TODO make animation with timeout(задержкой) to show fight on stage, show letters   'Vs'  ,fight animation (paper обгортає собою камінь, камінь падає на ножиці, ножиці ріжуть папір )
    RandomChoice();                                                         // turn on function that generate random num // todo circle blue without center part (Ну і нащо це нажав ?? =>кнопка з написом  клік-клак вискакує помилка => Окей, жми сюди)
    if (target.closest('.paper')){
        userChoice = 'paper';
    }else if(target.closest('.rock')){                                       // todo think about change color of icons svg
        userChoice = 'rock';
    }else if(target.closest('.scissors')){
        userChoice = 'scissors';
    }
    
    firstPerson.classList.add(botChoice);
    secondPerson.classList.add(userChoice);
    function ShowResult(){
        target.parentElement.classList.remove("__active"); 
        if(userChoice ==='paper'){
            switch(botChoice){
                case 'rock' : 
                    result = "  You  wiiin this game!!!";
                    userWins++;
                    break;
    
                case 'paper' : 
                    result = " It isss  draaaw )";
                    break;
    
                case 'scissors' :
                    result = " You lost this game :-(";
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
                    botWins++;
                    break;
    
                case 'scissors' : 
                    result = " \\ You wiin this game //";
                    userWins++;
                    break;
    
            }
        }else if (userChoice ==='scissors'){
            switch(botChoice){
                case 'rock' : 
                    result = "  Bot win you )";
                    botWins++;
    
                    break;
    
                case 'paper' : 
                    result = " You win bot ,but It`s not EEnd !";
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
        CreateCounter()
        mainContainer.classList.add('__active')
        stage.classList.add('__active');
        firstPerson.classList.add('__active')
        firstPerson.addEventListener('animationstart',function(e){
            if(e.animationName === 'attack'){
                firstTurboEngine.classList.add('__active');
            }
        })
        mainContainer.after(counterBox);


    }
    setTimeout(ShowResult, 1500);

    
    
    




});



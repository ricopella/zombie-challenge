const inquirer = require('inquirer');
const colors = require('colors');
var gameCounter = 0;

let gameData = {
    zombie: {
        health: 0,
        damage: 0
    },
    user: {
        health: 0,
        damage: 0
    }
}

// generates random numbers & stores them in gameData object
function getRandomNums() {
    gameData.zombie.health = parseInt(Math.random() * (100 - 50) + 50);
    gameData.user.health = parseInt(Math.random() * (100 - 50) + 50);
} // end getRandomNums

// checkResults
function checkResults() {
    if (gameData.zombie.health <= 0) {
        console.log('################################\n'.yellow);
        console.log('YOU WON!');
        console.log('\n################################'.yellow);
        process.exit();
    } else if (gameData.user.health <= 0) {
        console.log('################################\n'.red);
        console.log('you lost dude...');
        console.log('\n################################'.red);
        process.exit();
    } else {
        eachRound();
    }
}

function eachRound() {
    // randomize new health for new game only
    if (gameCounter === 0) {
        getRandomNums()
        gameCounter = gameCounter + 1;
    }

    inquirer.prompt([{
        type: "list",
        message: "Try to stay alive! Guess a number between [1-5]",
        choices: ["1", "2", "3", "4", "5"],
        name: "userGuess",
    }]).then(function(answers) {

        // generate random numbers each turn for zombie damage & user damage, convert to string
        gameData.zombie.damage = parseInt(Math.floor(Math.random() * 5) + 1).toString();
        gameData.user.damage = parseInt(Math.floor(Math.random() * 5) + 1).toString();

        // if userGuess === zombie guess 
        if (answers.userGuess === gameData.zombie.damage) {
            // decrease zombie health by user.damage
            gameData.zombie.damage -= gameData.user.damage;
            console.log('\n-----------------------------------------------------\n'.black);
            console.log(`\nHIT! You hit the zombie with ${gameData.user.damage} damage.
Your health is ${gameData.user.health} and Zombie health is ${gameData.zombie.health}\n`);
            console.log('\n-----------------------------------------------------\n'.black);

            // check health/round
            checkResults();
            // else if userGuess != zombie guess
        } else {
            // decrease user health by zombie.damage
            gameData.user.health -= gameData.zombie.damage;
            console.log('\n-----------------------------------------------------\n'.black);
            console.log(`\nMISS! The Zombie Slashed you ${gameData.zombie.damage} damage. 
Your health is ${gameData.user.health} and the Zombie health is ${gameData.zombie.health}\n`);
            console.log('\n-----------------------------------------------------\n'.black);

            // check health/round
            checkResults();
        }
    });

} // end startGame

// start game on load
eachRound();
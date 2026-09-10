//TODO : Come up with a logic of function to return a random value between 2 integers

const prompt = require("prompt-sync")();
let humanScore = 0,computerScore = 0

const getComputerChoice = () => {
    let numChoice = Math.floor(Math.random() * 3)

    if (numChoice === 0) {
        return "rock"
    }
    else if (numChoice === 1) {
        return "paper"
    }
    else {
        return "scissor"
    }

}

const getHumanChoice = () => {
    return prompt("Enter your choice (Rock,Paper,Scissor) : ")
}

const playRound = (humanChoice="",computerChoice="") => {
    humanChoice = humanChoice.toLowerCase()
    console.log(`Computer chose ${computerChoice.toUpperCase()} !`)

    let humanWin = ((humanChoice === "rock" && computerChoice === "scissor") || (humanChoice === "paper" && computerChoice === "rock") || (humanChoice === "scissor" && computerChoice === "paper")) ? true : false
    let computerWin = ((humanChoice === "rock" && computerChoice === "paper") || (humanChoice === "scissor" && computerChoice === "rock") || (humanChoice === "paper" && computerChoice === "scissor")) ? true : false

    if (humanWin) {
        console.log("You win !")
        humanScore++
    }
    else if (computerWin) {
        console.log("Computer wins !")
        computerScore++
    }
    else {
        console.log("It is a draw !")
    }

}

const playGame = () => {
    let i = 0
    while (i < 5) {
        playRound(getHumanChoice(),getComputerChoice())
        i++
    }
    console.log(`FINAL SCORE => You : ${humanScore} points , Computer : ${computerScore} points !`)
    
}

playGame()
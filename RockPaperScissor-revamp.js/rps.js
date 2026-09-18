let humanScore = 0,computerScore = 0
let roundsPlayed = 0
let rockButton = document.querySelector("#rock")
let paperButton = document.querySelector("#paper")
let scissorButton = document.querySelector("#scissor")
let rpsButtonsContainer = document.querySelector("#buttons")
let yourScoreText = document.querySelector("#your_score_text")
let computerScoreText = document.querySelector("#comp_score_text")

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


const playRound = (humanChoice="",computerChoice="") => {
    humanChoice = humanChoice.toLowerCase()
    alert(`Computer chose ${computerChoice.toUpperCase()} !`)

    let humanWin = ((humanChoice === "rock" && computerChoice === "scissor") || (humanChoice === "paper" && computerChoice === "rock") || (humanChoice === "scissor" && computerChoice === "paper")) ? true : false
    let computerWin = ((humanChoice === "rock" && computerChoice === "paper") || (humanChoice === "scissor" && computerChoice === "rock") || (humanChoice === "paper" && computerChoice === "scissor")) ? true : false

    if (humanWin) {
        alert("You win !")
        humanScore++
    }
    else if (computerWin) {
        alert("Computer wins !")
        computerScore++
    }
    else {
        alert("It is a draw !")
    }


    yourScoreText.textContent = `Your Score : ${humanScore}`
    computerScoreText.textContent = `Computer Score : ${computerScore}`

    roundsPlayed++

    if (roundsPlayed >= 5) {
        alert(`FINAL SCORE => You : ${humanScore} points , Computer : ${computerScore} points !`);
        return;
    }
}

rpsButtonsContainer.addEventListener('click',(e) => {

    if (roundsPlayed >= 5) {
        return;
    }

    if (e.target.tagName !== 'BUTTON') {
        return;
    }

    let humanChoice = e.target.id
    let computerChoice = getComputerChoice()

    playRound(humanChoice,computerChoice)
})
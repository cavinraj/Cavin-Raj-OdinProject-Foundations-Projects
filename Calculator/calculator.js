//import calculator engine
import {Calculator} from './calc-blueprint.js'

// variables for all HTML nodes
let calculatorScreen = document.querySelector('#calculator-screen')
let backButton = document.querySelector('#back-button')
let clearButton = document.querySelector('#clear-button')
let oneButton = document.querySelector('#button-1')
let twoButton = document.querySelector('#button-2')
let threeButton = document.querySelector('#button-3')
let addButton = document.querySelector('#add-button')
let subtractButton = document.querySelector('#subtract-button')
let fourButton = document.querySelector('#button-4')
let fiveButton = document.querySelector('#button-5')
let sixButton = document.querySelector('#button-6')
let multiplyButton = document.querySelector('#mult-button')
let divideButton = document.querySelector('#div-button')
let sevenButton = document.querySelector('#button-7')
let eightButton = document.querySelector('#button-8')
let nineButton = document.querySelector('#button-9')
let expButton = document.querySelector('#exp-button')
let openParenthesesButton = document.querySelector('#open-parentheses-button')
let closeParenthesesButton = document.querySelector('#close-parentheses-button')
let zeroButton = document.querySelector('#button-0')
let equalButton = document.querySelector('#equal-button')
let calculatorButtons = document.querySelectorAll('.calculator-button')
let operatorButtons = document.querySelectorAll('.operator-button')

// Postfix evaluation variables
let postfixOutput = []
let operatorStack = []

const operatorPriority = {
    '+':1,
    '-':1,
    'x':2,
    '÷':2,
    '(':0
}

calculatorButtons.forEach(button => {
    button.addEventListener('click',(e) => {

        calculatorScreen.textContent += button.textContent

    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click',(e) => {

        calculatorScreen.textContent += button.textContent

    })
})

clearButton.addEventListener('click',(e) => {
    calculatorScreen.textContent = ''
})

backButton.addEventListener('click',(e) => {
    calculatorScreen.textContent = calculatorScreen.textContent.substring(0,calculatorScreen.textContent.length - 1)
})

equalButton.addEventListener('click',(e) => {

    postfixOutput = []
    operatorStack = []

    const calcEquation = calculatorScreen.textContent
    postfix(calcEquation)

    calculatorScreen.textContent = calculate()
})

function calculate() {
    let result = 0
    let resultStack = []

    for (let i = 0;i < postfixOutput.length;i++) {
        if (typeof postfixOutput[i] === 'number') {
            resultStack.push(postfixOutput[i])
        }
        else {
            let operandTwo = resultStack.pop()
            let operandOne = resultStack.pop()
            resultStack.push(Calculator.operate(postfixOutput[i],operandOne,operandTwo))
        }
    }

    return resultStack[0]
}

function postfix(infixString = '') {
    let currentNum = '' // Move this OUTSIDE the loop so it survives each iteration

    for (let i = 0;i < infixString.length;i++) {

        let currentChar = infixString.charAt(i)

        // Check if the character is a number OR a decimal point
        if (!Number.isNaN(parseFloat(currentChar)) || currentChar === '.') {
            currentNum +=  currentChar
        }
        // Check if currentChar is open bracket
        else if (currentChar === '(') {
            operatorStack.push(currentChar)
        }
        // Check if currentChar is closing bracket
        else if (currentChar === ')') {

            // if we hit closing bracket,before popping operator we must move the current number into output
            if (currentNum !== '') {
                postfixOutput.push(parseFloat(currentNum))
                currentNum = ''
            }
            let topOfStack = operatorStack.pop()
            while (topOfStack !== '(') {
                postfixOutput.push(topOfStack)
                topOfStack = operatorStack.pop()
            }
        }
        else {
            // We hit an operator.
            // First, push the completed number to the output (if it's not empty)
            if (currentNum !== '') {
                
                postfixOutput.push(parseFloat(currentNum))
                currentNum = '' // Reset the number string accumulator for next number
            }
            
            // 1. Peek at the top of the stack without removing it
            let topOfStack = operatorStack[operatorStack.length - 1]

            // 2. The Loop: While the stack is NOT empty, AND the top item has a >= priority...
            while (operatorStack.length > 0 && operatorPriority[currentChar] <= operatorPriority[topOfStack]) {

                // Kick the stronger operator out of the stack and into the output
                postfixOutput.push(operatorStack.pop())

                // Update our "peek" variable for the next round of the loop
                topOfStack = operatorStack[operatorStack.length - 1]
            }
            operatorStack.push(currentChar)
        }
    }

    // When the loop finishes entirely, check if there is one last number waiting in the accumulator
    if (currentNum !== '') {
        postfixOutput.push(parseFloat(currentNum));
    }

    // Move all the remaining operators inside postfixOutput 
    while (operatorStack.length > 0) {
        postfixOutput.push(operatorStack.pop())
    }

}
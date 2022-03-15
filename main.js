// important functionality variables //
let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('delBtn')
const decimalButton = document.getElementById('decimalBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currOperationScreen')

//Click Event Listeners //
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
decimalButton.addEventListener('click', appendDecimal)

numberButtons.forEach((button) => 
     button.addEventListener('click', () => appendNumber(button.textContent))
    )

operatorButtons.forEach((button) => 
    button.addEventListener('click', () => setOperation(button.textContent)))

//functions for buttons//
function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
}

function clear() {
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent
        .toString()
        .slice(0,-1)
}

function appendDecimal() {
    if (shouldResetScreen) resetScreen()
    if (currentOperationScreen.textContent === '')
        currentOperationScreen.textContent = '0'
    if(currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'
}

function appendNumber (number) {
    if(currentOperationScreen.textContent === '0' || shouldResetScreen)
        resetScreen()
    currentOperationScreen.textContent += number
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '÷' && currentOperationScreen.textContent ==='0') {
        alert("Unable to divide by zero in this dimension. Try changing dimensions, skin bag")
        return
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function roundResult(number) {
    return Math.round(number *1000) / 1000
}

//mathmatical functions for operations //

function add(a, b) {
    return a + b
}
function subtract(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
        case '×':
            return multiply(a, b)
        default:
            return null
    }
}
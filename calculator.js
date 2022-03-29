// acts as the calculator's memory, at most 3 index long
let operations = [] 
// allows display to refresh after an operator is pressed
let operatorPressed = false 
const display = document.querySelector('.display');

initializeButtons();

function updateDisplay(operation, e=undefined, result="" ) {
    console.log(operatorPressed)
    if (operatorPressed) display.textContent = '';
    if (!operation && display.textContent.length <= 15) {
        display.textContent = display.textContent + e.target.textContent;
    }
    else if (operation){
        display.textContent = result;
    }
}

function operate() {
    let result = 0;
    let operand1 = 0;
    let operand2 = 0;
    let operator = "";
    
    if (isNaN(parseFloat(operations[1]))) {
        operand2 = parseFloat(operations.pop());
        operator = operations.pop();
        operand1 = parseFloat(operations.pop());
    } else {
        operand2 = parseFloat(operations.pop());
        operand1 = parseFloat(operations.pop());
        operator = operations.pop();
    }
    
    if (operator == "+") {
        result = add(operand1, operand2);
    } else if (operator == "-") {
        result = subtract(operand1, operand2);
    } else if (operator == "/") {
        result = divide(operand1, operand2);
    } else {
        result = multiply(operand1, operand2);
    }
    let roundedResult = roundResult(result);
    updateDisplay(true, undefined, roundedResult);
}

function roundResult(number) {
    if (number.toString().length > 14) {
        return number.toFixed(14);
    }
    return number
}

function add(operand1, operand2) {
    return operand1 + operand2
} 

function subtract(operand1, operand2) {
    return operand1 - operand2
}

function divide (operand1, operand2) {
    return operand1 / operand2
}

function multiply(operand1, operand2) {
    return operand1 * operand2
}

function equalsButtonActions() {
    if (!(display.textContent == "" || display.textContent == ".")){
        operations.push(display.textContent);
        operatorPressed = true;
        operate();
    }
}

function numberButtonActions(e) {
    updateDisplay(false, e);
    operatorPressed = false;
}

function dotButtonAction(e) {
    if (!(display.textContent.includes("."))) {
        updateDisplay(false, e);
    }
}

function operationButtonActions(e) {
    if(!(display.textContent == "" || display.textContent == ".")) {
        operatorPressed = true;
        operations.push(display.textContent); // push in the number  
        if (operations.length == 3) operate();
        operations.push(e.target.textContent); // push in the operator
        if (isNaN(operations[0])) operations.push(display.textContent);
    }
}

function initializeButtons() {
    const equalsButton = document.querySelector('.equals-button');
    equalsButton.addEventListener("click", equalsButtonActions);

    const numberButtons = document.querySelectorAll('.number-button');
    numberButtons.forEach(button => button.addEventListener("click", numberButtonActions));

    const dot = document.querySelector('.dot');
    dot.addEventListener("click", dotButtonAction);

    const operationButtons = document.querySelectorAll('.operation-button');
    operationButtons.forEach(button => button.addEventListener("click", operationButtonActions));

    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener("click", clear);
}

function clear() {
    display.textContent = "";
    operations.length = 0; // clear number and operators in "memory"
}
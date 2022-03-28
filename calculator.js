let operations = [] // acts as the calculator's memory, at most  index long
let operatorPressed = false
const display = document.querySelector('.display');

initializeButtons();

function updateDisplay(operation, e=undefined, result="" ) {
    if (operatorPressed) {
        display.textContent = '';
    }
    console.log(result);
    if (!operation) {
        display.textContent = display.textContent + e.target.textContent;
    }
    else {
        display.textContent = result
    }
}

function operate() {
    //operations.push(parseFloat(display.textContent));

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
    operatorPressed = false;
    updateDisplay(true, undefined, result);
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
    operations.push(display.textContent);
    operate()
}

function initializeButtons() {
    const equalsButton = document.querySelector('.equals-button');
    equalsButton.addEventListener("click", equalsButtonActions)

    const numberButtons = document.querySelectorAll('.number-button');
    numberButtons.forEach(button => {
        console.log(button)
        button.addEventListener("click", (e) => updateDisplay(false, e))
    });

    const operationButtons = document.querySelectorAll('.operation-button');
    operationButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        operatorPressed = true;
        operations.push(display.textContent); // push in the number  
        if (operations.length == 3) operate();
        operations.push(e.target.textContent); // push in the operator
        if (isNaN(operations[0])) operations.push(display.textContent);
    })
    });

    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener("click", clear)
}

function clear() {
    display.textContent = "";
    operations.length = 0; // clear number and operators in "memory"
}
initializeButtons()

let operations = [] // acts as the calculator's memory, at most 3 index long

function updateDisplay(operation, e=undefined, result="" ) {
    display = document.querySelector('.display');
    if (!operation) {
        display.textContent = display.textContent + e.target.textContent;
    }
    else {
        display.textContent = result
    }
}
    
function operate() {
    const display = document.querySelector('.display');
    operations.push(parseFloat(display.textContent));
    let result = 0;

    let operand1 = 0;
    let operand2 = 0;
    let operator = "";

    if (parseFloat(operations[1].isNaN())) {
        operand2 = parseFloat(operations.pop());
        operator = operations.pop();
        operand1 = parseFloat(operations.pop());
    } else {
        operator = operations.pop();
        operand2 = parseFloat(operations.pop());
        operand1 = parseFloat(operations.pop());
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

    updateDisplay(true, undefined, result)
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

function initializeButtons() {
    const equalsButton = document.querySelector('.equals-button');
    equalsButton.addEventListener("click", operate)

    const numberButtons = document.querySelectorAll('.number-button');
    numberButtons.forEach(button => {
        console.log(button)
        button.addEventListener("click", (e) => updateDisplay(false, e))
    });

    const operationButtons = document.querySelectorAll('.operation-button');
    operationButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        display = document.querySelector('.display');
        operations.push(display.textContent); // push in the number
        if (operations.length == 3) operate();
        operations.push(e.target.textContent); // push in the operator
    })
    });

    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener("click", clear)
}

function clear() {
    const display = document.querySelector(".display");
    display.textContent = "";
    operations.length = 0; // clear number and operators in "memory"
}
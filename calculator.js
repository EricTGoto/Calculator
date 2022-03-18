let operations = []

const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(button => {
    console.log(button)
    button.addEventListener("click", (e) => updateDisplay(false, e))
});

const operationButtons = document.querySelectorAll('.operation-button');
operationButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        display = document.querySelector('.display');
        operations.push(display.textContent)
        operations.push(e.target.textContent)
        display.textContent = ""
    })
});

const equalsButton = document.querySelector('.equals-button');
equalsButton.addEventListener("click", operate)


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
    const operand2 = parseFloat(display.textContent);
    let result = 0

    const operator = operations.pop();
    const operand1 = parseFloat(operations.pop());

    if (operator == "+") {
        result = operand1 + operand2;
    } else if (operator == "-") {
        result = operand1 - operand2;
    } else if (operator == "/") {
        result = operand1 / operand2;
    } else {
        result = operand1 * operand2;
    }
    operations.push(result);
    updateDisplay(true, undefined, result)
}
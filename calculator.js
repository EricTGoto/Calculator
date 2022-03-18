numberButtons = document.querySelectorAll('.number-buttons');
numberButtons.forEach(button => {
    button.addEventListener("click", (e) => addNumberToDisplay(e))
    console.log(button)
});

function addNumberToDisplay(e) {
    display = document.querySelector('.display');
    display.textContent = display.textContent + e.target.textContent;
}
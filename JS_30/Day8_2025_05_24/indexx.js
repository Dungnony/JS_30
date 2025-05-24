const buttons = document.querySelectorAll("button");
const display = document.querySelector('.display');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const val = button.textContent;
        if (val === 'C') {
            display.textContent = "";
        } else if (val === '=') {
            try {
                display.textContent = eval(display.textContent.replace(/x/g, '*'));
            } catch {
                display.textContent = "Error";
            }
        } else {
            display.textContent += val;
        }
    });
});
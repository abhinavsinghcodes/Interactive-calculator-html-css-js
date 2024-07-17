let display = document.querySelector('.display');
let currentInput = '';
let operator = '';
let firstOperand = null;

const updateDisplay = (value) => {
    display.textContent = value;
};

const clearAll = () => {
    currentInput = '';
    operator = '';
    firstOperand = null;
    updateDisplay('0');
};

const deleteLast = () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
};

const calculate = (first, second, operator) => {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '×':
            return first * second;
        case '÷':
            return first / second;
        case '%':
            return first % second;
        default:
            return second;
    }
};

document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (!isNaN(buttonText) || buttonText === '.') {
            currentInput += buttonText;
            updateDisplay(currentInput);
        } else if (buttonText === 'AC') {
            clearAll();
        } else if (buttonText === 'C') {
            deleteLast();
        } else if (buttonText === '=') {
            if (firstOperand !== null && currentInput !== '') {
                const result = calculate(firstOperand, parseFloat(currentInput), operator);
                updateDisplay(result);
                currentInput = result.toString();
                operator = '';
                firstOperand = null;
            }
        } else {
            if (currentInput !== '') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (operator) {
                    const result = calculate(firstOperand, parseFloat(currentInput), operator);
                    updateDisplay(result);
                    firstOperand = result;
                }
            }
            operator = buttonText;
            currentInput = '';
        }
    });
});

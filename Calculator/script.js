const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let operator = '';
let firstOperand = '';
let secondOperand = '';
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            clearCalculator();
        } else if (value === '=') {
            calculateResult();
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

function appendNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (op === '√') {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateDisplay();
        return;
    } else if (op === '%') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
        return;
    }

    if (operator && shouldResetDisplay) {
        operator = op;
        return;
    }

    if (!firstOperand) {
        firstOperand = currentInput;
    } else if (!shouldResetDisplay) {
        secondOperand = currentInput;
        calculateResult();
    }

    operator = op;
    shouldResetDisplay = true;
}

function calculateResult() {
    if (!operator || shouldResetDisplay) return;

    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(currentInput);

    switch (operator) {
        case '+':
            currentInput = (firstOperand + secondOperand).toString();
            break;
        case '-':
            currentInput = (firstOperand - secondOperand).toString();
            break;
        case '*':
            currentInput = (firstOperand * secondOperand).toString();
            break;
        case '/':
            if (secondOperand === 0) {
                alert("Can't divide by zero");
                clearCalculator();
                return;
            }
            currentInput = (firstOperand / secondOperand).toString();
            break;
        default:
            return;
    }

    updateDisplay();
    operator = '';
    firstOperand = currentInput;
    shouldResetDisplay = true;
}

function clearCalculator() {
    currentInput = '0';
    operator = '';
    firstOperand = '';
    secondOperand = '';
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput;
}

document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;
    let shouldResetDisplay = false;

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            const key = this.getAttribute('data-key');

            if (key === 'C') {
                resetCalculator();
            } else if (key === '=') {
                if (operator && previousInput !== null) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    operator = null;
                    previousInput = null;
                    shouldResetDisplay = true;
                }
            } else if (['+', '-', '*', '/'].includes(key)) {
                if (operator && previousInput !== null && !shouldResetDisplay) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                }
                operator = key;
                previousInput = currentInput;
                shouldResetDisplay = true;
            } else {
                if (shouldResetDisplay) {
                    currentInput = key;
                    shouldResetDisplay = false;
                } else {
                    currentInput = currentInput === '0' ? key : currentInput + key;
                }
                display.textContent = currentInput;
            }
        });
    });

    function calculate(a, b, operator) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return (num1 / num2).toString();
            default:
                return b;
        }
    }

    function resetCalculator() {
        currentInput = '0';
        operator = null;
        previousInput = null;
        shouldResetDisplay = false;
        display.textContent = '0';
    }
});

// Licensed under the MIT License. See LICENSE file in the project root for details.
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            // Resets the display to 0 when the 'C' button is clicked
            if (button.classList.contains('clear')) {
                display.innerText = '0';
            }
            // Evaluates the mathematical expression
            else if (value === '=') {
                try {
                    const result = evaluateExpression(display.innerText);
                    display.innerText = result !== undefined ? result : 'Erro';
                } catch {
                    display.innerText = 'Erro';
                }
            }
            // Calculates the square root
            else if (value === '√') {
                try {
                    const currentValue = parseFloat(display.innerText);
                    if (!isNaN(currentValue) && currentValue >= 0) {
                        display.innerText = Math.sqrt(currentValue).toString();
                    } else {
                        display.innerText = 'Erro';
                    }
                } catch {
                    display.innerText = 'Erro';
                }
            }
            // Adds the value to the display
            else {
                if (display.innerText === '0' || display.innerText === 'Erro') {
                    display.innerText = value;
                } else {
                    display.innerText += value;
                }
            }
        });
    });

    // Safe function to evaluate expressions
    function evaluateExpression(expression) {
        try {
            return Function('"use strict";return (' + expression + ')')();
        } catch {
            return 'Erro';
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            // Reseta o display para 0 ao clicar no botão 'C'
            if (button.classList.contains('clear')) {
                display.innerText = '0';
            }
            // Avalia a expressão matemática
            else if (value === '=') {
                try {
                    const result = evaluateExpression(display.innerText);
                    display.innerText = result !== undefined ? result : 'Erro';
                } catch {
                    display.innerText = 'Erro';
                }
            }
            // Calcula a raiz quadrada
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
            // Adiciona o valor ao display
            else {
                if (display.innerText === '0' || display.innerText === 'Erro') {
                    display.innerText = value;
                } else {
                    display.innerText += value;
                }
            }
        });
    });

    // Função segura para avaliar expressões
    function evaluateExpression(expression) {
        try {
            return Function('"use strict";return (' + expression + ')')();
        } catch {
            return 'Erro';
        }
    }
});
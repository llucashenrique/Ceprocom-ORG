document.addEventListener('DOMContentLoaded', function () {
    // Inicia com valores de doação mensal
    updateDonationOptions('monthly');

    // Adiciona eventos para os inputs de "One-Time" e "Monthly" para atualizar as opções de valores
    document.getElementById('one-time').addEventListener('click', function () {
        updateDonationOptions('one-time');
    });
    document.getElementById('monthly').addEventListener('click', function () {
        updateDonationOptions('monthly');
    });

    // Adiciona evento para o botão de gerar QR Code
    document.getElementById('generate-qr').addEventListener('click', async function () {
        const selectedType = document.querySelector('input[name="contribution-type"]:checked').value; // Tipo de doação
        let selectedAmount = parseFloat(document.getElementById('custom-amount').value); // Valor da doação

        // Verificar se o valor está preenchido corretamente
        if (!selectedAmount || selectedAmount <= 0) {
            alert('Por favor, selecione ou insira um valor válido para a doação.');
            return;
        }

        const coverFee = document.getElementById('cover-fee').checked; // Verifica se o usuário quer cobrir a taxa

        // Caso o usuário deseje cobrir a taxa de transação, adicione um valor (exemplo 5%)
        if (coverFee) {
            selectedAmount += selectedAmount * 0.05; // Adiciona 5% à doação
        }

        try {
            // Fazendo a requisição POST para o servidor (back-end)
            const response = await fetch('http://localhost:3000/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    transaction_amount: selectedAmount,  // Valor da doação
                    description: selectedType === 'one-time' ? 'Única Doação' : 'Doação Mensal', // Tipo de doação
                    email: 'email-do-doador@example.com' // E-mail do doador (pode ser dinâmico)
                })
            });

            const result = await response.json();

            if (result.success) {
                // Insere o QR Code no modal
                const qrCodeContainer = document.getElementById('qrCodeContainer');
                qrCodeContainer.innerHTML = `
                    <img src="data:image/png;base64,${result.payment.point_of_interaction.transaction_data.qr_code_base64}" alt="QR Code PIX">
                `;

                // Exibe o modal
                const modal = document.getElementById('qrModal');
                modal.style.display = 'flex'; // Exibe o modal

            } else {
                alert('Erro ao gerar o pagamento. Por favor, tente novamente.');
            }

        } catch (error) {
            console.error('Erro ao processar a doação:', error);
            alert('Erro ao processar o pagamento.');
        }
    });

    // Evento para fechar o modal
    const modal = document.getElementById('qrModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.onclick = function() {
        modal.style.display = 'none'; // Fecha o modal
    };

    // Fechar o modal clicando fora da caixa
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Fecha o modal se clicar fora
        }
    };
});

function updateDonationOptions(type) {
    const amountOptionsContainer = document.getElementById('amount-options');
    amountOptionsContainer.innerHTML = ''; // Limpa os valores anteriores

    let options = [];
    if (type === 'one-time') {
        options = [5, 10, 20, 50, 60, 100]; // Valores para "One-Time"
    } else {
        options = [10, 15, 25, 35, 50, 100]; // Valores para "Monthly"
    }

    options.forEach(amount => {
        const button = document.createElement('button');
        button.classList.add('amount-btn');
        button.innerText = `R$ ${amount}${type === 'monthly' ? '/mês' : ''}`;
        button.addEventListener('click', function () {
            // Remove a classe 'selected' de todos os botões
            document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));

            // Adiciona a classe 'selected' ao botão clicado
            button.classList.add('selected');

            // Preenche o campo com o valor do botão clicado
            document.getElementById('custom-amount').value = amount;
        });
        amountOptionsContainer.appendChild(button);
    });
}



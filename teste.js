import mercadopago from 'mercadopago';

// Configuração do Mercado Pago
mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

// Defina o `client_id` e `client_secret` se necessário
mercadopago.configurations.setClientCredentials(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

// Dados do pagamento
const paymentData = {
    transaction_amount: 100, // Valor da transação
    description: 'Teste de pagamento', // Descrição do pagamento
    payment_method_id: 'pix', // Método de pagamento: PIX
    payer: {
        email: 'lucasperes1591@gmail.com' // E-mail do pagador
    },
};

// Função assíncrona para criar o pagamento
async function createPixPayment() {
    try {
        const response = await mercadopago.payment.create(paymentData); // Criando o pagamento
        
        console.log('Pagamento criado com sucesso!');
        console.log('Status do pagamento:', response.body.status);
        console.log('QR Code:', response.body.point_of_interaction.transaction_data.qr_code);
        console.log('Link do QR Code:', response.body.point_of_interaction.transaction_data.ticket_url);
    } catch (error) {
        console.error('Erro ao criar o pagamento:', error);
    }
}

// Chame a função para criar o pagamento PIX
createPixPayment();

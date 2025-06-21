import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';  // Para gerar a idempotencyKey
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Step 1: Inicializando o cliente com o accessToken do .env
const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN, // Pegando o token do arquivo .env
    options: {
        timeout: 5000, // Timeout de 5 segundos
        idempotencyKey: uuidv4() // Gerando uma chave de idempotência única
    }
});

// Step 2: Inicializando o objeto Payment
const payment = new Payment(client);

// Step 3: Função para receber os valores dinamicamente e criar o objeto da requisição
async function createPixPayment(transaction_amount, description, email) {
    // Criando o objeto da requisição com valores dinâmicos
    const body = {
        transaction_amount, // Valor da transação recebido
        description,        // Descrição recebida
        payment_method_id: 'pix', // Método de pagamento: PIX
        payer: {
            email  // E-mail do pagador recebido
        },
    };

    try {
        const response = await payment.create({ body });
        console.log('Pagamento criado com sucesso:', response);
    } catch (error) {
        console.error('Erro ao criar o pagamento:', error);
    }
}

// Step 4: Exemplo de chamada da função passando os valores dinamicamente
// Estes valores podem vir do front-end via uma requisição ou outra forma
// Exemplo de valores recebidos (mude isso para que venha do front):
const transaction_amount = 100.00;  // Exemplo: valor vindo do frontend
const description = 'Doação via PIX';  // Exemplo: descrição vinda do frontend
const email = 'email-do-doador@example.com';  // Exemplo: e-mail vindo do frontend

// Chamando a função para criar o pagamento PIX
createPixPayment(transaction_amount, description, email);


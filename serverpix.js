import express from 'express';
import cors from 'cors';  // Importando o middleware CORS
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import mercadopago from 'mercadopago';  // Usando mercadopago corretamente

const app = express();

// Middleware para habilitar CORS para todas as requisições
app.use(cors());  // Adiciona suporte ao CORS

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Configuração do cliente Mercado Pago
mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);


app.get('/create-payment', (req, res) => {
    res.json({ message: 'GET request successful' });
});

app.post('/create-payment', async (req, res) => {
    const { transaction_amount, description, email } = req.body;

    const body = {
        transaction_amount,
        description,
        payment_method_id: 'pix',
        payer: { email }
    };

    try {
        const idempotencyKey = uuidv4();
        const response = await mercadopago.payment.create(body, { idempotencyKey });
        res.json({ success: true, payment: response });
    } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        res.status(500).json({ success: false, message: 'Erro ao processar pagamento' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

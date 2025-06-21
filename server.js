import express from 'express';
import pool from './db.js';  // Importa a conexão com o banco de dados
import cors from 'cors';
import nodemailer from 'nodemailer';  // Importa o nodemailer para envio de e-mails
import dotenv from 'dotenv';  // Para carregar as variáveis de ambiente

dotenv.config();  // Carregar variáveis do arquivo .env

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configurando o transporte de e-mail (usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Pegando o e-mail das variáveis de ambiente
        pass: process.env.EMAIL_PASS   // Pegando a senha das variáveis de ambiente
    }
});

// Rota para adicionar um doador
app.post('/add-doador', async (req, res) => {
    try {
        const { firstName, lastName, streetAddress, postalCode, city, state } = req.body;
        const [result] = await pool.query(
            'INSERT INTO doadores (nome, finalnome, endereco, cep, cidade, estado) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, streetAddress, postalCode, city, state]
        );
        res.status(201).send({ id: result.insertId, message: 'Doador adicionado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao adicionar doador' });
    }
});

// Rota para listar os doadores
app.get('/doadores', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM doadores');
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao listar doadores' });
    }
});

// Rota para adicionar um inscrito (com envio de e-mail de confirmação)
app.post('/add-inscrito', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ error: 'Email é obrigatório' });
        }

        // Inserindo o e-mail no banco de dados
        const [result] = await pool.query(
            'INSERT INTO inscritos (email) VALUES (?)',
            [email]
        );

        // Enviando o e-mail de confirmação
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,  // E-mail do usuário inscrito
            subject: 'Confirmação de Inscrição',
            text: `Olá,\n\nObrigado por se inscrever na nossa newsletter! Você agora está inscrito e receberá nossas atualizações.`
        };

        await transporter.sendMail(mailOptions);  // Envia o e-mail
        console.log('E-mail de confirmação enviado com sucesso.');

        res.status(201).send({ id: result.insertId, message: 'Inscrito adicionado com sucesso e e-mail enviado!' });
    } catch (error) {
        console.error('Erro ao adicionar inscrito ou enviar e-mail:', error);
        res.status(500).send({ error: 'Erro ao adicionar inscrito' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





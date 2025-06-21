import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5501'
}));

app.use(express.json());

// Função para validar o formato do e-mail
const validarEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

// Configurando o transporte de e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Função para enviar e-mails
const enviarEmails = async (userData) => {
    const { 
        nome, datafilho, cpffilho, rgfilho, genero, pcd, 
        nomemae, datamae, cpfmae, rgmae, telefomae, ocupacaomae,
        nomepai, datapai, cpfpai, rgpai, telefonepai, ocupacaopai,
        cep, cidade, estado, email, renda, pis 
    } = userData;

    // E-mail que você vai receber (dados do formulário)
    const mailToAdmin = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: 'Novo cadastro de usuário',
        text: `
            Um novo usuário se cadastrou!

            -- DADOS DO FILHO --
            Nome: ${nome}
            Data de Nascimento: ${datafilho}
            CPF: ${cpffilho}
            RG: ${rgfilho}
            Gênero: ${genero}
            PcD: ${pcd}

            -- DADOS DA MÃE --
            Nome: ${nomemae}
            Data de Nascimento: ${datamae}
            CPF: ${cpfmae}
            RG: ${rgmae}
            Telefone: ${telefomae}
            Ocupação: ${ocupacaomae}

            -- DADOS DO PAI --
            Nome: ${nomepai}
            Data de Nascimento: ${datapai}
            CPF: ${cpfpai}
            RG: ${rgpai}
            Telefone: ${telefonepai}
            Ocupação: ${ocupacaopai}

            -- INFORMAÇÕES GERAIS --
            CEP: ${cep}
            Cidade: ${cidade}
            Estado: ${estado}
            E-mail: ${email}
            Renda Familiar: ${renda}
            Número do PIS: ${pis}
        `
    };

    // E-mail de confirmação para o usuário
    const mailToUser = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmação de Cadastro',
        text: `Olá ${nome},\n\nObrigado por se cadastrar! Este e-mail confirma que recebemos seus dados com sucesso.`
    };

    try {
        // Envia o e-mail para o administrador (com todos os dados)
        await transporter.sendMail(mailToAdmin);
        console.log('E-mail enviado ao administrador com sucesso.');

        // Envia o e-mail de confirmação para o usuário
        await transporter.sendMail(mailToUser);
        console.log('E-mail de confirmação enviado ao usuário com sucesso.');
    } catch (error) {
        console.error('Erro ao enviar os e-mails:', error);
        throw new Error('Erro ao enviar os e-mails.');
    }
};

// Rota de cadastro de usuário
app.post('/cadastro', async (req, res) => {
    const { nome, email } = req.body;

    // Validação de nome e e-mail
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
    }

    // Validação do formato do e-mail
    if (!validarEmail(email)) {
        return res.status(400).json({ error: 'Formato de e-mail inválido.' });
    }

    try {
        // Enviar e-mails de cadastro e confirmação
        await enviarEmails(req.body);

        // Resposta para o usuário no front-end
        res.status(200).json({ message: 'Cadastro realizado com sucesso e e-mails enviados!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar o cadastro.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

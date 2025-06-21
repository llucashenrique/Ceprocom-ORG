import mysql from 'mysql2/promise';

// Configuração do Banco de Dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234',  // Substitua pela sua senha do MySQL
    database: 'formulario_ceprocom'  // Nome do banco de dados
};

// Criação da Conexão com o Banco de Dados
const pool = mysql.createPool(dbConfig);

export default pool;

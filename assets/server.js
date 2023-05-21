const express = require('express');
const mysql = require('mysql');

const app = express();

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'nome_do_banco_de_dados'
});

// Conecta ao banco de dados
connection.connect();

// Rota para obter os dados do MySQL
app.get('/dados', (req, res) => {
    // Consulta SQL para obter os dados desejados
    const sql = 'SELECT * FROM tabela';

    // Executa a consulta
    connection.query(sql, (error, results) => {
        if (error) {
            throw error;
        }

        // Retorna os resultados como resposta
        res.json(results);
    });
});

// Inicia o servidor na porta desejada
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});

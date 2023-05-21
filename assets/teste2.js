const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Importe as classes e o estoque
const {
  Usuario,
  Gerente,
  Vendedor,
  Produto,
  Estoque
} = require('./main.js');

const app = express();
const port = 3000;

// Configure o body-parser para lidar com solicitações JSON
app.use(bodyParser.json());

// Crie uma conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'data_base'
});

// Estabeleça a conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida com o banco de dados MySQL.');
  }
});

// Crie uma rota GET para exibir os clientes
app.get('/clientes', async (req, res) => {
  const query = 'SELECT * FROM CLIENTES';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os clientes' });
    } else {
      res.json(results);
    }
  });
});

// Crie uma rota POST para adicionar um novo cliente
app.post('/clientes', async (req, res) => {
  const {
    nome,
    telefone,
    email,
    cpf,
    data_nascimento,
    sexo,
    logradouro,
    numero,
    complemento,
    estado,
    cidade
  } = req.body;

  const query = 'INSERT INTO CLIENTES (nome, telefone, email, cpf, data_nascimento, sexo, logradouro, numero, complemento, estado, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    nome,
    telefone,
    email,
    cpf,
    data_nascimento,
    sexo,
    logradouro,
    numero,
    complemento,
    estado,
    cidade
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao adicionar o cliente' });
    } else {
      res.json({ success: true });
    }
  });
});

// Crie uma rota GET para exibir os produtos
app.get('/produtos', async (req, res) => {
  const query = 'SELECT * FROM PRODUTOS';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao obter os produtos' });
    } else {
      res.json(results);
    }
  });
});

// Crie uma rota POST para adicionar um novo produto
app.post('/produtos', async (req, res) => {
  const { nome, preco, quantidade } = req.body;

  const query = 'INSERT INTO PRODUTOS (nome, preco, quantidade) VALUES (?, ?, ?)';
  const values = [nome, preco, quantidade];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao adicionar o produto' });
    } else {
      res.json({ success: true });
    }
  });
});

// Inicialize o servidor
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');

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

// Crie uma rota GET para exibir os clientes
app.get('/clientes', async (req, res) => {
  const data_base = require('../assets/server.js');
  const clientes = await data_base.selectCustomers();
  res.json(clientes);
});

// Crie uma rota POST para adicionar um novo cliente
app.post('/clientes', async (req, res) => {
  const data_base = require('../assets/server.js');
  const { nome, telefone, email, cpf, data_nascimento, sexo, logradouro, numero, complemento, estado, cidade } = req.body;
  const resultado = await data_base.insertCustomer({
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
  });
  res.json(resultado);
});

// Crie uma rota GET para exibir os produtos
app.get('/produtos', async (req, res) => {
  const data_base = require('../assets/server.js');
  const produtos = await data_base.selectProduct();
  res.json(produtos);
});

// Crie uma rota POST para adicionar um novo produto
app.post('/produtos', async (req, res) => {
  const data_base = require('../assets/server.js');
  const { nome, preco, quantidade } = req.body;
  const resultado = await data_base.insertProduct({
    nome,
    preco,
    quantidade
  });
  res.json(resultado);
});

// Inicialize o servidor
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});

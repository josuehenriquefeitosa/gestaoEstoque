const express = require('express');
const app = express();
const port = 3000;

// Defina as rotas e os manipuladores de rota aqui

// Configuração da rota para o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor Express está ouvindo na porta ${port}`);
});

const mysql = require('mysql2');

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco_de_dados'
});

// Conectar ao MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão estabelecida com sucesso ao MySQL');
});



// Configurações de conexão com o banco de dados
async function connect() {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  }

  //const mysql = require('mysql2/promise');
  const connection = mysql.createConnection("mysql://root@localhost:3306/data_base");
  console.log('CONECTOU NO MYSQL');
  global.connection = connection;
  return connection;
};


async function selectCustomers() {
  const conn = await connect();
  const rows = conn.query('SELECT * FROM clientes');
  return await rows;
}

async function selectCustomerName(customer) {
  try {
    const conn = await connect();
    const sql = 'SELECT * FROM clientes WHERE nome=?';
    const values = [customer.nome];
    const result = await conn.query(sql, values);
    return result;
  } catch (error) {
    console.error('Erro ao selecionar o nome do cliente:', error);
    throw error;
  }
}


async function insertCustomer(customer) {
  const conn = await connect();
  const sql = 'INSERT INTO clientes(nome,telefone,cpf,data_nascimento,sexo,logradouro,numero,complemento,uf,cidade,email) VALUES(?,?,?,?,?,?,?,?,?,?,?);';
  const values = [customer.nome, customer.telefone, customer.cpf, customer.data_nascimento, customer.sexo, customer.logradouro, customer.numero, customer.complemento, customer.uf, customer.cidade, customer.email];
  return await conn.query(sql, values);
}


async function updateCustomer(id, customer) {
  const conn = await connect();
  const sql = 'UPDATE clientes SET nome=?,telefone=?,cpf=?,data_nascimento=?,sexo=?,logradouro=?,numero=?,complemento=?,uf=?,cidade=?,email=? WHERE id=?';
  const values = [id, customer.nome, customer.telefone, customer.cpf, customer.data_nascimento, customer.sexo, customer.logradouro, customer.numero, customer.complemento, customer.uf, customer.cidade, customer.email];
  return await conn.query(sql, values);
}

async function deleteCustomer(id) {
  const conn = await connect();
  const sql = 'DELETE FROM clientes WHERE id=?;';
  return await conn.query(sql, [id]);
}

// Rota para buscar um cliente pelo nome
app.post('/buscarCliente', async (req, res) => {
  const customer = {
    nome: req.body.nome
  };

  try {
    const result = await selectCustomerName(customer);
    if (result.length > 0) {
      const clienteEncontrado = result[0];
      res.json(clienteEncontrado);
    } else {
      res.json({});
    }
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).send('Erro ao buscar cliente.');
  }
})

// Rota para buscar um cliente pelo nome
app.get('/home', async (req, res) => {
  const customer = {
    nome: req.body.nome
  };

  try {
    const result = await selectCustomerName(customer);
    if (result.length > 0) {
      const clienteEncontrado = result[0];
      res.json(clienteEncontrado);
    } else {
      res.json({});
    }
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).send('Erro ao buscar cliente.');
  }
}
)

module.exports = { selectCustomers, insertCustomer, updateCustomer, deleteCustomer, selectCustomerName }

/*
    // Conectando ao banco de dados
    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return;
        }

        console.log('Conexão estabelecida com sucesso.');

    // Consulta para criar a tabela 'usuarios'
        const query = `
        CREATE TABLE usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100),
            telefone VARCHAR(20),
            cpf VARCHAR(11),
            data_nascimento DATE,
            sexo ENUM('Masculino', 'Feminino', 'Outro'),
            logradouro VARCHAR(100),
            numero VARCHAR(10),
            complemento VARCHAR(100),
            uf VARCHAR(2),
            cidade VARCHAR(100),
            email VARCHAR(100)
        )`;

        // Executar a consulta para criar a tabela
        connection.query(query, (err, result) => {
            if (err) {
                console.error('Erro ao criar a tabela:', err);
            } else {
                console.log('Tabela criada com sucesso.');
            }

            // Fechando a conexão
            connection.end();
        });
    })
*/
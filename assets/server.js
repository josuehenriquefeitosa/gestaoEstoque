// Configurações de conexão com o banco de dados
async function connect() {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  }

  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection("mysql://root@localhost:3306/data_base");
  //console.log('Conectado ao MySQL');
  global.connection = connection;
  return connection;
}

async function selectCustomers() {
  try {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM data_base.clientes;');
    return rows;
  } catch (error) {
    console.error('Erro ao selecionar os clientes:', error);
    throw error;
  }
}

async function selectCustomerName(customer) {
  try {
    const conn = await connect();
    const sql = 'SELECT * FROM clientes WHERE nome=?';
    const values = [customer.nome];
    const [result] = await conn.query(sql, values);
    return result;
  } catch (error) {
    console.error('Erro ao selecionar o nome do cliente:', error);
    throw error;
  }
}

async function insertCustomer(customer) {
  try {
    const conn = await connect();
    const sql = 'INSERT INTO clientes(nome,telefone,cpf,data_nascimento,sexo,logradouro,numero,complemento,uf,cidade,email) VALUES(?,?,?,?,?,?,?,?,?,?,?);';
    const values = [customer.nome, customer.telefone, customer.cpf, customer.data_nascimento, customer.sexo, customer.logradouro, customer.numero, customer.complemento, customer.uf, customer.cidade, customer.email];
    const [result] = await conn.query(sql, values);
    return result.insertId;
  } catch (error) {
    console.error('Erro ao inserir o cliente:', error);
    throw error;
  }
}

async function updateCustomer(id, customer) {
  try {
    const conn = await connect();
    const sql = 'UPDATE clientes SET nome=?,telefone=?,cpf=?,data_nascimento=?,sexo=?,logradouro=?,numero=?,complemento=?,uf=?,cidade=?,email=? WHERE id=?';
    const values = [customer.nome, customer.telefone, customer.cpf, customer.data_nascimento, customer.sexo, customer.logradouro, customer.numero, customer.complemento, customer.uf, customer.cidade, customer.email, id];
    await conn.query(sql, values);
    console.log('Cliente atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar o cliente:', error);
    throw error;
  }
}

async function deleteCustomer(id) {
  try {
    const conn = await connect();
    const sql = 'DELETE FROM clientes WHERE id=?;';
    await conn.query(sql, [id]);
    console.log('Cliente removido com sucesso!');
  } catch (error) {
    console.error('Erro ao remover o cliente:', error);
    throw error;
  }
}

async function insertProduct(product) {
  try {
    const conn = await connect();
    const sql = 'INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)';
    const values = [product.nome, product.preco, product.quantidade];
    const [result] = await conn.query(sql, values);
    return result.insertId;
  } catch (error) {
    console.error('Erro ao inserir o produto:', error);
    throw error;
  }
}

async function selectProduct() {
  try {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM data_base.produtos;');
    return rows;
  } catch (error) {
    console.error('Erro ao selecionar os produtos:', error);
    throw error;
  }
}

async function selectProductById(id) {
  try {
    const conn = await connect();
    const sql = 'SELECT * FROM produtos WHERE id=?';
    const values = [id];
    const [result] = await conn.query(sql, values);
    return result[0];
  } catch (error) {
    console.error('Erro ao selecionar o produto pelo ID:', error);
    throw error;
  }
}

async function updateProduct(id, product) {
  try {
    const conn = await connect();
    const sql = 'UPDATE produtos SET nome=?, preco=?, quantidade=? WHERE id=?';
    const values = [product.nome, product.preco, product.quantidade, id];
    await conn.query(sql, values);
    console.log('Produto atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar o produto:', error);
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const conn = await connect();
    const sql = 'DELETE FROM produtos WHERE id=?;';
    await conn.query(sql, [id]);
    console.log('Produto removido com sucesso!');
  } catch (error) {
    console.error('Erro ao remover o produto:', error);
    throw error;
  }
}

module.exports = {
  selectCustomers,
  selectCustomerName,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
  selectProduct,
  selectProductById,
  insertProduct,
  updateProduct,
  deleteProduct
};

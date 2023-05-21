// Configurações de conexão com o banco de dados
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }
        
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection("mysql://root@localhost:3306/data_base");
    console.log('CONECTOU NO MYSQL');
    global.connection = connection;
    return connection;
}


async function selectCustomers(){
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

   
async function insertCustomer(customer){
    const conn = await connect();
    const sql = 'INSERT INTO clientes(nome,telefone,cpf,data_nascimento,sexo,logradouro,numero,complemento,uf,cidade,email) VALUES(?,?,?,?,?,?,?,?,?,?,?);';
    const values = [customer.nome,customer.telefone,customer.cpf,customer.data_nascimento,customer.sexo,customer.logradouro,customer.numero,customer.complemento,customer.uf,customer.cidade,customer.email];
    return await conn.query(sql,values);
}


async function updateCustomer(id, customer){
  const conn = await connect();
  const sql = 'UPDATE clientes SET nome=?,telefone=?,cpf=?,data_nascimento=?,sexo=?,logradouro=?,numero=?,complemento=?,uf=?,cidade=?,email=? WHERE id=?';
  const values = [id, customer.nome,customer.telefone,customer.cpf,customer.data_nascimento,customer.sexo,customer.logradouro,customer.numero,customer.complemento,customer.uf,customer.cidade,customer.email];
  return await conn.query(sql,values);
}   

async function deleteCustomer(id){
  const conn = await connect();
  const sql = 'DELETE FROM clientes WHERE id=?;';
  return await conn.query(sql,[id]);
}   


  //-------------------------PRODUTOS----------------------------
async function insertProduct(product){
  const conn = await connect();
  const sql = 'INSERT INTO produtos(nome,preco,quantidade) VALUES(?,?,?);';
  const values = [product.nome,product.preco,product.quantidade];
  return await conn.query(sql,values);
}

async function selectProductName(product) {
  try {
    const conn = await connect();
    const sql = 'SELECT * FROM produtos WHERE nome=?';
    const values = [product.nome];
    const result = await conn.query(sql, values);
    return result;
  } catch (error) {
    console.error('Erro ao selecionar o nome do produto:', error);
    throw error;
  }
}

async function updateProduct(id, product){
  const conn = await connect();
  const sql = 'UPDATE clientes SET nome=?,preco=?,quantidade=? WHERE id=?';
  const values = [id, product.nome,product.preco,product.quantidade];
  return await conn.query(sql,values);

}


async function deleteProduct(id){
  const conn = await connect();
  const sql = 'DELETE FROM produtos WHERE id=?;';
  return await conn.query(sql,[id]);
}
  //-------------------------PRODUTOS----------------------------


module.exports = {selectCustomers,insertCustomer,updateCustomer,deleteCustomer,selectCustomerName,insertProduct,selectProductName,updateProduct,deleteProduct}

class Usuario {
    constructor(nome, email, senha) {
      this.nome = nome;
      this.email = email;
      this.senha = senha;
    }
}
  
class Gerente extends Usuario {
    constructor(nome, email, senha) {
        super(nome, email, senha);
        this.nivel = "gerente";
    }

    cadastrarProduto(produto) {
        estoque.adicionarProduto(produto);
    }

    removerProduto(codigo) {
        estoque.removerProduto(codigo);
    }

    realizarVenda(codigo, quantidade) {
        estoque.venderProduto(codigo, quantidade);
    }
}
    

class Produto {
    constructor(codigo, nome, preco, quantidade) {
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }
}
  
class Estoque {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    removerProduto(codigo) {
        this.produtos = this.produtos.filter((produto) => produto.codigo !== codigo);
    }

    venderProduto(codigo, quantidade) {
        const produto = this.produtos.find((produto) => produto.codigo === codigo);
        if (produto) {
            if (produto.quantidade >= quantidade) {
                produto.quantidade -= quantidade;
                console.log(`Venda realizada: ${quantidade} unidades do produto ${produto.nome}`);
            } else {
                console.log(`Não há estoque suficiente para vender ${quantidade} unidades do produto ${produto.nome}`);
            }
        } else {
        console.log(`Produto não encontrado com o código ${codigo}`);
        }
    }
}


const estoque = new Estoque();

const gerente = new Gerente("João", "joao@mail.com", "senha123");


estoque.adicionarProduto(new Produto("001", "Camiseta", 29.90, 50));
estoque.adicionarProduto(new Produto("002", "Calça Jeans", 89.90, 20));
gerente.cadastrarProduto(new Produto("003", "Tênis", 149.90, 30));
gerente.removerProduto("002");



//----------------CONEXAO BANCO--------------------
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


async function selectProduct(){
  const conn = await connect();
  const rows = conn.query('SELECT * FROM produtos');
  return await rows;
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




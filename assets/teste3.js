
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configure o body-parser para lidar com solicitações JSON
app.use(bodyParser.json());

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

// Inicialize o servidor
app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});



//-------------------------CONEXAO MYSQL--------------------------
(async () => {
    async function connect(){
        if(global.connection && global.connection.state !== 'disconnected'){
            return global.connection;
        }
            
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection("mysql://root@localhost:3306/data_base");
        console.log('CONECTOU NO MYSQL');
        global.connection = connection;
        return connection;
    };

    console.log('começou!!!');

    /* // ----------------------------CLIENTES---------------------------------------
    console.log('-----------------------------')
    console.log('INSERT INTO CLIENTES');
    const resultado = await data_base.insertCustomer({nome:`fernando`,telefone:`798888888888`,email:`fernando@email.com`,cpf:`05653524581`,data_nascimento:`1974-05-12`,sexo:`Masculino`,logradouro:`Av augusto franco`,numero:`2787`,complemento:`casa`,estado:`SE`,cidade:`Aracaju`
    });
    console.log(resultado[0]);
    */

    console.log('-----------------------------')
    console.log('SELECT * FROM CLIENTES');
    const clientes = await data_base.selectCustomers();
    console.log(clientes[0]);
    console.log('-----------------------------')

    console.log()
    console.log()
    console.log('-----------------------------')
    console.log('SELECT * FROM CLIENTES WHERE nome= ?');
    const clientesNome = await data_base.selectCustomerName({nome:'josue'});
    console.log(clientesNome[0]);
    console.log('-----------------------------')
    console.log()
    /*
    console.log()
    console.log('-----------------------------')
    console.log('UPDATE CLIENTES');
    const resultado2 = await data_base.updateCustomer(3,{nome:``,telefone:``,cpf:``,data_nascimento:``,sexo:``,logradouro:``,numero:``,complemento:``,estado:``,cidade:``,email:``
    });
    console.log(resultado2[0]);
    console.log('-----------------------------')
    console.log()
    console.log()
    console.log('-----------------------------')
    console.log('DELETE FROM CLIENTES');
    const resultado3 = await data_base.deleteCustomer();
    console.log(resultado3[0]);
    console.log('-----------------------------')
    console.log()
        // ----------------------------CLIENTES---------------------------------------
    */

        // ----------------------------PRODUTOS---------------------------------------
        /*
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
    //-------------------------PRODUTOS----------------------------


    module.exports = {selectCustomers,insertCustomer,updateCustomer,deleteCustomer,selectCustomerName,insertProduct,selectProductName,updateProduct,deleteProduct,selectProduct}



    console.log()
    console.log('-----------CADASTRO PRODUTOS------------------')
    console.log('INSERT INTO PRODUTOS');
    const resultado4 = await data_base.insertProduct({nome:`valvulaEscape`,preco:`10`,quantidade:`2`});
    console.log(resultado4[0]);
    console.log()
    console.log()
    */

    console.log('------------MOSTRAR PRODUTOS-----------------')
    console.log('SELECT * FROM PRODUTOS');
    const produtos = await data_base.selectProduct();
    console.log(produtos[0]);
    console.log('-----------------------------')
    console.log()
    console.log()


    console.log('')
    console.log('----------PESQUISA PRODUTOS NOME-------------------')
    console.log('SELECT * FROM PRODUTOS WHERE nome= ?');
    const produtosNome = await data_base.selectProductName({nome:'oleo10w40'});
    console.log(produtosNome[0]);
    console.log('-----------------------------')
    console.log()
    console.log()


    console.log('-----------DELETAR PRODUTOS------------------')
    console.log('DELETE FROM PRODUTOS');
    const resultado5 = await data_base.deleteProduct();
    console.log(resultado5[0]);
    console.log('-----------------------------')

      // ----------------------------PRODUTOS---------------------------------------
})();












//------------------------PRINCIPAL-------------------------------------

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
  
    async cadastrarProduto(produto) {
        await insertProduct(produto);
    }  
  
    async removerProduto(id) {
        await deleteProduct(id);
    }  
  
    async realizarVenda(id, quantidade) {
        const produto = await selectProductById(id);
        if (produto) {
            if (produto.quantidade >= quantidade) {
            produto.quantidade -= quantidade;  
            console.log(`Venda realizada: ${quantidade} unidades do produto ${produto.nome}`);
            await updateProduct(id, produto);
            } else {
            console.log(`Não há estoque suficiente para vender ${quantidade} unidades do produto ${produto.nome}`);  
            }  
        } else {
            console.log(`Produto não encontrado com o ID ${id}`);  
        }  
        }  
    }    
  
class Produto {
    constructor(nome, preco, quantidade) {
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
  
    removerProduto(id) {
      this.produtos = this.produtos.filter((produto) => produto.id !== id);  
    }  
  
    venderProduto(id, quantidade) {
      const produto = this.produtos.find((produto) => produto.id === id);  
      if (produto) {
        if (produto.quantidade >= quantidade) {
          produto.quantidade -= quantidade;  
          console.log(`Venda realizada: ${quantidade} unidades do produto ${produto.nome}`);
        } else {
          console.log(`Não há estoque suficiente para vender ${quantidade} unidades do produto ${produto.nome}`);  
        }  
      } else {
        console.log(`Produto não encontrado com o ID ${id}`);  
      }  
    }  
}    
  
const estoque = new Estoque();
  
const gerente = new Gerente("João", "joao@mail.com", "senha123");
  
//estoque.adicionarProduto(new Produto("bloco", 29.90, 50));
//estoque.adicionarProduto(new Produto("Comando", 222.90, 880));
gerente.cadastrarProduto(new Produto("Comando", 222.90, 880));
gerente.removerProduto();




  





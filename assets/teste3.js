//----------------CONEXAO BANCO--------------------
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
    const data_base = require('./server.js');
    
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




  





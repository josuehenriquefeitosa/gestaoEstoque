const server = require('./server.js');

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

  mostrarProdutos() {
    estoque.mostrarProdutos();
  }

  cadastrarProduto(produto) {
    estoque.adicionarProduto(produto);
  }

  removerProduto(codigo) {
    estoque.removerProduto(codigo);
  }

  realizarVenda(id, quantidade) {
    estoque.venderProduto(id, quantidade);
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
  mostrarProdutos() {
    server.selectProduct()
      .then(produtos => {
        console.log('------------MOSTRAR PRODUTOS-----------------');
        console.log(produtos);
        console.log('--------------------------------------------');
      })
      .catch(error => {
        console.error('Erro ao obter os produtos:', error);
      });
  }

  adicionarProduto(produto) {
    server.insertProduct(produto)
      .then(() => {
        console.log('Produto adicionado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao adicionar o produto:', error);
      });
  }

  removerProduto(id) {
    server.deleteProduct(id)
      .then(() => {
        console.log(`Produto com ID ${id} removido com sucesso!`);
      })
      .catch(error => {
        console.error('Erro ao remover o produto:', error);
      });
  }

  venderProduto(id, quantidade) {
    server.selectProduct()
      .then(produtos => {
        const produto = produtos.find(produto => produto.id === id);
        if (produto) {
          if (produto.quantidade >= quantidade) {
            produto.quantidade -= quantidade;
            console.log(`Venda realizada: ${quantidade} unidades do produto ${produto.nome}`);
            // Atualizar o produto no banco de dados com a quantidade atualizada
            server.updateProduct(produto.id, produto)
              .then(() => {
                console.log('Produto atualizado no banco de dados');
              })
              .catch(error => {
                console.error('Erro ao atualizar o produto:', error);
              });
          } else {
            console.log(`Não há estoque suficiente para vender ${quantidade} unidades do produto ${produto.nome}`);
          }
        } else {
          console.log(`Produto não encontrado com o ID ${id}`);
        }
      })
      .catch(error => {
        console.error('Erro ao obter os produtos:', error);
      });
  }
}

// --------------- PRINCIPAL --------------------------
const estoque = new Estoque();
const gerente = new Gerente("João", "joao@mail.com", "senha123");

gerente.mostrarProdutos();
console.log();
estoque.adicionarProduto(new Produto("Chave allen", 89.90, 20));
console.log();
gerente.cadastrarProduto(new Produto("alicate universal", 149.90, 30));
console.log();
//gerente.removerProduto(22);
console.log();
//gerente.removerProduto(23);
console.log();
//gerente.removerProduto(24);
console.log();
gerente.realizarVenda(1,1);

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

  realizarVenda(codigo, quantidade) {
    estoque.venderProduto(codigo, quantidade);
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
        console.log('Produto inserido com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao adicionar o produto:', error);
      });
  }

  removerProduto(codigo) {
    server.deleteProduct(codigo)
      .then(() => {
        console.log('Produto removido com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao remover o produto:', error);
      });
  }

  venderProduto(codigo, quantidade) {
    server.selectProductById(codigo)
      .then(produto => {
        if (produto) {
          if (produto.quantidade >= quantidade) {
            produto.quantidade -= quantidade;
            console.log(`Venda realizada: ${quantidade} unidades do produto ${produto.nome}`);
            server.updateProduct(codigo, produto)
              .then(() => {
                console.log('Produto atualizado no banco de dados');
                if (produto.quantidade === 0) {
                  server.deleteProduct(codigo)
                    .then(() => {
                      console.log('Produto removido do banco de dados');
                    })
                    .catch(error => {
                      console.error('Erro ao remover o produto:', error);
                    });
                }
              })
              .catch(error => {
                console.error('Erro ao atualizar o produto:', error);
              });
          } else {
            console.log(`Não há estoque suficiente para vender ${quantidade} unidades do produto ${produto.nome}`);
          }
        } else {
          console.log(`Produto não encontrado com o código ${codigo}`);
        }
      })
      .catch(error => {
        console.error('Erro ao obter o produto:', error);
      });
  }
}

const estoque = new Estoque();
const gerente = new Gerente("João", "joao@mail.com", "senha123");


gerente.mostrarProdutos();
console.log();
estoque.adicionarProduto(new Produto("paralama", 400, 250));
console.log();
gerente.cadastrarProduto(new Produto("radiador", 400, 250));
console.log();
estoque.adicionarProduto(new Produto("virabrequim", 111, 55));
console.log();
gerente.cadastrarProduto(new Produto("balecin", 222, 333));
console.log();
gerente.realizarVenda(97,10);
console.log();
gerente.mostrarProdutos();
console.log();
gerente.removerProduto(96)

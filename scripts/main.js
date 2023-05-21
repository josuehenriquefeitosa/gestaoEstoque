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
}
  
class Vendedor extends Usuario {
    constructor(nome, email, senha) {
        super(nome, email, senha);
        this.nivel = "vendedor";
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
const vendedor = new Vendedor("Maria", "maria@mail.com", "senha456");

estoque.adicionarProduto(new Produto("001", "Camiseta", 29.90, 50));
estoque.adicionarProduto(new Produto("002", "Calça Jeans", 89.90, 20));

gerente.cadastrarProduto(new Produto("003", "Tênis", 149.90, 30));
gerente.removerProduto("002");

vendedor.realizarVenda("001", 10);
vendedor.realizarVenda("001", 50);

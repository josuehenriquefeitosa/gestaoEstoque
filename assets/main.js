//const index = require('./index')
const { selectCustomers, insertCustomer, updateCustomer, deleteCustomer, selectCustomerName, insertProduct, selectProductName,selectProduct, updateProduct, deleteProduct} = require('./server')



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
    constructor(nome, preco, quantidade) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }
}
  
class Estoque {
    
    mostrarProdutos(){
        selectProduct()
    }


    adicionarProduto(produto) {
        insertProduct(produto)
    }

    removerProduto(id) {
        deleteProduct(id)
       
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
        console.log(`Produto não encontrado com o código ${id}`);
    }}
}

// --------------- PRINCIPAL --------------------------
const estoque = new Estoque();
const gerente = new Gerente("João", "joao@mail.com", "senha123");

estoque.mostrarProdutos()
//estoque.adicionarProduto(new Produto("chave de torque", 29.90, 50));
//estoque.adicionarProduto(new Produto("Chave allen", 89.90, 20));
//gerente.cadastrarProduto(new Produto("alicate universal", 149.90, 30));
//gerente.removerProduto(22);
//gerente.removerProduto(23);
//gerente.removerProduto(24);











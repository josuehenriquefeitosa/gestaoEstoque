
(async () => {
    const data_base = require('../assets/server.js');
    console.log('começou!!!');

    /* // ----------------------------CLIENTES---------------------------------------
    console.log('-----------------------------')
    console.log('INSERT INTO CLIENTES');
    const resultado = await data_base.insertCustomer({nome:`fernando`,telefone:`798888888888`,email:`fernando@email.com`,cpf:`05653524581`,data_nascimento:`1974-05-12`,sexo:`Masculino`,logradouro:`Av augusto franco`,numero:`2787`,complemento:`casa`,estado:`SE`,cidade:`Aracaju`
    });
    console.log(resultado[0]);
*/
/*
    console.log('-----------------------------')
    console.log('SELECT * FROM CLIENTES');
    const clientes = await data_base.selectCustomers();
    console.log(clientes[0]);
    console.log('-----------------------------')
*/
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
    





/*
         cd assets/

*/
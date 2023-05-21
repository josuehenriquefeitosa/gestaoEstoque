
(async () => {
    const data_base = require('./server.js');
    console.log('começou!!!');

    /*
    console.log('-----------------------------')
    console.log('INSERT INTO CLIENTES');
    const resultado = await data_base.insertCustomer({nome:`fernando`,telefone:`798888888888`,email:`fernando@email.com`,cpf:`05653524581`,data_nascimento:`1974-05-12`,sexo:`Masculino`,logradouro:`Av augusto franco`,numero:`2787`,complemento:`casa`,estado:`SE`,cidade:`Aracaju`
    });
    console.log(resultado);
*/
/*
    console.log('-----------------------------')
    console.log('SELECT * FROM CLIENTES');
    const clientes = await data_base.selectCustomers();
    console.log(clientes);
    console.log('-----------------------------')
*/
    console.log('-----------------------------')
    console.log('SELECT * FROM CLIENTES WHERE nome= ?');
    const clientesNome = await data_base.selectCustomerName({nome:'josue'});
    console.log(clientesNome);
    console.log('-----------------------------')
/*
    console.log('-----------------------------')
    console.log('UPDATE CLIENTES');
    const resultado2 = await data_base.updateCustomer(3,{nome:``,telefone:``,cpf:``,data_nascimento:``,sexo:``,logradouro:``,numero:``,complemento:``,estado:``,cidade:``,email:``
    });
    console.log(resultado2);
    console.log('-----------------------------')


    console.log('-----------------------------')
    console.log('DELETE FROM CLIENTES');
    const resultado3 = await data_base.deleteCustomer();
    console.log(resultado3);
    console.log('-----------------------------')
    
    */
})();
    





/*
         cd assets/

*/

(async () => {
    const data_base = require('../assets/data_base.js');
    console.log('começou!!!');
    console.log('-----------------------------')
    console.log('INSERT INTO CLIENTES');
    const resultado = await data_base.insertCustomer({nome:`josue`,telefone:`79999999999`,email:`josue@email.com`,cpf:`03076727516`,data_nascimento:`1998-12-05`,sexo:`Masculino`,logradouro:`Av Um,Bairro Anzol`,numero:`1234`,complemento:`casa`,estado:`SE`,cidade:`Aracaju`
    });
    console.log(resultado);

    console.log('-----------------------------')
    console.log('SELECT * FROM CLIENTES');
    const clientes = await data_base.selectCustomers();
    console.log(clientes);
    console.log('-----------------------------')

    console.log('-----------------------------')
    console.log('UPDATE CLIENTES');
    const resultado2 = await data_base.updateCustomer(3,{nome:`josé feitosa`,telefone:`79977777777`,cpf:`04597528545`,data_nascimento:`1998-12-05`,sexo:`Masculino`,logradouro:`17 de março`,numero:`222`,complemento:`apt`,estado:`SE`,cidade:`Aracaju`,email:`jorge@email.com`
    });
    console.log(resultado2);
    console.log('-----------------------------')


    console.log('-----------------------------')
    console.log('DELETE FROM CLIENTES');
    const resultado3 = await data_base.deleteCustomer(33);
    console.log(resultado3);
    console.log('-----------------------------')
})();
    





/*
         cd assets/

*/
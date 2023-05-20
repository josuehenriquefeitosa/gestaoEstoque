
(async () => {

    const data_base = require('../assets/data_base.js')
    console.log('começou!!!')
    console.log('SELECT * FROM CLIENTES')
    const clientes = await data_base.selectCustomers()
    console.log(clientes)
    console.log('INSERT * INTO CLIENTES')
    await data_base.insertCustomer({
        nome: ``,
        telefone:``,
        email: ``,
        cpf: ``,
        dataNascimento: ``,
        sexo: ``,
        logradouro: ``,
        numero: ``,
        complemento: ``,
        estado: ``,
        cidade: ``
    })
})();
    

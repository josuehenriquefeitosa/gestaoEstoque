
// Configurações de conexão com o banco de dados
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


async function selectCustomers(){
    const conn = await connect();
    const rows = conn.query('SELECT * FROM clientes');
    return await rows;
}

   
async function insertCustomer(customer){
    const conn = await connect();
    const sql = 'INSERT INTO clientes(nome,telefone,cpf,data_nascimento,sexo,logradouro,numero,complemento,uf,cidade,email) VALUES(?,?,?,?,?,?,?,?,?,?,?);';
    const values = [customer.nome,customer.telefone,customer.cpf,customer.data_nascimento,customer.sexo,customer.logradouro,customer.numero,customer.complemento,customer.uf,customer.cidade,customer.email];
    return await conn.query(sql,values);
}


async function updateCustomer(id, customer){
    const conn = await connect();
    const sql = 'UPDATE clientes SET nome=?,telefone=?,cpf=?,data_nascimento=?,sexo=?,logradouro=?,numero=?,complemento=?,uf=?,cidade=?,email=? WHERE id=?';
    const values = [id, customer.nome,customer.telefone,customer.cpf,customer.data_nascimento,customer.sexo,customer.logradouro,customer.numero,customer.complemento,customer.uf,customer.cidade,customer.email];
    return await conn.query(sql,values);
}   


async function deleteCustomer(id){
    const conn = await connect();
    const sql = 'DELETE FROM clientes WHERE id=?;';
    return await conn.query(sql,[id]);
}   


module.exports = {selectCustomers,insertCustomer,updateCustomer,deleteCustomer}


/*
    // Conectando ao banco de dados
    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            return;
        }

        console.log('Conexão estabelecida com sucesso.');

    // Consulta para criar a tabela 'usuarios'
        const query = `
        CREATE TABLE usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100),
            telefone VARCHAR(20),
            cpf VARCHAR(11),
            data_nascimento DATE,
            sexo ENUM('Masculino', 'Feminino', 'Outro'),
            logradouro VARCHAR(100),
            numero VARCHAR(10),
            complemento VARCHAR(100),
            uf VARCHAR(2),
            cidade VARCHAR(100),
            email VARCHAR(100)
        )`;

        // Executar a consulta para criar a tabela
        connection.query(query, (err, result) => {
            if (err) {
                console.error('Erro ao criar a tabela:', err);
            } else {
                console.log('Tabela criada com sucesso.');
            }

            // Fechando a conexão
            connection.end();
        });
    })
*/
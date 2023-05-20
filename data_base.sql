CREATE TABLE clientes(
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
	email VARCHAR(100));
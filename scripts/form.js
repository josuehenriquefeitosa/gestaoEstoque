const localforage = require('localforage')
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'myApp'
})



const nome = document.getElementById('form_nome_usuario')
const telefone = document.getElementById('form_telefone_usuario')
const cpf = document.getElementById('form_cpf_usuario')
const dataNascimento = document.getElementById('form_data_nascimento_usuario')
const sexo = document.getElementById('form_sexo_usuario')
const logradouro = document.getElementById('form_logradouro_usuario')
const numero = document.getElementById('form_numero_usuario')
const complemento = document.getElementById('form_complemento_usuario')
const UF = document.getElementById('form_estado_usuario')
const cidade = document.getElementById('form_cidade_usuario')
const email = document.getElementById('form_email_usuario')

//BOTOES ACIMA DO FORMULARIO
const botaoPesquisar = document.getElementById('procurarDados')// input pesquisa ao lado do btn lupa
const botaoNovo = document.getElementById('novo')
const botaoExibirLupa = document.getElementById('exibirDados')

//BOTAO  DO FORMULARIO
const botaoSalvar = document.getElementById('salvarForm') // botao submit formulario

const formData = {
    nome: `${nome}`,
    telefone:`${telefone}`,
    email: `${email}`,
    cpf: `${cpf}`,
    dataNascimento: `${dataNascimento}`,
    sexo: `${sexo}`,
    logradouro: `${logradouro}`,
    numero: `${numero}`,
    complemento: `${complemento}`,
    estado: `${UF}`,
    cidade: `${cidade}`
  }


localforage.setItem('formData', formData)
  .then(() => console.log('Dados armazenados com sucesso'))
  .catch(err => console.error(err));



localforage.getItem('formData')
.then(data => console.log(data))
.catch(err => console.error(err));



localforage.setItem('formData',{
    ...formData,
    nome: `${nome}`,
    telefone:`${telefone}`,
    email: `${email}`,
    cpf: `${cpf}`,
    dataNascimento: `${dataNascimento}`,
    sexo: `${sexo}`,
    logradouro: `${logradouro}`,
    numero: `${numero}`,
    complemento: `${complemento}`,
    estado: `${UF}`,
    cidade: `${cidade}`
  })
    .then(() => console.log('Dados atualizados com sucesso'))
    .catch(err => console.error(err));



localforage.removeItem('formData')
.then(() => console.log('Dados excluídos com sucesso'))
.catch(err => console.error(err));








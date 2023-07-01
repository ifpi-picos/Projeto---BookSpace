const readlineSync = require("readline-sync");

let continua = true;

const biblioteca = [];

console.log(`
==========================================
Bem vindo ao gerenciador de livros
Aluna: Jhulia de Souza Leal
==========================================
`);

while (continua) {
    const pergunta = readlineSync.question(`O que deseja fazer?
1 - Cadastrar livro
2 - Listar livros
3 - Remover livro
4 - Sair\n
Digite sua opção: `);
}
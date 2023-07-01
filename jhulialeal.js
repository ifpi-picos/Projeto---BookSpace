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
    
    switch (pergunta) {
        case "1":
            const titulo = readlineSync.question("Digite o título do livro: ");
            
            const autor = readlineSync.question("Digite o autor do livro: ");
            
            const data = readlineSync.question("Digite a data de publicação do livro: ");
                
            const livro = {
                titulo,
                autor,
                data,
            };
            
            biblioteca.push(livro);
        break;

        case "4":
            continua = false;
        break;
        
        default:
            console.log("Opção inválida");
    }
}
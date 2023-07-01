let readline = require('readline')
let fs = require('fs')

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let biblioteca = []

function cadastroLivro() {
  rl.question('Digite o título do livro:', (titulo) => {
    rl.question('Digite o autor do livro:', (autor) => {
      rl.question('Digite a data de publicação (dd/mm/aaaa):', (data) => {
        let [dia, mes, ano] = data.split('/')
        let publicacao = { dia: Number(dia), mes: Number(mes), ano: Number(ano) }
        let livro = { titulo, autor, publicacao }
        biblioteca.push(livro)
        salvarBiblioteca()
        menu()
      })
    })
  })
}
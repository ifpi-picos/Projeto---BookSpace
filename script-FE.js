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

function salvarBiblioteca(){
    let json_biblioteca = JSON.stringify(biblioteca)
    fs.writeFileSync('biblioteca.txt', 'utf8')
    biblioteca = JSON.parse(data)
    console.log('Biblioteca salva com sucesso!')
}

function LoadBiblioteca(){
    try{
        let data = fs.readFileSync('biblioteca.txt', 'utf8')
        biblioteca = JSON.parse(data)
    }catch (error) {
        console.log('Falha ao carregar biblioteca.', error)
    }
}
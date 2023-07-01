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

function listarLivros(){
    if(biblioteca.length === 0){
        console.log|('Nenhum livro foi encontrado.')
        menu()
    } else {
        rl.question('Deseja ordenar os livros por : \n 1. Título \n 2.Data de publicação', (opcao) =>{
          let livrosOrdenados = []
          switch (Number(opcao)) {
            case 1:
              livrosOrdenados = biblioteca.slice().sort((a,b) => a.titulo.localeCompare(b.titulo))
              break
            case 2:
              livrosOrdenados = biblioteca.slice().sort((a,b) => {
                if(a.publicacao.ano !== b.publicacao.ano) {
                  return a.publicacao.ano - b.publicacao.ano
                }
                if(a.publicacao.mes !== b.publicacao.mes){
                  return a.publicacao.mes - b.publicacao.mes
                }
                return a.publicacao.dia - b.publicacao.dia
              })
              break
            default:
              console.log('Opção indisponível!')
              menu()
              return
          }
          for (let n = 0; n < livrosOrdenados.length; n++){
            let livro = livrosOrdenados[n]
            console.log(`Livro ${n + 1}:`)
            console.log(`Título: ${livro.titulo}`)
            console.log(`Autor: ${livro.autor}`)

            let dia = ('0' + livro.publicacao.dia).slice(-2)
            let mes = ('0' + livro.publicacao.mes).slice(-2)

            console.log(`Data de publicação: ${dia}/${mes}/${livro.publicacao.ano}`)
            console.log('***************************************')
          }
          
          menu()

        })
    }
}

function removerLivro(){
  rl.question('Digite o número do livro que você deseja remover:', (numero) =>{
    let livroEncontrado = false

    for(let i = 0; i < biblioteca.length; i++ ){
      if(i+1 === Number(numero)){
        biblioteca.splice(i, 1)
        salvarBiblioteca()
        livroEncontrado = true
        break
      }
    }
    if (livroEncontrado) {
      console.log('Livro excluído com sucesso!')
    } else {
      console.log('Livro não encontrado.')
    }
    
    menu()

  })
}

function menu(){
  console.log('Biblioteca Online:')
  console.log('1. Cadastrar Livro')
  console.log('2. Listar Livros')
  console.log('3. Remover Livro')
  console.log('0. Sair do Menu')
  rl.question('Escolha uma das opções acima: ', (opcao) =>{
    switch (Number(opcao)) {
      case 1:
        cadastroLivro()
        break
      case 2:
        listarLivros()
        break
      case 3:
        removerLivro()
        break
      case 0:
        console.log('Programa Encerrado.')
        rl.close()
        break
      default:
        console.log('Digite uma opção válida!')
        menu()
    }
  })
}

LoadBiblioteca()

menu()
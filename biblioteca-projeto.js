class Livro {
  constructor(titulo, autor, data_publicacao) {
    this.titulo = titulo;
    this.autor = autor;
    this.data_publicacao = data_publicacao;
  }

  // newDate () {
  //   const newDate = this.data_publicacao.split('-')
  //   const day = newDate[2];
  // }; 

  toString() {
    return `${this.titulo} - ${this.autor} (${this.data_publicacao})`;
  }
}

class Biblioteca {
  constructor() {
    this.livros = [];
  }

  adicionar_livro(livro) {
    this.livros.push(livro);
    salvarLivros();
  }

  remover_livro(titulo) {
    const index = this.livros.findIndex(livro => livro.titulo === titulo);
    if (index !== -1) {
      this.livros.splice(index, 1);
      salvarLivros();
      return true;
    }
    salvarLivros();
    return false;
  }

  listar_livros(ordenar = "titulo") {
    let livrosOrdenados;
  
    if (ordenar === "titulo") {
      livrosOrdenados = this.livros.slice().sort((a, b) =>
        a.titulo.localeCompare(b.titulo)
      );
    } else if (ordenar === "dataPublicacao") {
      livrosOrdenados = this.livros.slice().sort((a, b) =>
        new Date(a.data_publicacao) - new Date(b.data_publicacao)
      );
    }
  
    return livrosOrdenados;
  }  
  
  alterar_livro(titulo, novoTitulo = null, novoAutor = null, novaDataPublicacao = null) {
    const livro = this.livros.find(l => l.titulo === titulo);
    if (livro) {
      if (novoTitulo) livro.titulo = novoTitulo;
      if (novoAutor) livro.autor = novoAutor;
      if (novaDataPublicacao) livro.data_publicacao = novaDataPublicacao;
      salvarLivros();
      return true;
    }
    salvarLivros();
    return false;
  }
}

const biblioteca = new Biblioteca();

const adicionar_livro = document.getElementById("book-form");
const book_list = document.getElementById("book-list");
const selectOrdenar = document.getElementById("select-ordenar");

if (window.location.pathname === '/index.html') {
  adicionar_livro.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.target);
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const date = document.getElementById("isbn").value;

    const book = new Livro(title, author, date);
    biblioteca.adicionar_livro(book);

    // Redirecionar para a página da lista de livros
    window.location.href = "lista_livros.html";
  });
}

function atualizar_tabelas() {
  const tbody = book_list.querySelector("tbody");
  tbody.innerHTML = "";

  const livrosOrdenados = biblioteca.listar_livros();

  livrosOrdenados.forEach((livro, index) => {
    const tr = document.createElement("tr");

    const tdTitulo = document.createElement("td");
    tdTitulo.textContent = livro.titulo;
    tr.appendChild(tdTitulo);

    const tdAutor = document.createElement("td");
    tdAutor.textContent = livro.autor;
    tr.appendChild(tdAutor);

    const tdDataPublicacao = document.createElement("td");
    tdDataPublicacao.textContent = livro.data_publicacao;
    tr.appendChild(tdDataPublicacao);

    const tdAcoes = document.createElement("td");
    const btnAlterar = document.createElement("button");
    btnAlterar.textContent = "Alterar";
    btnAlterar.addEventListener("click", () => {
      const novoTitulo = prompt("Digite o novo título:", livro.titulo);
      const novoAutor = prompt("Digite o novo autor:", livro.autor);
      const novaDataPublicacao = prompt("Digite a nova data de publicação:", livro.data_publicacao);

      if (novoTitulo || novoAutor || novaDataPublicacao) {
        biblioteca.alterar_livro(livro.titulo, novoTitulo, novoAutor, novaDataPublicacao);
        atualizar_tabelas();
        salvarLivros();
      }
    });
    tdAcoes.appendChild(btnAlterar);

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener("click", () => {
      biblioteca.remover_livro(livro.titulo);
      atualizar_tabelas();
      salvarLivros();
    });
    tdAcoes.appendChild(btnRemover);

    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
  });
}


function salvarLivros() {
  console.log(biblioteca.livros)
  const livrosJSON = JSON.stringify(biblioteca.livros);
  localStorage.setItem('livros', livrosJSON);
}

function carregarLivros() {
  const livrosJSON = localStorage.getItem('livros');
  if (livrosJSON) {
    const livrosArray = JSON.parse(livrosJSON);
    biblioteca.livros = livrosArray;
  }
}
carregarLivros();

if (window.location.pathname === '/lista_livros.html') {
  atualizar_tabelas();
}

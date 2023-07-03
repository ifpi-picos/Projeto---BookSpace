class Livro {
  constructor(titulo, autor, data_publicacao) {
    this.titulo = titulo;
    this.autor = autor;
    this.data_publicacao = data_publicacao;
  }

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
  }

  remover_livro(titulo) {
    const index = this.livros.findIndex(livro => livro.titulo === titulo);
    if (index !== -1) {
      this.livros.splice(index, 1);
      return true;
    }
    return false;
  }

  listar_livros(ordenar = "titulo") {
    const livrosOrdenados = this.livros.slice().sort((a, b) => {
      if (ordenar === "titulo") {
        return a.titulo.localeCompare(b.titulo);
      } else if (ordenar === "dataPublicacao") {
        return new Date(a.data_publicacao) - new Date(b.data_publicacao);
      }
    });

    livrosOrdenados.forEach(livro => console.log(livro.toString()));
  }

  alterar_livro(titulo, novoTitulo = null, novoAutor = null, novaDataPublicacao = null) {
    const livro = this.livros.find(l => l.titulo === titulo);
    if (livro) {
      if (novoTitulo) livro.titulo = novoTitulo;
      if (novoAutor) livro.autor = novoAutor;
      if (novaDataPublicacao) livro.data_publicacao = novaDataPublicacao;
      return true;
    }
    return false;
  }
}

const biblioteca = new Biblioteca();

const adicionar_livro = document.getElementById("form-adicionar-livro");
const book_list = document.getElementById("book-list");
const selectOrdenar = document.getElementById("select-ordenar");

adicionar_livro.addEventListener("submit", (event) => {
  event.preventDefault();

  const titulo = event.target.titulo.value;
  const autor = event.target.autor.value;
  const dataPublicacao = event.target.dataPublicacao.value;

  const livro = new Livro(titulo, autor, dataPublicacao);
  biblioteca.adicionar_livro(livro);
  atualizar_tabelas();
  salvarLivros();

  event.target.reset();
});

selectOrdenar.addEventListener("change", () => {
  const ordenar = selectOrdenar.value;
  biblioteca.listar_livros(ordenar);
});

function atualizar_tabelas() {
  const tbody = book_list.querySelector("tbody");
  tbody.innerHTML = "";

  biblioteca.livros.forEach((livro, index) => {
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
atualizar_tabela();

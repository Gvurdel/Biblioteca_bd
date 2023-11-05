const livros = [
{ 
    "id": 1,
    "nome": "livro 1",
    "autor": "autor 1"

},
{ 
    "id": 2,
    "nome": "livro 2",
    "autor": "autor 2"

},
{
    "id": 3,
    "nome": "livro 3",
    "autor": "autor 3"

},

{ 
    "id": 4,
    "nome": "livro 4",
    "autor": "autor 4"

}

];

let idGerador = 1;

    function geraId() {
        return idGerador++;
    }

    function adicionarLivro(livro) {
        livro.id = geraId();
        livros.push(livro);
    }

    function listarLivros() {
    return livros;
    }

    function buscarLivroPorId(id) {
    return livros.find(livro => livro.id === id);
    }

    function atualizarLivro(id, livro) {
        for(let ind in livros) {
            if(livros[ind].id === id) {
                livros[ind] = livro;
                livros[ind].id = id;
                return;
            }
        }
    }

    function deletarLivro(id) {
    const index = livros.findIndex(livro => livro.id === id);
    if (index !== -1) {
        const livroDeletado = livros.splice(index, 1)[0];
        return livroDeletado;
    }
    return null;
    }

module.exports = {
    geraId,
    adicionarLivro,
    listarLivros,
    buscarLivroPorId,
    atualizarLivro,
    deletarLivro,
};

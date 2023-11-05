const livroRepository = require('../Repository/livros_repository')

function listarLivros() {
    return livroRepository.listarLivros();
}

function adicionarLivro(livro) {
    if(livro && livro.nome && livro.autor) {// livro != undefined
        livroRepository.adicionarLivro(livro);
    }
    else {
        throw {id:400, message:"Livro não possui nome ou autor"};
    }
}

function buscarLivroPorId(id) {
    const livro = livroRepository.buscarLivroPorId(id);
    if(livro) {
        return livro;
    }
    else {
        throw {id:404, message:"Livro não encontrado"};
    }
}

function atualizarLivro(id, livroAtualizado) {
    const livro = livroRepository.buscarLivroPorId(id);
    if(!livro) {
        throw {id: 404, message: "Livro não encontrado"};
    }
    
    if(livroAtualizado && livroAtualizado.nome && livroAtualizado.autor){
        livroRepository.atualizarLivro(id, livroAtualizado);
    }
    else {
        throw {id: 400, message: "Livro não possui um dos campos obrigatórios"};
    }
}

function deletarLivro(id) {
    const livroDeletado = livroRepository.deletarLivro(id);
    if(livroDeletado){
        return livroDeletado;
    }
    else {
        throw {id: 404, message: "Livro não encontrado"};
    }
}

module.exports = {
    listarLivros,
    adicionarLivro,
    buscarLivroPorId,
    atualizarLivro,
    deletarLivro
}
const livroRepository = require('../Repository/livros_repository')

async function listarLivros() {
    return await livroRepository.listarLivros();
}

async function adicionarLivro(livro) {
    if(livro && livro.nome && livro.autor) {
        return await livroRepository.adicionarLivro(livro);
    }
    else {
        throw {id:400, message:"Livro não possui nome ou autor"};
    }
}

async function buscarLivroPorId(id) {
    const livro = await livroRepository.buscarLivroPorId(id);
    if(livro) {
        return livro;
    }
    else {
        throw {id:404, message:"Livro não encontrado"};
    }
}

async function atualizarLivro(id, livroAtualizado) {
    const livro = await livroRepository.buscarLivroPorId(id);
    if(!livro) {
        throw {id: 404, message: "Livro não encontrado"};
    }
    
    if(livroAtualizado && livroAtualizado.nome && livroAtualizado.autor){
        return await livroRepository.atualizarLivro(id, livroAtualizado);
    }
    else {
        throw {id: 400, message: "Livro não possui um dos campos obrigatórios"};
    }
}

async function deletarLivro(id) {
    const livroDeletado = await livroRepository.deletarLivro(id);
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
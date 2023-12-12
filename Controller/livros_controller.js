const livroService = require('../Service/livros_service')


function listarLivros(req, res) {
    const listaLivros = livroService.listarLivros();
    res.json(listaLivros);
}

function adicionarLivro(req, res) {
    let livro = req.body;
    try {
        livroService.adicionarLivro(livro);
        res.status(201).json({msg:'Cadastro realizado com sucesso!'})
    }
    catch(err) {

        res.status(400).json({msg: err.message});
    }
}

function buscarLivroPorId(req, res) {
    const id = +req.params.id;
    try {
        const liv = livroService.buscarLivroPorId(id);
        res.json(liv);
    }
    catch(err) {

        res.status(404).json({msg: err.message});
    }
}

function atualizarLivro(req, res) {
    const id = +req.params.id;
    let livro = req.body;

    try{ 
        livroService.atualizarLivro(id, livro);
        res.status(200).json({msg:'Cadastro atualizado com sucesso!'});
    }
    catch(err) {
        res.status(400).json({msg: err.message});
    }
}

function deletarLivro(req, res) {
    const id = +req.params.id;
    try{ 
        const livroDeletado = livroService.deletarLivro(id);
        res.json(livroDeletado);
    }
    catch(err) {
        res.status(err.id).json({msg: err.message});
    }   
}

module.exports = {
    adicionarLivro,
    listarLivros,
    buscarLivroPorId,
    atualizarLivro,
    deletarLivro,
};
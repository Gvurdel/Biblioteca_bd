const livroService = require('../Service/livros_service')


async function listarLivros(req, res) {
    const listaLivros = await livroService.listarLivros();
    res.json(listaLivros);
}

async function adicionarLivro(req, res) {
    let livro = req.body;
    try {
        await livroService.adicionarLivro(livro);
        res.status(201).json({msg:'Cadastro realizado com sucesso!'})
    }
    catch(err) {

        res.status(400).json({msg: err.message});
    }
}

async function buscarLivroPorId(req, res) {
    const id = +req.params.id;
    try {
        const liv = await livroService.buscarLivroPorId(id);
        res.json(liv);
    }
    catch(err) {

        res.status(404).json({msg: err.message});
    }
}

async function atualizarLivro(req, res) {
    const id = +req.params.id;
    let livro = req.body;

    try{ 
        await livroService.atualizarLivro(id, livro);
        res.status(200).json({msg:'Cadastro atualizado com sucesso!'});
    }
    catch(err) {
        res.status(400).json({msg: err.message});
    }
}

async function deletarLivro(req, res) {
    const id = +req.params.id;
    try{ 
        const livroDeletado = await livroService.deletarLivro(id);
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
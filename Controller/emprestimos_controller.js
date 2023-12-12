const emprestimosService = require('../Service/emprestimos_service')

async function registrarRetirada(req, res) {
    try {
        const { idLivro, idCliente } = req.body;
        const resultado = await emprestimosService.registrarRetirada(idLivro, idCliente);
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

async function registrarDevolucao(req, res) {
    try {
        const { idLivro, idCliente } = req.body;
        const resultado = await emprestimosService.registrarDevolucao(idLivro, idCliente);
        res.status(200).json(resultado);
    } catch (erro) {
        res.status(400).json({ mensagem: erro.message });
    }
}

module.exports = {
    registrarRetirada,
    registrarDevolucao,
};



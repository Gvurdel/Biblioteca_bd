const clienteService = require('../Service/clientes_service')


function listarClientes(req, res) {
    const listaClientes = clienteService.listarClientes();
    res.json(listaClientes);
}

function adicionarCliente(req, res) {
    let cliente = req.body;
    try {
        clienteService.adicionarCliente(cliente);
        res.status(201).json({msg:'Cadastro realizado com sucesso!'})
    }
    catch(err) {
    
        res.status(400).json({msg: err.message});
    }
}

function buscarClientePorId(req, res) {
    const id = +req.params.id;
    try {
        const cli = clienteService.buscarClientePorId(id);
        res.json(cli);
    }
    catch(err) {
    
        res.status(404).json({msg: err.message});
    }
}

function atualizarCliente (req, res) {
    const id = +req.params.id;
    let cliente = req.body;

    try{ 
        clienteService.atualizarCliente(id, cliente);
        res.json({msg:'Cadastro atualizado com sucesso!'});
    }
    catch(err) {
        res.status(404).json({msg: err.message});
    }
}

function deletarCliente(req, res) {
    const id = +req.params.id;
    try{ 
        const clienteDeletado = clienteService.deletarCliente(id);
        res.json({msg:'Cadastro deletado com sucesso!'});
    }
    catch(err) {
        res.status(400).json({msg: err.message});
    }   
}

module.exports = {
    listarClientes,
    adicionarCliente,
    buscarClientePorId,
    atualizarCliente,
    deletarCliente
}
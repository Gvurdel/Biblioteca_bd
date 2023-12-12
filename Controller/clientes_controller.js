const clienteService = require('../Service/clientes_service')


async function listarClientes(req, res) {
    const listaClientes = await clienteService.listarClientes();
    res.json(listaClientes);
}

async function adicionarCliente(req, res) {
    let cliente = req.body;
    try {
        await clienteService.adicionarCliente(cliente);
        res.status(201).json({msg:'Cadastro realizado com sucesso!'})
    }
    catch(err) {
    
        res.status(400).json({msg: err.message});
    }
}

async function buscarClientePorId(req, res) {
    const id = +req.params.id;
    try {
        const cli = await clienteService.buscarClientePorId(id);
        res.json(cli);
    }
    catch(err) {
    
        res.status(404).json({msg: err.message});
    }
}

async function atualizarCliente (req, res) {
    const id = +req.params.id;
    let cliente = req.body;

    try{ 
        await clienteService.atualizarCliente(id, cliente);
        res.status(200).json({msg:'Cadastro atualizado com sucesso!'});
    }
    catch(err) {
        res.status(404).json({msg: err.message});
    }
}

async function deletarCliente(req, res) {
    const id = +req.params.id;
    try{ 
        await clienteService.deletarCliente(id);
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
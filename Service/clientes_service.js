const clienteRepository = require('../Repository/clientes_repository')

async function listarClientes() {
    return await clienteRepository.listarClientes();
}

async function adicionarCliente(cliente) {
    if(cliente && cliente.nome && cliente.telefone) {
        return await clienteRepository.adicionarCliente(cliente);
    }
    else {
        throw {id:400, message:"Cliente não possui nome ou telefone"};
    }
}

async function buscarClientePorId(id) {
    const cliente = await clienteRepository.buscarClientePorId(id);
    if(cliente) {
        return cliente;
    }
    else {
        throw {id:404, message:"Cliente não encontrado"};
    }
}

async function atualizarCliente(id, clienteAtualizado) {
    if (clienteAtualizado && clienteAtualizado.nome && clienteAtualizado.telefone) {
        const cliente = await clienteRepository.atualizarCliente(id, clienteAtualizado);
        if (!cliente) {
            throw { id: 404, message: "Cliente não encontrado" };
        }
        return cliente;
    } else {
        throw { id: 400, message: "Cliente não possui um dos campos obrigatórios" };
    }
}


async function deletarCliente(id) {
    const clienteDeletado = await clienteRepository.deletarCliente(id);
    if(clienteDeletado){
        return clienteDeletado;
    }
    else {
        throw {id: 404, message: "Cliente não encontrado"};
    }
}

module.exports = {
    listarClientes,
    adicionarCliente,
    buscarClientePorId,
    atualizarCliente,
    deletarCliente
}
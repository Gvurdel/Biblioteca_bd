const clienteRepository = require('../Repository/clientes_repository')

function listarClientes() {
    return clienteRepository.listarClientes();
}

function adicionarCliente(cliente) {
    if(cliente && cliente.nome && cliente.telefone) {
        clienteRepository.adicionarCliente(cliente);
    }
    else {
        throw {id:400, message:"Cliente não possui nome ou telefone"};
    }
}

function buscarClientePorId(id) {
    const cliente = clienteRepository.buscarClientePorId(id);
    if(cliente) {
        return cliente;
    }
    else {
        throw {id:404, message:"Cliente não encontrado"};
    }
}

function atualizarCliente(id, clienteAtualizado) {
    const cliente = clienteRepository.atualizarCliente(id);
    if(!cliente) {
        throw {id: 404, message: "Cliente não encontrado"};
    }
    
    if(clienteAtualizado && clienteAtualizado.nome && clienteAtualizado.telefone){
        clienteRepository.atualizarCliente(id, clienteAtualizado);
    }
    else {
        throw {id: 400, message: "Cliente não possui um dos campos obrigatórios"};
    }
}

function deletarCliente(id) {
    const clienteDeletado = clienteRepository.deletarCliente(id);
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
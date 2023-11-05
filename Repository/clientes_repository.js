const clientes = [
    { 
        
        "id": 1,
        "nome": "Cliente 1",
        "telefone": "11116666"
        },
        
        {
            "id": 2 ,
            "nome": "Cliente 2",
            "telefone": "888888888"
        },
        {
            "id": 3,
            "nome": "Cliente 3",
            "telefone": "777777777"
        },
        {
            "id": 4,
            "nome": "Cliente 4",
            "telefone": "111111111"
        }
        ];

let idGerador = 1;

    function geraId() {
        return idGerador++;
    }

    function adicionarCliente(cliente) {
        cliente.id = geraId();
        clientes.push(cliente);
    }

    function listarClientes() {
    return clientes;
    }

    function buscarClientePorId(id) {
    return clientes.find(cliente => cliente.id === id);
    }

    function atualizarCliente(id, novoCliente) {
    const index = clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
        clientes[index] = { ...novoCliente, id };
        return clientes[index];
    }
    return null;
    }

    function deletarCliente(id) {
    const index = clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
        const clienteDeletado = clientes.splice(index, 1)[0];
        return clienteDeletado;
    }
    return null;
    }

module.exports = {
    geraId,
    adicionarCliente,
    listarClientes,
    buscarClientePorId,
    atualizarCliente,
    deletarCliente,
};

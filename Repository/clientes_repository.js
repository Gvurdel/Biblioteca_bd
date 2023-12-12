const {Client} = require('pg');

const conexao = {
    host: "localhost",
    port: 5432,
    database: "Biblioteca",
    user: "postgres",
    password: "123456"

}
async function adicionarCliente(cliente) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query(
        "INSERT INTO clientes(nome, telefone) VALUES ($1, $2) RETURNING *",
        [cliente.nome, cliente.telefone]
    );
    const clienteInserido = result.rows[0];
    await client.end();
    return clienteInserido;
}

async function listarClientes() {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM clientes");
    const listaCli = result.rows;
    await client.end();
    return listaCli;
    
}

async function buscarClientePorId(id) {
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query('SELECT * FROM clientes WHERE id=$1',[id]);
    const cliente = res.rows[0];
    await client.end();
    return cliente;

}

async function atualizarCliente(id, novoCliente) {
    const sql = 'UPDATE clientes set nome=$1, telefone=$2 WHERE id=$3 RETURNING *'
    const values = [novoCliente.nome, novoCliente.telefone, id];
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const clienteAtualizado = res.rows[0];
    await client.end();
    return clienteAtualizado;    

}

async function deletarCliente(id) {
    const sql = 'DELETE FROM clientes WHERE id=$1 RETURNING *'
    const values = [id];

    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const clienteDeletado = res.rows[0];
    await client.end();
    return clienteDeletado;

}

async function atualizarLivrosEmprestados(id, livrosEmprestados) {
    const client = new Client(conexao);

    try {
        await client.connect();

        // Obter o cliente atual do banco de dados
        const clienteAtual = await client.query('SELECT * FROM clientes WHERE id = $1', [id]);

        if (clienteAtual.rows.length === 0) {
            console.error("Cliente não encontrado.");
            return null;
        }

        // Adicionar ou subtrair os livros emprestados
        const livrosAntigos = clienteAtual.rows[0].livros_emprestados || 0;
        const livrosTotais = livrosAntigos + livrosEmprestados;

        // Atualizar a quantidade de livros emprestados do cliente
        const result = await client.query('UPDATE clientes SET livros_emprestados = $1 WHERE id = $2 RETURNING *', [livrosTotais, id]);

        const clienteAtualizado = result.rows[0];
        return clienteAtualizado;
    } catch (error) {
        console.error("Erro ao atualizar livros emprestados:", error);
        return null;
    } finally {
        await client.end();
    }
}



module.exports = {
    adicionarCliente,
    listarClientes,
    buscarClientePorId,
    atualizarCliente,
    deletarCliente,
    atualizarLivrosEmprestados
};

const {Client} = require('pg');

const conexao = {
    host: "localhost",
    port: 5432,
    database: "Biblioteca",
    user: "postgres",
    password: "123456"

}


async function adicionarEmprestimo(emprestimo) {
    const client = new Client(conexao);
    await client.connect();

    try {
        // Adiciona empréstimo
        const result = await client.query(
            'INSERT INTO emprestimos (id_livro, id_cliente, data_emprestimo) ' +
            'VALUES ($1, $2, CURRENT_DATE) RETURNING id_emprestimo',
            [emprestimo.idLivro, emprestimo.idCliente]
        );

        const emprestimoInserido = result.rows[0];

        // Atualiza a contagem de livros emprestados pelo cliente
        await client.query(
            'UPDATE clientes SET livros_emprestados = livros_emprestados + 1 WHERE id = $1',
            [emprestimo.idCliente]
        );

        return emprestimoInserido;
    } finally {
        await client.end();
    }
}


async function buscarEmprestimoPorIdLivroECliente(idLivro, idCliente) {
    const client = new Client(conexao);
    await client.connect();

    try {
        const query = 'SELECT * FROM emprestimos WHERE id_livro = $1 AND id_cliente = $2';
        const values = [idLivro, idCliente];
        const result = await client.query(query, values);

        return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
        await client.end();
    }
}


async function buscarEmprestimoPorIdLivro(idLivro) {
    const client = new Client(conexao);
    await client.connect();

    try {
        const query = 'SELECT * FROM emprestimos WHERE id_livro = $1';
        const values = [idLivro];
        const result = await client.query(query, values);

        return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
        await client.end();
    }
}


async function removerEmprestimo(emprestimo) {
    const client = new Client(conexao);
    await client.connect();

    try {
        if (!emprestimo || !emprestimo.id_emprestimo) {
            throw new Error("ID do empréstimo é obrigatório para remover.");
        }

        const query = 'DELETE FROM emprestimos WHERE id_emprestimo = $1';
        const values = [emprestimo.id_emprestimo];
        await client.query(query, values);
    } finally {
        await client.end();
    }
}



module.exports = {

    adicionarEmprestimo,
    buscarEmprestimoPorIdLivroECliente,
    buscarEmprestimoPorIdLivro,
    removerEmprestimo,
};

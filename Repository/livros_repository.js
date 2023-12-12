const {Client} = require('pg');

const conexao = {
    host: "localhost",
    port: 5432,
    database: "Biblioteca",
    user: "postgres",
    password: "123456"

}

async function adicionarLivro(livro) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query(
        "INSERT INTO livros(nome, autor) VALUES ($1, $2) RETURNING *",
        [livro.nome, livro.autor]
    );
    const livroInserido = result.rows[0];
    await client.end();
    return livroInserido;
}


async function listarLivros() {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM livros");
    const listalivros = result.rows;
    await client.end();
    return listalivros;
    }

async function buscarLivroPorId(id) {
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query('SELECT * FROM livros WHERE id=$1',[id]);
    const livro = res.rows[0];
    await client.end();
    return livro;
    }

async function atualizarLivro(id, novoLivro) {
    const sql = 'UPDATE livros set nome=$1, autor=$2 WHERE id=$3 RETURNING *'
    const values = [novoLivro.nome, novoLivro.autor, id];
    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const livroAtualizado = res.rows[0];
    await client.end();
    return livroAtualizado;
}

async function deletarLivro(id) {
    const sql = 'DELETE FROM livros WHERE id=$1 RETURNING *'
    const values = [id];

    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const livroDeletado = res.rows[0];
    await client.end();
    return livroDeletado;

    }

module.exports = {
    adicionarLivro,
    listarLivros,
    buscarLivroPorId,
    atualizarLivro,
    deletarLivro,
};

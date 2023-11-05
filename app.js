const express = require('express')
const clienteRouter = require('./Router/clientes_router');
const livroRouter = require('./Router/livros_router');
const emprestimosRouter = require('./Router/emprestimos_router');


const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Bem vindo à Biblioteca!</h1>')
})
app.use('/api/emprestimos', emprestimosRouter);
app.use('/api/clientes', clienteRouter);
app.use('/api/livros', livroRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const router = express.Router()
const livrosController = require('../Controller/livros_controller')

//router: /api/livros
router.get('/', livrosController.listarLivros);
router.post('/', livrosController.adicionarLivro);
router.get('/:id', livrosController.buscarLivroPorId);
router.put('/:id', livrosController.atualizarLivro);
router.delete('/:id', livrosController.deletarLivro);

module.exports = router;
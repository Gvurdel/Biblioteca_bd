const express = require('express');
const router = express.Router()
const emprestimosController = require('../Controller/emprestimos_controller')

router.post('/retiradas', emprestimosController.registrarRetirada);
router.post('/devolucao', emprestimosController.registrarDevolucao);

module.exports = router;

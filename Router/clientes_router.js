const express = require('express')
const router = express.Router()
const clienteController = require('../Controller/clientes_controller')

//router: /api/clientes
router.get('/', clienteController.listarClientes);
router.post('/', clienteController.adicionarCliente);
router.get('/:id', clienteController.buscarClientePorId);
router.put('/:id', clienteController.atualizarCliente);
router.delete('/:id', clienteController.deletarCliente);

module.exports = router;
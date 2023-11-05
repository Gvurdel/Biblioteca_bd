const livroRepository = require('../Repository/livros_repository');
const clienteRepository = require('../Repository/clientes_repository');
const emprestimosRepository = require('../Repository/emprestimos_repository');

function registrarRetirada(idLivro, idCliente) {
  const livro = livroRepository.buscarLivroPorId(idLivro);
  const cliente = clienteRepository.buscarClientePorId(idCliente);

  if (!livro || !cliente) {
    throw new Error("Livro ou cliente não encontrado.");
  }

  const emprestimoExistente = emprestimosRepository.buscarEmprestimoPorIdLivroECliente(idLivro, idCliente);
  if (emprestimoExistente) {
    throw new Error("Este livro já está emprestado a este cliente.");
  }

  const emprestimosDoLivro = emprestimosRepository.buscarEmprestimoPorIdLivro(idLivro);

  if (emprestimosDoLivro) {
    if (emprestimosDoLivro.idCliente !== idCliente) {
      throw new Error("Este livro já está emprestado a outro cliente.");
    }
  }

  if (!cliente.livrosEmprestados) {
    cliente.livrosEmprestados = [];
  }

  if (cliente.livrosEmprestados.length >= 3) {
    throw new Error("O cliente já retirou 3 livros.");
  }

  emprestimosRepository.adicionarEmprestimo({ idLivro, idCliente, data: new Date() });
  cliente.livrosEmprestados.push(livro);

  return "Retirada registrada com sucesso.";
}









function registrarDevolucao(idLivro, idCliente) {
  const livro = livroRepository.buscarLivroPorId(idLivro);
  const cliente = clienteRepository.buscarClientePorId(idCliente);

  if (!livro || !cliente) {
    throw new Error("Livro ou cliente não encontrado.");
  }

  const emprestimo = emprestimosRepository.buscarEmprestimoPorIdLivroECliente(idLivro, idCliente);
  if (!emprestimo) {
    throw new Error("Nenhum registro de retirada encontrado.");
  }

  const dataAtual = new Date();
  const dataPrevistaDevolucao = new Date(emprestimo.data);
  dataPrevistaDevolucao.setDate(dataPrevistaDevolucao.getDate() + 1); 
  let diasEmAtraso = 0;
  if (dataAtual > dataPrevistaDevolucao) {
    diasEmAtraso = Math.floor((dataAtual - dataPrevistaDevolucao) / (1000 * 60 * 60 * 24));
  }

  emprestimosRepository.removerEmprestimo(emprestimo);

  if (cliente.livrosEmprestados) {
    cliente.livrosEmprestados = cliente.livrosEmprestados.filter((livroEmprestado) => livroEmprestado.id !== idLivro);
  }

  return `Devolução registrada com sucesso. Dias em atraso: ${diasEmAtraso}`;
}

module.exports = {
  registrarRetirada,
  registrarDevolucao,
};

const livroRepository = require('../Repository/livros_repository');
const clienteRepository = require('../Repository/clientes_repository');
const emprestimosRepository = require('../Repository/emprestimos_repository');

async function registrarRetirada(idLivro, idCliente) {
  const livro = await livroRepository.buscarLivroPorId(idLivro);
  const cliente = await clienteRepository.buscarClientePorId(idCliente);

  if (!livro || !cliente) {
    throw new Error("Livro ou cliente não encontrado.");
  }

  const emprestimoExistente = await emprestimosRepository.buscarEmprestimoPorIdLivroECliente(idLivro, idCliente);
  if (emprestimoExistente) {
    throw new Error("Este livro já está emprestado a este cliente.");
  }

  const emprestimosDoLivro = await emprestimosRepository.buscarEmprestimoPorIdLivro(idLivro);

  if (emprestimosDoLivro && emprestimosDoLivro.length > 0) {
    const livroJaEmprestado = emprestimosDoLivro.some((emprestimo) => emprestimo.idCliente !== idCliente);
    if (livroJaEmprestado) {
      throw new Error("Este livro já está emprestado a outro cliente.");
    }
  }

  cliente.livrosEmprestados = cliente.livrosEmprestados || [];

  if (cliente.livrosEmprestados.length >= 3) {
    throw new Error("O cliente já atingiu o limite de 3 livros emprestados.");
  }

  await emprestimosRepository.adicionarEmprestimo({ idLivro, idCliente, data: new Date() });
  await clienteRepository.atualizarLivrosEmprestados(idCliente, cliente.livrosEmprestados.length + 1);

  return "Retirada registrada com sucesso.";
}



async function registrarDevolucao(idLivro, idCliente) {
    const livro = await livroRepository.buscarLivroPorId(idLivro);
    const cliente = await clienteRepository.buscarClientePorId(idCliente);

    if (!livro || !cliente) {
      throw new Error("Livro ou cliente não encontrado.");
    }

    const emprestimo = await emprestimosRepository.buscarEmprestimoPorIdLivroECliente(idLivro, idCliente);
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

    await emprestimosRepository.removerEmprestimo(emprestimo);

    if (cliente.livrosEmprestados) {
      cliente.livrosEmprestados = await cliente.livrosEmprestados.filter((livroEmprestado) => livroEmprestado.id !== idLivro);
    }

    return `Devolução registrada com sucesso. Dias em atraso: ${diasEmAtraso}`;
  }

module.exports = {
  registrarRetirada,
  registrarDevolucao,
};

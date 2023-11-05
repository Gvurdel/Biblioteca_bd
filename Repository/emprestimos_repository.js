const emprestimos = [];

function listarEmprestimos() {
    return emprestimos;
}

function adicionarEmprestimo(emprestimo) {
    emprestimos.push(emprestimo);
}

function buscarEmprestimoPorIdLivroECliente(idLivro, idCliente) {
    return emprestimos.find((emprestimo) => emprestimo.idLivro === idLivro && emprestimo.idCliente === idCliente);
}

function buscarEmprestimoPorIdLivro(idLivro) {

    return emprestimos.find((emprestimo) => emprestimo.idLivro === idLivro);

}
function removerEmprestimo(emprestimo) {
    const index = emprestimos.indexOf(emprestimo);
    if (index !== -1) {
    emprestimos.splice(index, 1);
    }
}


module.exports = {
    listarEmprestimos,
    adicionarEmprestimo,
    buscarEmprestimoPorIdLivroECliente,
    buscarEmprestimoPorIdLivro,
    removerEmprestimo,
};

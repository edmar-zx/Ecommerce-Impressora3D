import { Produto } from "@/types/product";

export function validateProduct(produto: Produto) {
    const isEmpty = (value: any) => value === "" || value === null || value === undefined;

    // Verifica campos obrigatórios
    if (
        !produto.nome ||
        !produto.descricao ||
        !produto.categoria ||
        !produto.material ||
        !produto.cor ||
        !produto.acabamento ||
        !produto.peso ||
        !produto.dimensoes?.altura ||
        !produto.dimensoes?.largura ||
        !produto.dimensoes?.profundidade ||
        !produto.preco ||
        isEmpty(produto.desconto) ||
        isEmpty(produto.estoque) ||
        !produto.tempoEstimadoProducao
    ) {
        return false;
    }

    return true;
}

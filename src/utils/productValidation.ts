import { Produto } from "@/types/product";

export function validateProduct(produto: Produto) {

    // Adicionar validao com zod
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
        !produto.desconto ||
        !produto.estoque ||
        !produto.tempoEstimadoProducao
    ) {
        return false;
    }

    return true;
}

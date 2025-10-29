import { Produto } from "@/types/product";

// Na sua função validateProduct, ajuste para:
export function validateProduct(produto: Produto) {
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
        produto.desconto === undefined || // pode ser 0
        produto.estoque === undefined || // pode ser 0
        !produto.tempoEstimadoProducao ||
        !produto.imagem || // pode ser string vazia ou File
        !produto.destaque === undefined
    ) {
        return false;
    }

    return true;
}

import { Produto } from "@/types/product";

export function validateProduct(produto: Produto) {
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
        produto.desconto === undefined || 
        produto.estoque === undefined || 
        !produto.tempoEstimadoProducao ||
        !produto.imagem ||
        !produto.destaque === undefined
    ) {
        return false;
    }

    return true;
}

import { Produto } from "@/types/product";

export function validateProduct(produto: Produto) {
    // Permite imagem como string (URL) ou File (no client)
    const hasImage =
        (typeof produto.imagem === "string" && produto.imagem.trim() !== "") ||
        (typeof produto.imagem === "object" && "name" in produto.imagem);

    if (
        !produto.nome ||
        !produto.descricao ||
        !produto.categoria ||
        !produto.material ||
        !produto.cor ||
        !produto.acabamento ||
        produto.peso === undefined ||
        produto.dimensoes?.altura === undefined ||
        produto.dimensoes?.largura === undefined ||
        produto.dimensoes?.profundidade === undefined ||
        produto.preco === undefined ||
        produto.desconto === undefined ||
        produto.estoque === undefined ||
        !produto.tempoEstimadoProducao ||
        !hasImage
    ) {
        return false;
    }
    return true;
}

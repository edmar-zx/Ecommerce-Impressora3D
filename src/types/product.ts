export interface Produto {
    _id?: string;
    nome: string;
    descricao: string;
    categoria: string;
    imagem: string | File;
    material: string;
    cor: string;
    acabamento: string;
    peso: number;
    dimensoes: { largura: number; altura: number; profundidade: number };
    preco: number;
    desconto: number;
    estoque: number;
    tempoEstimadoProducao: string;
    createAt?: string | Date;
    destaque: boolean
}

export interface Produto {
    _id?: string;
    nome: string;
    descricao: string;
    categoria: string;
    /* imagens?: string[];  */// tratar depois
    material: string;
    cor: string; 
    acabamento: string; // liso, polido, pintado, etc.
    peso: number;
    dimensoes: { largura: number; altura: number; profundidade: number }; // em mm
    preco: number; 
    desconto: number; 
    estoque: number; // quantidade disponível
    tempoEstimadoProducao: string; //
    /* tags?: string[]; */ // Adicionar depois tags de busca
    createAt?: string | Date;
}


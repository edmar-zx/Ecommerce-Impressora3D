export interface Produto { 
  _id?: string;
  nome: string;
  descricao: string;
  categoria: string;
  imagem: string | File;  // File no front para upload, string depois de salvar
  material: string;
  cor: string;
  acabamento: string;
  peso: number;
  dimensoes: { largura: number; altura: number; profundidade: number };
  preco: number;
  desconto: number;
  estoque: number;
  tempoEstimadoProducao: string;
  createAt?: Date;  // backend salva como Date
}

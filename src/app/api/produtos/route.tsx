import { NextRequest, NextResponse } from "next/server";
import { getProdutosCollection } from "./mongodb";
import { ObjectId } from "mongodb";
import { Produto } from "@/types/product";
import { validateProduct } from "@/utils/productValidation";
import { put, del } from '@vercel/blob';

// Tipagem do FormData recebido
interface FormDataBody {
  nome?: string;
  descricao?: string;
  categoria?: string;
  material?: string;
  cor?: string;
  acabamento?: string;
  peso?: string;
  preco?: string;
  desconto?: string;
  estoque?: string;
  tempoEstimadoProducao?: string;
  dimensoes?: string;
  imagem?: File;
  id?: string;
}

// Salvar arquivo no Vercel Blob
async function saveFileToBlob(file: File): Promise<string> {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const extMatch = file.name.match(/\.[0-9a-zA-Z]+$/);
  const ext = extMatch ? extMatch[0] : '';
  const filename = `products/imagem-${uniqueSuffix}${ext}`;

  const blobResult = await put(filename, file, { access: 'public' });
  const blobTyped = blobResult as { url?: string; key?: string };

  if (blobTyped.url) return blobTyped.url;
  if (blobTyped.key) return blobTyped.key;
  return filename;
}

// Deletar arquivo do Blob
async function deleteBlobByUrl(urlOrKey: string) {
  try {
    await del([urlOrKey]);
  } catch (err) {
    console.warn('Erro ao deletar blob (possivelmente não encontrado):', err);
  }
}

// Processa FormData do NextRequest
async function processFormData(request: NextRequest) {
  const formData = await request.formData();
  const body: Record<string, string> = {};
  const files: { [key: string]: File } = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      files[key] = value;
    } else {
      body[key] = value.toString();
    }
  }

  return { body, files };
}

export async function GET() {
  try {
    const collection = await getProdutosCollection();
    const produtos = await collection.find().toArray();
    return NextResponse.json(produtos);
  } catch (err) {
    console.error('Erro no GET:', err);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { body, files } = await processFormData(req);
    const collection = await getProdutosCollection();

    let imagemUrl = '';
    if (files.imagem) {
      imagemUrl = await saveFileToBlob(files.imagem);
    }

    const dimensoes: Produto['dimensoes'] = body.dimensoes
      ? JSON.parse(body.dimensoes) as Produto['dimensoes']
      : { largura: 0, altura: 0, profundidade: 0 };

    const produto: Omit<Produto, '_id'> = {
      nome: body.nome || '',
      descricao: body.descricao || '',
      categoria: body.categoria || '',
      material: body.material || '',
      cor: body.cor || '',
      acabamento: body.acabamento || '',
      peso: Number(body.peso) || 0,
      dimensoes,
      preco: Number(body.preco) || 0,
      desconto: Number(body.desconto) || 0,
      estoque: Number(body.estoque) || 0,
      tempoEstimadoProducao: body.tempoEstimadoProducao || '',
      imagem: imagemUrl,
      createAt: new Date(),
    };

    if (!validateProduct(produto as Produto)) {
      return NextResponse.json({ error: "Campos obrigatórios incompletos" }, { status: 400 });
    }

    const resposta = await collection.insertOne(produto);
    return NextResponse.json({ message: "Produto adicionado", id: resposta.insertedId }, { status: 201 });
  } catch (err) {
    console.error("Erro no POST", err);
    return NextResponse.json({ error: "Erro ao adicionar produto" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { body, files } = await processFormData(req);
    const collection = await getProdutosCollection();

    const id = body.id;
    if (!id) {
      return NextResponse.json({ error: 'Informe o ID do produto que deseja editar' }, { status: 400 });
    }

    const produtoAtual = await collection.findOne({ _id: new ObjectId(id) });
    if (!produtoAtual) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    let imagemAntiga: string | null = null;
    if (produtoAtual.imagem && typeof produtoAtual.imagem === 'string') {
      imagemAntiga = produtoAtual.imagem;
    }

    const updateFields: Partial<Produto> = {
      nome: body.nome || '',
      descricao: body.descricao || '',
      categoria: body.categoria || '',
      material: body.material || '',
      cor: body.cor || '',
      acabamento: body.acabamento || '',
      peso: Number(body.peso) || 0,
      preco: Number(body.preco) || 0,
      desconto: Number(body.desconto) || 0,
      estoque: Number(body.estoque) || 0,
      tempoEstimadoProducao: body.tempoEstimadoProducao || '',
    };

    if (body.dimensoes) {
      updateFields.dimensoes = JSON.parse(body.dimensoes) as Produto['dimensoes'];
    }

    if (files.imagem) {
      const novaUrl: string = await saveFileToBlob(files.imagem);
      updateFields.imagem = novaUrl as string | File;
      if (imagemAntiga) {
        await deleteBlobByUrl(imagemAntiga);
      }
    }

    const { modifiedCount } = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (modifiedCount === 0) {
      return NextResponse.json({ error: 'Produto não encontrado ou dados iguais' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Produto atualizado' }, { status: 200 });
  } catch (err) {
    console.error('Erro no PUT', err);
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const collection = await getProdutosCollection();
    const data = await req.json();
    const id = data.id;
    if (!id) return NextResponse.json({ error: 'ID do produto é obrigatório' }, { status: 400 });

    const produto = await collection.findOne({ _id: new ObjectId(id) });
    if (!produto) return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });

    const { deletedCount } = await collection.deleteOne({ _id: new ObjectId(id) });
    if (deletedCount === 0) return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });

    if (produto.imagem && typeof produto.imagem === 'string') {
      await deleteBlobByUrl(produto.imagem);
    }

    return NextResponse.json({ message: 'Produto deletado' }, { status: 200 });
  } catch (err) {
    console.error('Erro no DELETE', err);
    return NextResponse.json({ error: 'Erro ao deletar produto' }, { status: 500 });
  }
}

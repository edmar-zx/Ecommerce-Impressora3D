import { NextRequest, NextResponse } from "next/server";
import { getProdutosCollection } from "./mongodb";
import { ObjectId } from "mongodb";
import { Produto } from "@/types/product";
import { validateProduct } from "@/utils/productValidation";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

interface FormDataBody {
  nome: string;
  descricao: string;
  categoria: string;
  material: string;
  cor: string;
  acabamento: string;
  peso: string;
  preco: string;
  desconto: string;
  estoque: string;
  tempoEstimadoProducao: string;
  dimensoes: string;
  id?: string;
  destaque?: string; 
}

async function saveFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.name);
  const filename = "imagem-" + uniqueSuffix + ext;
  const filepath = path.join(uploadDir, filename);
  
  fs.writeFileSync(filepath, buffer);
  return `/uploads/${filename}`;
}

async function processFormData(request: NextRequest) {
  const formData = await request.formData();
  const body: Partial<FormDataBody> = {};
  const files: { [key: string]: File } = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      files[key] = value;
    } else {
      body[key as keyof FormDataBody] = value as string;
    }
  }

  return { body, files };
}

function deleteImageFile(imagePath: string): void {
  try {
    if (!imagePath || typeof imagePath !== 'string') return;

    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    const fullPath = path.join(process.cwd(), 'public', cleanPath);
    
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Imagem deletada: ${fullPath}`);
    }
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
  }
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

    let imagemPath = "";
    if (files.imagem) {
      imagemPath = await saveFile(files.imagem);
    }

    const dimensoes = body.dimensoes ? JSON.parse(body.dimensoes) : { largura: 0, altura: 0, profundidade: 0 };

    const produto: Omit<Produto, '_id'> = {
      nome: body.nome || "",
      descricao: body.descricao || "",
      categoria: body.categoria || "",
      material: body.material || "",
      cor: body.cor || "",
      acabamento: body.acabamento || "",
      peso: Number(body.peso) || 0,
      dimensoes,
      preco: Number(body.preco) || 0,
      desconto: Number(body.desconto) || 0,
      estoque: Number(body.estoque) || 0,
      tempoEstimadoProducao: body.tempoEstimadoProducao || "",
      imagem: imagemPath,
      destaque: body.destaque ? body.destaque === 'true' : false,
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
      return NextResponse.json(
        { error: 'Informe o ID do produto que deseja editar' },
        { status: 400 }
      );
    }

    const produtoAtual = await collection.findOne({ _id: ObjectId.createFromHexString(id) });
    let imagemAntiga: string | null = null;

    if (produtoAtual?.imagem && typeof produtoAtual.imagem === 'string') {
      imagemAntiga = produtoAtual.imagem;
    }

    const updateFields: Partial<Produto> = {
      nome: body.nome || "",
      descricao: body.descricao || "",
      categoria: body.categoria || "",
      material: body.material || "",
      cor: body.cor || "",
      acabamento: body.acabamento || "",
      peso: Number(body.peso) || 0,
      preco: Number(body.preco) || 0,
      desconto: Number(body.desconto) || 0,
      estoque: Number(body.estoque) || 0,
      tempoEstimadoProducao: body.tempoEstimadoProducao || "",
      destaque: body.destaque ? body.destaque === 'true' : false,
    };

    if (body.dimensoes) {
      updateFields.dimensoes = JSON.parse(body.dimensoes);
    }

    if (files.imagem) {
      updateFields.imagem = await saveFile(files.imagem);
      
      if (imagemAntiga) {
        deleteImageFile(imagemAntiga);
      }
    }

    const { modifiedCount } = await collection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: updateFields }
    );

    if (modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Produto não encontrado ou dados iguais' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Produto atualizado' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Erro no PUT', err);
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const collection = await getProdutosCollection();
    const data = await req.json();
    const { id } = data;

    if (!id) {
      return NextResponse.json({ error: 'ID do produto é obrigatório' }, { status: 400 });
    }

    const produto = await collection.findOne({ _id: ObjectId.createFromHexString(id) });
    
    if (!produto) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    const { deletedCount } = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) });

    if (deletedCount === 0) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    if (produto.imagem && typeof produto.imagem === 'string') {
      deleteImageFile(produto.imagem);
    }

    return NextResponse.json({ message: 'Produto deletado' }, { status: 200 });
  } catch (err) {
    console.error('Erro no DELETE', err);
    return NextResponse.json({ error: 'Erro ao deletar produto' }, { status: 500 });
  }
}
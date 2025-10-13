import { NextRequest, NextResponse } from "next/server";
import { getProdutosCollection } from "./mongodb";
import { ObjectId } from "mongodb";

import { Produto } from "@/types/product";
import { validateProduct } from "@/utils/productValidation";

export async function GET() {
    try {
        const collection = await getProdutosCollection();
        const produtos = await collection.find().toArray();
        return NextResponse.json(produtos);
    }
    catch (err) {
        console.error('Erro no GET:', err);
        return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
    }
}
export async function POST(req: NextRequest) {
    try {
        const collection = await getProdutosCollection();
        const data: Produto = await req.json();

        if (!validateProduct(data)) {
            return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
        }

        const { _id, ...produto } = data; // Remove _id, Mongo cria automaticamente

        const resposta = await collection.insertOne({
            ...produto,
            createAt: new Date()
        });

        return NextResponse.json({ message: "Produto adicionado", id: resposta.insertedId }, { status: 201 });
    } catch (err) {
        console.error("Erro no POST", err);
        return NextResponse.json({ error: "Erro ao adicionar produto" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const collection = await getProdutosCollection();
        const data: { id?: string } = await req.json();
        const { id } = data;

        if (!id) {
            return NextResponse.json({ error: 'ID do produto é obrigatório' }, { status: 400 });
        }

        const { deletedCount } = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) });

        if (deletedCount === 0) {
            return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Produto deletado' }, { status: 200 });
    } catch (err) {
        console.error('Erro no DELETE', err);
        return NextResponse.json({ error: 'Erro ao deletar produto' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const collection = await getProdutosCollection();
        const data: Partial<Produto> & { id?: string } = await req.json();
        const { id, ...fields } = data;

        if (!id) {
            return NextResponse.json(
                { error: 'Informe o ID do produto que deseja editar' },
                { status: 400 }
            );
        }

        if (Object.keys(fields).length === 0) {
            return NextResponse.json(
                { error: 'Nenhum campo para atualizar' },
                { status: 400 }
            );
        }

        const { modifiedCount } = await collection.updateOne(
            { _id: ObjectId.createFromHexString(id) },
            { $set: fields }
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


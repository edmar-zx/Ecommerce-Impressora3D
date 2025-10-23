import { NextRequest, NextResponse } from "next/server";
import { getProdutosCollection } from "../mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        const collection = await getProdutosCollection();
        const produto = await collection.findOne({ _id: ObjectId.createFromHexString(id) });

        if (!produto) {
            return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
        }

        return NextResponse.json(produto, { status: 200 });
    } catch (err) {
        console.error("Erro no GET /api/produtos/[id]:", err);
        return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
    }
}

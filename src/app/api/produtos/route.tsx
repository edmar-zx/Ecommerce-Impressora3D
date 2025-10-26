import { NextRequest, NextResponse } from "next/server";
import { getProdutosCollection } from "./mongodb";
import { ObjectId } from "mongodb";

import { Produto } from "@/types/product";
import { validateProduct } from "@/utils/productValidation";

import { upload } from "@/lib/multer"; // import do arquivo que você enviou


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

// export async function POST(req: NextRequest) {
//     try {
//         const collection = await getProdutosCollection();
//         const data: Produto = await req.json();

//         if (!validateProduct(data)) {
//             return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
//         }

//         const { _id, ...produto } = data; // Remove _id, Mongo cria automaticamente

//         const resposta = await collection.insertOne({
//             ...produto,
//             createAt: new Date()
//         });

//         return NextResponse.json({ message: "Produto adicionado", id: resposta.insertedId }, { status: 201 });
//     } catch (err) {
//         console.error("Erro no POST", err);
//         return NextResponse.json({ error: "Erro ao adicionar produto" }, { status: 500 });
//     }
// }

// Função helper para usar multer com Promise
function runMiddleware(req: any, res: any, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) reject(result);
            else resolve(result);
        });
    });
}

export const config = {
    api: {
        bodyParser: false, // obrigatório para multer
    },
};

export async function POST(req: NextRequest) {
    try {
        // Transformar NextRequest em req/res compatível com multer
        const reqAny = req as any;
        const resAny = { statusCode: 200 } as any;

        // Executa o multer
        await runMiddleware(reqAny, resAny, upload.single("imagem"));

        const body = reqAny.body; // multer preenche req.body
        const file = reqAny.file; // multer preenche req.file

        const collection = await getProdutosCollection();

        const dimensoes = body.dimensoes ? JSON.parse(body.dimensoes) : { largura: 0, altura: 0, profundidade: 0 };

        const produto = {
            nome: body.nome,
            descricao: body.descricao,
            categoria: body.categoria,
            material: body.material,
            cor: body.cor,
            acabamento: body.acabamento,
            peso: Number(body.peso),
            dimensoes,
            preco: Number(body.preco),
            desconto: Number(body.desconto),
            estoque: Number(body.estoque),
            tempoEstimadoProducao: body.tempoEstimadoProducao,
            imagem: file ? `/uploads/${file.filename}` : "",
            createAt: new Date(),
        };

        // ✅ Validação antes de salvar
        if (!validateProduct(produto)) {
            return NextResponse.json({ error: "Campos obrigatórios incompletos" }, { status: 400 });
        }
        
        const resposta = await collection.insertOne(produto);

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


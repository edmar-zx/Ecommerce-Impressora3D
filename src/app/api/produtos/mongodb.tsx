import { MongoClient, Db } from 'mongodb';

const uri = process.env.URIMONGOLOCAL;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error('Defina URIMONGOLOCAL no arquivo .env.local');
}

export async function connectBD(): Promise<Db> {
    if (!client) {
        client = new MongoClient(uri as string);
        clientPromise = client.connect();
    }

    await clientPromise;
    return client.db('Impressora');
}

export async function getProdutosCollection() {
    const db = await connectBD();
    return db.collection('produtos');
}

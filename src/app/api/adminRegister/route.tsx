import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUsersCollection } from "./mongodb"
import { loginAndRegisterUserSchema } from "@/schemas/adminSchema"

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Validação com Zod
    const parsed = loginAndRegisterUserSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.format();
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const users = await getUsersCollection();

    // 🔍 Verifica se o usuário já existe
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
    }

    // 🔐 Cria hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Insere no banco
    await users.insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Usuário registrado com sucesso" }, { status: 201 });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

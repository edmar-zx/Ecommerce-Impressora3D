import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginAndRegisterUserSchema } from "@/schemas/adminSchema";
import { getUsersCollection } from "./mongodb";

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

    // 🔍 Busca usuário
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // 🔑 Compara senhas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    // 🟢 Sucesso
    return NextResponse.json({
      message: "Login bem-sucedido",
      user: { email: user.email }, // não envia a senha
    }, { status: 200 });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

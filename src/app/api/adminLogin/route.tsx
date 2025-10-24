// api/adminLogin/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUsersCollection } from "./mongodb";
import { loginAndRegisterUserSchema } from "@/schemas/adminSchema";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET não configurado");
      return NextResponse.json(
        { error: "Erro de configuração do servidor" }, 
        { status: 500 }
      );
    }

    const body = await req.json();
    const parsed = loginAndRegisterUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const users = await getUsersCollection();

    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    // Gera token JWT
    const token = jwt.sign({ 
      id: user._id.toString(), 
      email: user.email 
    }, JWT_SECRET, { 
      expiresIn: "1h" 
    });

    // **CORREÇÃO CRÍTICA: Configuração do cookie para Vercel**
    const requestOrigin = req.headers.get('origin');
    const isVercel = requestOrigin?.includes('.vercel.app');
    
    const response = NextResponse.json({ 
      message: "Login bem-sucedido",
      user: { id: user._id, email: user.email }
    });

    // **CONFIGURAÇÃO ESPECÍFICA PARA VERCEL**
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: true, // ✅ SEMPRE true na Vercel
      sameSite: "lax", // ✅ CRÍTICO para cross-domain na Vercel
      maxAge: 60 * 60,
      path: "/",
      // ⚠️ NÃO defina 'domain' - deixa o browser gerenciar
    });

    console.log("✅ Cookie configurado - Secure:", true, "SameSite: none");
    return response;

  } catch (error) {
    console.error("❌ Erro no login:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
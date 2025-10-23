// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { getUsersCollection } from "./mongodb";
// import { loginAndRegisterUserSchema } from "@/schemas/adminSchema";

// const JWT_SECRET = process.env.JWT_SECRET || "seuSegredoSuperSeguro";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     // ✅ Validação com Zod
//     const parsed = loginAndRegisterUserSchema.safeParse(body);
//     if (!parsed.success) {
//       return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
//     }

//     const { email, password } = parsed.data;
//     const users = await getUsersCollection();

//     // 🔍 Verifica se o usuário existe
//     const user = await users.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
//     }

//     // 🔐 Verifica senha
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
//     }

//     // 🔑 Gera token JWT
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "1h" } // o token expira em 1 hora
//     );

//     // 🍪 (Opcional) Armazena token em cookie
//     const response = NextResponse.json({ message: "Login bem-sucedido" });
//     response.cookies.set("authToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60, // 1 hora
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     console.error("Erro no login:", error);
//     return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
//   }
// }

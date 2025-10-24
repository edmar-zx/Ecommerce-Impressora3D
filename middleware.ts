// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = process.env.JWT_SECRET;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  
  console.log("🔐 Middleware - Token:", token ? "EXISTE" : "NÃO EXISTE");
  console.log("🌐 URL:", req.nextUrl.pathname);
  console.log("🏠 Origem:", req.nextUrl.origin);
  console.log("🍪 Todos os cookies:", req.cookies.getAll());

  // Se não há token, redireciona para login
  if (!token) {
    console.log("🚫 Redirecionando para login...");
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    if (!SECRET) {
      console.error("❌ JWT_SECRET não configurado");
      return NextResponse.redirect(new URL("/", req.url));
    }

    const secret = new TextEncoder().encode(SECRET);
    await jwtVerify(token, secret);
    
    console.log("✅ Token válido - Acesso permitido");
    return NextResponse.next();
  } catch (err) {
    console.error("❌ Token inválido ou expirado:", err);
    
    // Limpa o cookie inválido
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.delete("authToken");
    
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
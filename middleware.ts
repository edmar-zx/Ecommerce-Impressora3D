// middleware.ts - Versão simplificada para debug
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  
  console.log("🔐 Token no middleware:", token ? "EXISTE" : "NÃO EXISTE");
  console.log("🌐 Rota acessada:", req.nextUrl.pathname);

  if (!token) {
    console.log("🚫 Redirecionando para login...");
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("✅ Acesso permitido");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
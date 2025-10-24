import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  console.log("Cookie authToken:", token);

  if (!token) {
    console.log("dentro do if:::;Cookie authToken:", token);
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // Verifica se o token é válido
    jwt.verify(token, SECRET);
    console.log("Passou do jwt verificacao Cookie authToken:", token);
    return NextResponse.next();
  } catch (err) {
    console.log("catcg error: Cookie authToken:", token);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};

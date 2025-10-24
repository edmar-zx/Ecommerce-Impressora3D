import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    console.log("Sem token, redirecionando...");
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    jwt.verify(token, SECRET);
    return NextResponse.next();
  } catch (err) {
    console.log("Token inválido:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};

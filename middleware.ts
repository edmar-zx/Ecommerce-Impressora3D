import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  // 🔒 Em produção, verifica o token
  if (process.env.NODE_ENV === "production") {
    const token = req.cookies.get("authToken")?.value;
    if (!token) return NextResponse.redirect(new URL("/", req.url));

    try {
      jwt.verify(token, SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 🚧 Em dev, deixa passar
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

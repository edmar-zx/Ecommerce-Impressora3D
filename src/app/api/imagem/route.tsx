// app/api/upload/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { upload } from "@/lib/multer";
import { promisify } from "util";

// Promisify do multer (para poder usar async/await)
const runMiddleware = promisify(upload.single("file"));

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }

  // Convertendo o arquivo (File) para buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Salvando o arquivo manualmente
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);
  await fs.promises.writeFile(filePath, buffer);

  return NextResponse.json({
    message: "Upload realizado com sucesso!",
    filePath: `/uploads/${fileName}`,
  });
};

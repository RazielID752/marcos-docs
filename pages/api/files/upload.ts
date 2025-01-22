import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const uploadDir = "./uploads"; 

export const config = {
  api: {
    bodyParser: false, 
  },
};

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    role: "ALUNO" | "GESTOR" | "SUPER_ADMIN";
  };
}

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { user } = req;

  if (!user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const { role, id: userId } = user;

  if (role !== "ALUNO") {
    return res.status(403).json({ error: "Permissão negada" });
  }

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const chunks: Buffer[] = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", async () => {
    const buffer = Buffer.concat(chunks);
    const boundary = req.headers["content-type"]?.split("boundary=")[1];

    if (!boundary) {
      return res.status(400).json({ error: "Boundary não encontrado no cabeçalho da requisição" });
    }

    const parts = buffer.toString().split(`--${boundary}`);
    const filePart = parts.find((part) => part.includes("Content-Disposition") && part.includes("filename="));

    if (!filePart) {
      return res.status(400).json({ error: "Arquivo não encontrado no corpo da requisição" });
    }

    const filenameMatch = filePart.match(/filename="(.+?)"/);
    if (!filenameMatch) {
      return res.status(400).json({ error: "Nome do arquivo não encontrado" });
    }

    const originalFilename = filenameMatch[1];
    const fileStartIndex = filePart.indexOf("\r\n\r\n") + 4;
    const fileData = filePart.slice(fileStartIndex, filePart.lastIndexOf("\r\n"));

    const filePath = path.join(uploadDir, originalFilename);

    try {
      fs.writeFileSync(filePath, fileData, "binary");

      const uploadedFile = await prisma.arquivos.create({
        data: {
          nome: originalFilename,
          caminho: filePath,
          tipo: "arquivo",
          alunoId: Number(userId),
        },
      });

      return res.status(201).json(uploadedFile);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: "Erro ao salvar arquivo", details: error.message });
      } else{
        return res.status(500).json({ error: "Erro ao salvar arquivo", details: "Erro desconhecido" });
      }
    }
  });

  req.on("error", (err) => {
    res.status(500).json({ error: "Erro durante o upload", details: err.message });
  });
}

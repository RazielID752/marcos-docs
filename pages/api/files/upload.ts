import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const uploadDir = "./uploads"; // Diretório local para armazenar arquivos

// Configuração do Next.js para desativar o bodyParser
export const config = {
  api: {
    bodyParser: false, // Desativa o parser para lidar com uploads de arquivo
  },
};

// Define a interface para a requisição autenticada
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

  // Garantir que o diretório de upload existe
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Processar o upload manualmente
  const chunks: Buffer[] = [];
  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", async () => {
    const buffer = Buffer.concat(chunks);

    // Extração de dados do cabeçalho multipart/form-data
    const boundary = req.headers["content-type"]?.split("boundary=")[1];
    if (!boundary) {
      return res.status(400).json({ error: "Boundary não encontrado no cabeçalho da requisição" });
    }

    const parts = buffer.toString().split(`--${boundary}`);
    const filePart = parts.find((part) => part.includes("Content-Disposition") && part.includes("filename="));

    if (!filePart) {
      return res.status(400).json({ error: "Arquivo não encontrado no corpo da requisição" });
    }

    // Extraindo o nome do arquivo
    const filenameMatch = filePart.match(/filename="(.+?)"/);
    if (!filenameMatch) {
      return res.status(400).json({ error: "Nome do arquivo não encontrado" });
    }

    const originalFilename = filenameMatch[1];
    const fileStartIndex = filePart.indexOf("\r\n\r\n") + 4; // Pula os cabeçalhos
    const fileData = filePart.slice(fileStartIndex, filePart.lastIndexOf("\r\n"));

    const filePath = path.join(uploadDir, originalFilename);

    try {
      // Salvar o arquivo no sistema de arquivos
      fs.writeFileSync(filePath, fileData, "binary");

      // Salvar os dados no banco de dados
      const uploadedFile = await prisma.arquivos.create({
        data: {
          nome: originalFilename,
          caminho: filePath,
          tipo: "arquivo",
          alunoId: Number(userId), // Relaciona o arquivo ao aluno
        },
      });

      return res.status(201).json(uploadedFile);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao salvar arquivo", details: error.message });
    }
  });

  req.on("error", (err) => {
    res.status(500).json({ error: "Erro durante o upload", details: err.message });
  });
}

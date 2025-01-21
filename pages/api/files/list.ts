import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from '@/middleware/auth'; // Importando o middleware

const prisma = new PrismaClient();

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    role: "ALUNO" | "GESTOR" | "SUPER_ADMIN";
  };
}

 async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { user } = req;
  const { alunoId } = req.query;

  if (!user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const { role, id: userId } = user;

  // Permite o acesso de "SUPER_ADMIN" a todos os arquivos
  if (role === "SUPER_ADMIN") {
    try {
      const files = await prisma.arquivos.findMany({
        where: { alunoId: Number(alunoId) },
      });
      return res.status(200).json(files);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao listar arquivos", details: error.message });
    }
  }

  // ALUNO só pode acessar seus próprios arquivos
  if (role === "ALUNO" && Number(userId) !== Number(alunoId)) {
    return res.status(403).json({ error: "Permissão negada" });
  }

  try {
    // Confirma que o aluno existe no banco
    const aluno = await prisma.usuario.findUnique({
      where: { id: Number(alunoId) },
    });

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    // Busca os arquivos associados ao aluno
    const files = await prisma.arquivos.findMany({
      where: { alunoId: Number(alunoId) },
    });

    return res.status(200).json(files);
  } catch (error: any) {
    return res.status(500).json({ error: "Erro ao listar arquivos", details: error.message });
  }
}

export default authMiddleware(handler);

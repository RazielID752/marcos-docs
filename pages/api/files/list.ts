import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from '@/middleware/auth'; 

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
  
  // Garantindo que os IDs sejam números
  const alunoIdNumber = Number(alunoId);
  const userIdNumber = Number(userId);

  if (role === "SUPER_ADMIN") {
    try {
      const files = await prisma.arquivos.findMany({
        where: { alunoId: alunoIdNumber },
      });
      return res.status(200).json(files);
    } catch (error: any) {
      return res.status(500).json({ error: "Erro ao listar arquivos", details: error.message });
    }
  }

  // ALUNO só pode acessar seus próprios arquivos
  if (role === "ALUNO" && userIdNumber !== alunoIdNumber) {
    return res.status(403).json({ error: "Permissão negada" });
  }

  try {
    const aluno = await prisma.usuario.findUnique({
      where: { id: alunoIdNumber },
    });

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    const files = await prisma.arquivos.findMany({
      where: { alunoId: alunoIdNumber },
    });

    return res.status(200).json(files);
  } catch (error: unknown) {
   if(error instanceof Error){
    return res.status(500).json({ error: "Erro ao listar arquivos", details: error.message });
   } else{
    return res.status(500).json({ error: "Erro ao listar arquivos", details: "Erro desconhecido" });
   }
  }
}

export default authMiddleware(handler);

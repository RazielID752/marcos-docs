import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    role: "ALUNO" | "GESTOR" | "SUPER_ADMIN";
  };
}

export default async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { user } = req;

  if (!user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const { role } = user;
  const { userId } = req.body; // userId no corpo da requisição

  if (role !== "SUPER_ADMIN") {
    return res.status(403).json({ error: "Permissão negada" });
  }

  try {
    const userToDelete = await prisma.usuario.findUnique({ where: { id: Number(userId) } });

    if (!userToDelete || userToDelete.tipo === "SUPER_ADMIN") {
      return res.status(400).json({ error: "Não é possível excluir este usuário" });
    }

    await prisma.usuario.delete({ where: { id: Number(userId) } });

    return res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (error: any) {
    return res.status(500).json({ error: "Erro ao excluir usuário", details: error.message });
  }
}

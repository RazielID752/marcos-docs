import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import authMiddleware  from "@/middleware/auth";

const prisma = new PrismaClient();

interface CreateUserRequestBody {
  email: string;
  name: string;
  password: string;
  role: "ALUNO" | "GESTOR" | "SUPER_ADMIN";
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { role: currentUserRole } = req.user!; // Extraído do middleware
  const { email, name, password, role }: CreateUserRequestBody = req.body;

  if (currentUserRole !== "GESTOR" && currentUserRole !== "SUPER_ADMIN") {
    return res.status(403).json({ error: "Permissão negada" });
  }

  try {
    const user = await prisma.usuario.create({
      data: {
      email,
      nome: name,
      senha: password,
      tipo: role,
      },
    });

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json({
      error: "Erro ao criar o usuário",
      details: error.message,
    });
  }
}

export default authMiddleware(handler);

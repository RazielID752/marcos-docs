import { NextApiRequest, NextApiResponse } from "next/types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";  // Para comparar as senhas
import jwt from "jsonwebtoken";
// Para gerar o token JWT

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método nao permitido' });
  }

  const { email, password } = req.body; // Dados do corpo da requisição
  const senha = password; // Atribui o valor da senha ao usuário


  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha obrigatórios' });
  }

  try {
    const Usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!Usuario) {
      return res.status(404).json({ error: "Usuário nao encontrado" });
    }

    // compara a senha informada com a senha criptografada no banco de dados

    const senhaValida = await bcrypt.compare(senha, Usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não está definido');
    }

    const token = jwt.sign(
      { id: Usuario.id, role: Usuario.tipo }, // Payload do token
      process.env.JWT_SECRET, // Chave secreta para assinar o token
      { expiresIn: '1h' } // Tempo de expiração do token
    );

    return res.status(200).json({ token });
  } catch (error: unknown) {
    if(error instanceof Error) {
      return res.status(500).json({ error: "Erro ao realizar o login", details: error.message });
    } else{
      return res.status(500).json({ error: "Erro ao realizar o login" });
    }
  }
}
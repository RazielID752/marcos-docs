import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: "ALUNO" | "GESTOR" | "SUPER_ADMIN";
}

const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido ou inválido" });
    }

    const token = authHeader.split(" ")[1]; // Extrai o token após "Bearer"

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET não está configurado");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      req.user = decoded; // Adiciona o usuário decodificado à requisição

      return handler(req, res); // Continua para o handler principal
    } catch (error) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }
  };
};

export default authMiddleware;
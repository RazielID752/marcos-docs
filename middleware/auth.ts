import { Usuario } from './../node_modules/.pnpm/@prisma+client@6.2.1_prisma@6.2.1/node_modules/.prisma/client/index.d';
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const authenticate = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.Usuario = decoded; // Adiciona o usuário à requisição
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }
  };
};

export default authenticate;

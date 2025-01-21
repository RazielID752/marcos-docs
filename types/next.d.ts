import { User } from "@prisma/client"; // se `User` for um modelo do Prisma

declare module "next" {
  interface NextApiRequest {
    user?: {
      id: string;
      role: "ALUNO" | "GESTOR" | "SUPER_ADMIN";
    }
  }
}

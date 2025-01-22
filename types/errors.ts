// types/errors.ts
export interface PrismaError {
  message: string;
  code?: string;
  meta?: Record<string, unknown>;
}

export interface RequestError {
  message: string;
}
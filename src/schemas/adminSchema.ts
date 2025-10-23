import { z } from "zod";

export const loginAndRegisterUserSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").max(10, "A senha deve ter no máximo 10 caracteres"),
});
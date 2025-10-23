import { z } from "zod";

export const loginAndRegisterUserSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }).max(10, { message: "A senha deve ter no máximo 10 caracteres" }),
});

export type formLoginAndRegister = z.infer<typeof loginAndRegisterUserSchema>;
'use client'

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { formLoginAndRegister, loginAndRegisterUserSchema } from "@/schemas/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } =
        useForm<formLoginAndRegister>({
            resolver: zodResolver(loginAndRegisterUserSchema),
        });

    const router = useRouter();
    const onSubmit = async (data: formLoginAndRegister) => {
        try {
            console.log("🔄 Iniciando login...");

            const response = await fetch('/api/adminLogin', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include" 
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || 'Erro ao fazer login');
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 100));
            alert('Login realizado com sucesso!');
            router.push('/admin/DashboardProduct');

        } catch (err) {
            console.error('❌ Erro ao fazer login:', err);
            alert('Erro ao fazer login, tente novamente.');
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Entre na sua conta
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="seu@email.com"
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Senha
                            </Label>
                            <div className="mt-1">
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Sua senha"
                                    {...register('password')}
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Lembrar de mim
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Esqueceu sua senha?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
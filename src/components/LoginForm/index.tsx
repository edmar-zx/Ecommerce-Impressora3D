'use client'

import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async () => {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full border-[10px] border-amber-950 border-solid">
            <Label htmlFor="email">Email</Label>
            <Input
                type="text"
                placeholder="Informe o email"
                {...register('email')}
            />

            <Label htmlFor="password">Senha</Label>
            <Input
                type="password"
                placeholder="Informe a senha"
                {...register('password')}
            />

            {/* {errors.password && (
                <span className="text-[rgb(238,80,80)] text-[10px] ml-[10px]">
                    {errors.password}
                </span>
            )} */}

            <button type="submit">
                Login
            </button>
        </form>
    )
}
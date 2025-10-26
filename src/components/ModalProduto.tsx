'use client';
import React, { useState } from "react";
import { DropdownField } from "./DropdownField";
import { Produto } from "@/types/product";
import { FaTrash, FaSave } from "react-icons/fa";
import { Input } from "./ui/input";
import Image from "next/image";

interface ModalProdutoProps {
    formData: Produto;
    onChange: (data: Produto) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onDelete: () => void;
    buttonText: string;
}

type ButtonVariant = "primary" | "danger";

interface ButtonProps {
    variant: ButtonVariant;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string;
}

interface TextButtonProps {
    variant: ButtonVariant;
    children: React.ReactNode;
}

export function ModalProduto({ formData, onChange, onSubmit, onDelete }: ModalProdutoProps) {
    const categorias = ["Miniaturas", "Utensílios", "Decoração", "Acessórios", "Brinquedos"];
    const acabamentos = ["Liso", "Polido", "Pintado", "Texturizado"];
    const materiais = ["PLA", "ABS", "PETG", "Resina", "TPU"];
    const cores = ["Branco", "Preto", "Vermelho", "Azul", "Verde", "Amarelo", "Outro"];
    const tempoDeProducao = ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h"];

    const Button = ({ variant, children, className = "", ...props }: ButtonProps) => {
        const baseClasses = "p-[15px] flex items-center justify-center border border-solid rounded-[8px] cursor-pointer w-60 gap-2 transition-colors duration-500";
        const variants: Record<ButtonVariant, string> = {
            primary: "bg-black border-black hover:bg-white hover:text-black",
            danger: "bg-[#ff4d4f] border-[#ff4d4f] hover:bg-white hover:text-[#ff4d4f]"
        };

        return (
            <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
                {children}
            </button>
        );
    };

    const TextButton = ({ variant, children }: TextButtonProps) => {
        return (
            <span className={`text-[16px] font-bold text-white text-center block transition-colors duration-300 ${variant === 'primary' ? 'group-hover:text-black' : 'group-hover:text-[#ff4d4f]'}`}>
                {children}
            </span>
        );
    };

    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
           
            setPreview(URL.createObjectURL(selected));
            onChange({ ...formData, imagem: selected }); // armazenar File temporariamente
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white flex flex-col items-center w-1/2 max-h-[90vh] rounded-xl shadow-lg z-[1000]">
            <div className="w-full p-5 overflow-y-auto box-border">
                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-2 gap-5 w-full"
                >
                    <div className="flex flex-col items-start w-full col-span-2">
                        <span className="text-[16px] font-bold text-black text-left mb-2.5">Nome</span>
                        <input
                            type="text"
                            placeholder="Nome do produto"
                            value={formData.nome}
                            onChange={(e) => onChange({ ...formData, nome: e.target.value })}
                            className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border"
                        />
                    </div>

                    <div className="flex">
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            className="hover:cursor-pointer !border !border-solid !border-black"
                        />
                        {preview && (
                            <div className="relative w-200 h-40 mt-2 border">
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={200}
                                    height={200}
                                    className="rounded-md object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <DropdownField
                        label="Categoria"
                        options={categorias}
                        value={formData.categoria}
                        onChange={(value) => onChange({ ...formData, categoria: value })}
                        disabled={!!formData._id}
                    />

                    <DropdownField
                        label="Tempo de produção"
                        options={tempoDeProducao}
                        value={formData.tempoEstimadoProducao}
                        onChange={(value) => onChange({ ...formData, tempoEstimadoProducao: value })}
                    />

                    <div className="flex flex-col items-start w-full">
                        <span className="text-[16px] font-bold text-black text-left mb-2.5">Peso (g)</span>
                        <input
                            type="number"
                            min={0}
                            step={1}
                            value={formData.peso ?? 0}
                            onChange={(e) => onChange({ ...formData, peso: Number(e.target.value) })}
                            className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border"
                        />
                    </div>

                    <DropdownField
                        label="Material"
                        options={materiais}
                        value={formData.material}
                        onChange={(value) => onChange({ ...formData, material: value })}
                    />

                    <DropdownField
                        label="Cor"
                        options={cores}
                        value={formData.cor}
                        onChange={(value) => onChange({ ...formData, cor: value })}
                    />

                    <DropdownField
                        label="Acabamento"
                        options={acabamentos}
                        value={formData.acabamento}
                        onChange={(value) => onChange({ ...formData, acabamento: value })}
                    />

                    <div className="grid grid-cols-3 gap-4 w-full col-span-2">
                        <div className="flex flex-col items-start w-full">
                            <span className="text-[16px] font-bold text-black text-left mb-2.5">Largura (mm)</span>
                            <input
                                type="number"
                                min={0}
                                step={1}
                                value={formData.dimensoes?.largura ?? 0}
                                onChange={(e) =>
                                    onChange({
                                        ...formData,
                                        dimensoes: {
                                            ...formData.dimensoes,
                                            largura: Number(e.target.value),
                                        },
                                    })
                                }
                                className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border"
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <span className="text-[16px] font-bold text-black text-left mb-2.5">Altura (mm)</span>
                            <input
                                type="number"
                                min={0}
                                step={1}
                                value={formData.dimensoes?.altura ?? 0}
                                onChange={(e) =>
                                    onChange({
                                        ...formData,
                                        dimensoes: {
                                            ...formData.dimensoes,
                                            altura: Number(e.target.value),
                                        },
                                    })
                                }
                                className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border"
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <span className="text-[16px] font-bold text-black text-left mb-2.5">Profundidade (mm)</span>
                            <input
                                type="number"
                                min={0}
                                step={1}
                                value={formData.dimensoes?.profundidade ?? 0}
                                onChange={(e) =>
                                    onChange({
                                        ...formData,
                                        dimensoes: {
                                            ...formData.dimensoes,
                                            profundidade: Number(e.target.value),
                                        },
                                    })
                                }
                                className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-start w-full col-span-2">
                        <span className="text-[16px] font-bold text-black text-left mb-2.5">Descrição</span>
                        <textarea
                            placeholder="Descrição do produto"
                            value={formData.descricao}
                            onChange={(e) => onChange({ ...formData, descricao: e.target.value })}
                            className="p-4 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full h-30 resize-y box-border font-inherit"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4 w-full col-span-2">
                        <div className="flex flex-col items-start w-full">
                            <span className="text-[16px] font-bold text-black text-left mb-2.5">Preço</span>
                            <input
                                type="text"
                                placeholder="R$ 0,00"
                                value={
                                    formData.preco
                                        ? new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(formData.preco)
                                        : ''
                                }
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const numeric = e.target.value.replace(/\D/g, '');
                                    let valor = Number(numeric) / 100;
                                    if (valor < 0) valor = 0;
                                    onChange({ ...formData, preco: valor });
                                }}
                                className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border"
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <span className="text-[16px] font-bold text-black text-left mb-2.5">Desconto (0% a 100%)</span>
                            <input
                                type="number"
                                placeholder="0"
                                min={0}
                                max={100}
                                step={1}
                                value={formData.desconto}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const valorStr = e.target.value;
                                    if (valorStr === "") {
                                        onChange({ ...formData, desconto: 0 });
                                        return;
                                    }
                                    let valorNum = Number(valorStr);
                                    if (valorNum < 0) valorNum = 0;
                                    if (valorNum > 100) valorNum = 100;
                                    onChange({ ...formData, desconto: valorNum });
                                }}
                                className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border"
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <span className="text-[16px] font-bold text-black text-left mb-2.5">Quantidade disponível</span>
                            <input
                                type="number"
                                placeholder="0"
                                min={0}
                                step={1}
                                value={formData.estoque}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const valorStr = e.target.value;
                                    if (valorStr === "") {
                                        onChange({ ...formData, estoque: 0 });
                                        return;
                                    }
                                    let valorNum = Number(valorStr);
                                    if (valorNum < 0) valorNum = 0;
                                    onChange({ ...formData, estoque: valorNum });
                                }}
                                className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border"
                            />
                        </div>
                    </div>

                    {formData._id && (
                        <>
                            <div className="flex flex-col items-start w-full">
                                <span className="text-[16px] font-bold text-black text-left mb-2.5">ID</span>
                                <input
                                    type="text"
                                    value={formData._id}
                                    readOnly
                                    className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border"
                                />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <span className="text-[16px] font-bold text-black text-left mb-2.5">Data de Criação</span>
                                <input
                                    type="text"
                                    value={formData.createAt ? new Date(formData.createAt).toLocaleString() : ""}
                                    readOnly
                                    className="p-5 mb-1 rounded-lg bg-[#f5f5f5] border-none shadow-sm w-full box-border"
                                />
                            </div>
                        </>
                    )}

                    {formData._id ? (
                        <div className="flex justify-between col-span-2">
                            <Button type="submit" variant="primary" className="group">
                                <FaSave className="text-white transition-colors duration-300 group-hover:text-black" />
                                <TextButton variant="primary">Salvar</TextButton>
                            </Button>
                            <Button type="button" onClick={onDelete} variant="danger" className="group">
                                <FaTrash className="text-white transition-colors duration-300 group-hover:text-[#ff4d4f]" />
                                <TextButton variant="danger">Deletar</TextButton>
                            </Button>
                        </div>
                    ) : (
                        <Button type="submit" variant="primary" className="group">
                            <FaSave className="text-white transition-colors duration-300 group-hover:text-black" />
                            <TextButton variant="primary">Cadastrar</TextButton>
                        </Button>
                    )}
                </form>

            </div>
        </div>
    );
}
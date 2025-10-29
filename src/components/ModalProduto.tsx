'use client';
import React, { useState } from "react";
import { DropdownField } from "./DropdownField";
import { Produto } from "@/types/product";
import { FaTrash, FaSave, FaUpload, FaRuler, FaWeight, FaPalette, FaTimes } from "react-icons/fa";
import { Input } from "./ui/input";
import Image from "next/image";

interface ModalProdutoProps {
    formData: Produto;
    onChange: (data: Produto) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onDelete: () => void;
    buttonText: string;
    onClose: () => void;

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

export function ModalProduto({ formData, onChange, onSubmit, onDelete, onClose }: ModalProdutoProps) {
    const categorias = ["Miniaturas", "Utensílios", "Decoração", "Acessórios", "Brinquedos"];
    const acabamentos = ["Liso", "Polido", "Pintado", "Texturizado"];
    const materiais = ["PLA", "ABS", "PETG", "Resina", "TPU"];
    const cores = ["Branco", "Preto", "Vermelho", "Azul", "Verde", "Amarelo", "Outro"];
    const tempoDeProducao = ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h"];

    const Button = ({ variant, children, className = "", ...props }: ButtonProps) => {
        const baseClasses = "p-4 flex items-center justify-center border border-solid rounded-xl cursor-pointer w-full gap-3 transition-all duration-300 font-semibold shadow-sm hover:shadow-md";
        const variants: Record<ButtonVariant, string> = {
            primary: "bg-gray-900 border-gray-900 hover:bg-gray-800 hover:border-gray-800 text-white",
            danger: "bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700 text-white"
        };

        return (
            <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
                {children}
            </button>
        );
    };

    const TextButton = ({ children }: TextButtonProps) => {
        return (
            <span className="text-sm font-semibold text-center">
                {children}
            </span>
        );
    };

    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setPreview(URL.createObjectURL(selected));
            onChange({ ...formData, imagem: selected });
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white flex flex-col items-center w-11/12 max-w-4xl max-h-[95vh] rounded-2xl shadow-2xl z-[1000] border border-gray-100">

            <button
                onClick={onClose}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-lg z-10"
                type="button"
                title="Fechar"
            >
                <FaTimes className="text-sm" />
            </button>

            <div className="w-full p-2 overflow-y-auto">
                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                >
                    {/* Nome do Produto */}
                    <div className="flex flex-col items-start w-full col-span-2">
                        <label className="text-sm font-bold text-gray-700 text-left mb-2 flex items-center gap-2">
                            Nome do Produto
                        </label>
                        <input
                            type="text"
                            placeholder="Digite o nome do produto"
                            value={formData.nome}
                            onChange={(e) => onChange({ ...formData, nome: e.target.value })}
                            className="p-4 rounded-xl bg-gray-50 border border-gray-200 w-full box-border focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Upload de Imagem */}
                    <div className="flex flex-col gap-4 col-span-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <FaUpload className="text-gray-600" />
                            Imagem do Produto
                        </label>

                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Área de Upload - Só aparece quando NÃO tem imagem */}
                            {!preview && (!formData.imagem || (typeof formData.imagem === 'string' && formData.imagem === '')) && (
                                <div className="flex-1 w-full">
                                    <Input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                        accept="image/*"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200 cursor-pointer"
                                    >
                                        <div className="text-center">
                                            <FaUpload className="text-gray-400 text-lg mb-1 mx-auto" />
                                            <span className="text-sm text-gray-600">Adicionar imagem</span>
                                        </div>
                                    </label>
                                </div>
                            )}

                            {/* Preview - Só aparece quando TEM imagem */}
                            {(preview || (formData.imagem && typeof formData.imagem === 'string' && formData.imagem !== '')) && (
                                <div className="flex flex-col  gap-3  ">
                                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                                        <Image
                                            src={preview || (formData.imagem as string)}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview(null);
                                            onChange({
                                                ...formData,
                                                imagem: '' // Limpa a imagem
                                            });
                                        }}
                                        className="flex items-center gap-2 px-3 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                                    >
                                        <FaTrash className="text-xs" />
                                        Remover imagem
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Categoria e Tempo de Produção */}

                    {/* Grid Responsiva para Campos do Produto */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">

                        {/* Categoria */}
                        <div className="col-span-full sm:col-span-1">
                            <DropdownField
                                label="Categoria"
                                options={categorias}
                                value={formData.categoria}
                                onChange={(value) => onChange({ ...formData, categoria: value })}
                                disabled={!!formData._id}
                            />
                        </div>

                        {/* Tempo de Produção */}
                        <div className="col-span-full sm:col-span-1">
                            <DropdownField
                                label="Tempo de Produção"
                                options={tempoDeProducao}
                                value={formData.tempoEstimadoProducao}
                                onChange={(value) => onChange({ ...formData, tempoEstimadoProducao: value })}
                            />
                        </div>

                        {/* Peso */}
                        <div className="col-span-full sm:col-span-1">
                            <div className="flex flex-col items-start w-full">
                                <label className="text-sm font-bold text-gray-700 text-left mb-2 flex items-center gap-2">
                                    <FaWeight className="text-gray-600" />
                                    Peso (g)
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    step={1}
                                    value={formData.peso ?? 0}
                                    onChange={(e) => onChange({ ...formData, peso: Number(e.target.value) })}
                                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 w-full box-border focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Material */}
                        <div className="col-span-full sm:col-span-1">
                            <DropdownField
                                label="Material"
                                options={materiais}
                                value={formData.material}
                                onChange={(value) => onChange({ ...formData, material: value })}
                            />
                        </div>

                        {/* Cor */}
                        <div className="col-span-full sm:col-span-1">
                            <DropdownField
                                label="Cor"
                                options={cores}
                                value={formData.cor}
                                onChange={(value) => onChange({ ...formData, cor: value })}
                            />
                        </div>

                        {/* Acabamento */}
                        <div className="col-span-full sm:col-span-1">
                            <DropdownField
                                label="Acabamento"
                                options={acabamentos}
                                value={formData.acabamento}
                                onChange={(value) => onChange({ ...formData, acabamento: value })}
                            />
                        </div>

                    </div>

                    {/* Dimensões */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex flex-col items-start w-full">
                            <label className="text-sm font-bold text-gray-700 text-left mb-2 flex items-center gap-2">
                                <FaRuler className="text-gray-600" />
                                Largura (mm)
                            </label>
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
                                className="p-3 rounded-lg bg-white border border-gray-200 w-full box-border focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label className="text-sm font-bold text-gray-700 text-left mb-2 flex items-center gap-2">
                                <FaRuler className="text-gray-600" />
                                Altura (mm)
                            </label>
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
                                className="p-3 rounded-lg bg-white border border-gray-200 w-full box-border focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label className="text-sm font-bold text-gray-700 text-left mb-2 flex items-center gap-2">
                                <FaRuler className="text-gray-600" />
                                Profundidade (mm)
                            </label>
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
                                className="p-3 rounded-lg bg-white border border-gray-200 w-full box-border focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Descrição */}
                    <div className="flex flex-col items-start w-full col-span-2">
                        <label className="text-sm font-bold text-gray-700 text-left mb-2">
                            Descrição
                        </label>
                        <textarea
                            placeholder="Descreva as características do produto..."
                            value={formData.descricao}
                            onChange={(e) => onChange({ ...formData, descricao: e.target.value })}
                            className="p-4 rounded-xl bg-gray-50 border border-gray-200 w-full h-32 resize-vertical box-border focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Preço, Desconto e Estoque */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full col-span-2">
                        <div className="flex flex-col items-start w-full">
                            <label className="text-sm font-bold text-gray-700 text-left mb-2">
                                Preço
                            </label>
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
                                className="p-4 rounded-xl bg-gray-50 border border-gray-200 w-full box-border focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label className="text-sm font-bold text-gray-700 text-left mb-2">
                                Desconto (%)
                            </label>
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
                                className="p-4 rounded-xl bg-gray-50 border border-gray-200 w-full box-border focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label className="text-sm font-bold text-gray-700 text-left mb-2">
                                Quantidade em Estoque
                            </label>
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
                                className="p-4 rounded-xl bg-gray-50 border border-gray-200 w-full box-border focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Campos de ID e Data (se existir) */}
                    {formData._id && (
                        <>
                            <div className="flex flex-col items-start w-full">
                                <label className="text-sm font-bold text-gray-700 text-left mb-2">
                                    ID do Produto
                                </label>
                                <input
                                    type="text"
                                    value={formData._id}
                                    readOnly
                                    className="p-4 rounded-xl bg-gray-100 border border-gray-300 w-full box-border text-gray-600"
                                />
                            </div>
                            <div className="flex flex-col items-start w-full">
                                <label className="text-sm font-bold text-gray-700 text-left mb-2">
                                    Data de Criação
                                </label>
                                <input
                                    type="text"
                                    value={formData.createAt ? new Date(formData.createAt).toLocaleString() : ""}
                                    readOnly
                                    className="p-4 rounded-xl bg-gray-100 border border-gray-300 w-full box-border text-gray-600"
                                />
                            </div>
                        </>
                    )}

                    {/* Botões */}
                    {formData._id ? (
                        <div className="flex flex-col sm:flex-row justify-between gap-4 col-span-2 mt-4">
                            <Button type="submit" variant="primary" className="group">
                                <FaSave className="text-white group-hover:scale-110 transition-transform" />
                                <TextButton variant="primary">Salvar Alterações</TextButton>
                            </Button>
                            <Button type="button" onClick={onDelete} variant="danger" className="group">
                                <FaTrash className="text-white group-hover:scale-110 transition-transform" />
                                <TextButton variant="danger">Excluir Produto</TextButton>
                            </Button>
                        </div>
                    ) : (
                        <div className="col-span-2 mt-4">
                            <Button type="submit" variant="primary" className="group">
                                <FaSave className="text-white group-hover:scale-110 transition-transform" />
                                <TextButton variant="primary">Cadastrar Produto</TextButton>
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
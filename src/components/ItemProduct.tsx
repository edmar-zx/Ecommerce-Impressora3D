// src/components/ProductItem.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Produto } from '@/types/product';

interface ProductItemProps {
    produto: Produto;
    onAddToCart?: () => void;
    className?: string;
}

export function ItemProduct({ produto, onAddToCart, className = '' }: ProductItemProps) {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    // Função para tratar a imagem que pode ser string ou File
    const getImageSrc = () => {
        if (imageError) {
            return '/images/placeholder.png';
        }

        if (typeof produto.imagem === 'string') {
            return produto.imagem;
        }

        // Se for File, criar URL temporária (apenas para preview)
        if (produto.imagem instanceof File) {
            return URL.createObjectURL(produto.imagem);
        }

        return '/images/placeholder.png';
    };

    // Calcular preço com desconto
    const calcularPrecoComDesconto = () => {
        if (produto.desconto > 0) {
            return produto.preco * (1 - produto.desconto / 100);
        }
        return produto.preco;
    };

    const precoFinal = calcularPrecoComDesconto();
    const emEstoque = produto.estoque > 0;

    return (
        <article 
            className={`group flex flex-col bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-300 focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-2 ${className}`}
            aria-label={`Produto: ${produto.nome}`}
            tabIndex={0}
        >
            {/* Container da Imagem */}
            <div className="relative w-full h-64 mb-4 bg-gray-50 rounded-xl overflow-hidden">
                {imageLoading && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
                )}
                
                <Image
                    src={getImageSrc()}
                    alt={produto.nome}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                    className={`object-contain object-center transition-transform duration-500 group-hover:scale-105 ${
                        imageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    priority={false}
                />
                
                
                {/* Badge de Desconto */}
                {produto.desconto > 0 && (
                    <span className={`absolute top-3 ${produto.destaque ? 'left-20' : 'left-3'} bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold`}>
                        -{produto.desconto}%
                    </span>
                )}
                
                {/* Badge de Estoque */}
                {!emEstoque && (
                    <span className="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Esgotado
                    </span>
                )}
            </div>

            {/* Informações do Produto */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-gray-900 font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]  group-hover:text-gray-700 transition-colors">
                    {produto.nome}
                </h3>

                {/* Informações técnicas resumidas */}
                <div className="mb-3 space-y-1">
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium">Material:</span> {produto.material}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium">Cor:</span> {produto.cor}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium">Acabamento:</span> {produto.acabamento}
                    </p>
                </div>

                {/* Seção de Preço */}
                <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        {produto.desconto > 0 ? (
                            <>
                                <p className="text-gray-900 font-bold text-xl">
                                    {precoFinal.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </p>
                                <p className="text-gray-500 line-through text-sm">
                                    {produto.preco.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </p>
                            </>
                        ) : (
                            <p className="text-gray-900 font-bold text-xl">
                                {produto.preco.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </p>
                        )}
                    </div>

                    {/* Informações de produção e estoque */}
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Estoque: {produto.estoque} un.</span>
                        <span>Produção: {produto.tempoEstimadoProducao}</span>
                    </div>

                    {/* Botão Adicionar ao Carrinho */}
                    <button
                        onClick={onAddToCart}
                        className="w-full bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                        aria-label={`Adicionar ${produto.nome} ao carrinho`}
                        disabled={!emEstoque}
                    >
                        {emEstoque ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
                    </button>
                </div>
            </div>
        </article>
    );
}








/* VERSAO BASEEE


// src/components/ItemProduct.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { Produto } from '@/types/product';

interface ItemProductProps {
    produto: Produto;
    onAddToCart?: () => void;
}

export function ItemProduct({ produto, onAddToCart }: ItemProductProps) {
    return (
       <div className=" flex flex-col justify-between ">

          
            <div className="w-full h-100 relative mb-5 bg-[#E0E0E0] rounded-xl">
                <Image
                    src={typeof produto.imagem === 'string' ? produto.imagem : '/images/placeholder.png'}
                    alt={produto.nome}
                    fill
                    sizes="(max-width: 768px) 200vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain object-center"
                />
            </div>

       
            <h3 className="text-black font-semibold text-xl mb-5 line-clamp-2 min-h-[3.5rem]">
                {produto.nome}
            </h3>

    
            <p className="text-black font-bold text-lg mb-5">
                {produto.preco.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })}
            </p>


            <button
                onClick={onAddToCart}
                className="w-fit  px-5 py-3 border rounded-full border-[#2C2C2C] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-white transition-colors font-medium"
            >
                Adicionar ao carrinho
            </button>

        </div>
    );
}


























*/

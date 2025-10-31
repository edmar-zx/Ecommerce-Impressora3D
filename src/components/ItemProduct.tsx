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

    const getImageSrc = () => {
        if (imageError) {
            return '/images/placeholder.png';
        }

        if (typeof produto.imagem === 'string') {
            return produto.imagem;
        }

        if (produto.imagem instanceof File) {
            return URL.createObjectURL(produto.imagem);
        }

        return '/images/placeholder.png';
    };

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
                
                {produto.desconto > 0 && (
                    <span className={`absolute top-3 ${produto.destaque ? 'left-20' : 'left-3'} bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold`}>
                        -{produto.desconto}%
                    </span>
                )}

                {!emEstoque && (
                    <span className="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Esgotado
                    </span>
                )}
            </div>

            <div className="flex flex-col flex-grow">
                <h3 className="text-gray-900 font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]  group-hover:text-gray-700 transition-colors">
                    {produto.nome}
                </h3>

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

                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Estoque: {produto.estoque} un.</span>
                        <span>Produção: {produto.tempoEstimadoProducao}</span>
                    </div>

                    <button
                        onClick={onAddToCart}
                        className="w-full bg-[#2C2C2C]  text-white px-6 py-3 rounded-full font-medium hover:bg-[#E74C3C] active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"

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
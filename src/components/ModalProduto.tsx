'use client';

import React, { useState, useEffect } from "react";
import { Produto } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModalProdutoProps {
  formData: Produto;
  onChange: (data: Produto) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
  buttonText?: string;
}

export function ModalProduto({
  formData,
  onChange,
  onSubmit,
  onDelete,
  buttonText = "Salvar",
}: ModalProdutoProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof formData.imagem === "string" && formData.imagem !== "") {
      setPreview(formData.imagem);
    } else if (formData.imagem instanceof File) {
      setPreview(URL.createObjectURL(formData.imagem));
    } else {
      setPreview(null);
    }
  }, [formData.imagem]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: Number(value) });
  };

  const handleDimensaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...formData,
      dimensoes: { ...formData.dimensoes, [name]: Number(value) },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ ...formData, imagem: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Produto</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* NOME */}
          <div>
            <Label>Nome</Label>
            <Input
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* DESCRIÇÃO */}
          <div>
            <Label>Descrição</Label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          {/* CATEGORIA / MATERIAL / COR */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Categoria</Label>
              <Input
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label>Material</Label>
              <Input
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label>Cor</Label>
              <Input
                name="cor"
                value={formData.cor}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* ACABAMENTO / PESO / PREÇO */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Acabamento</Label>
              <Input
                name="acabamento"
                value={formData.acabamento}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label>Peso (kg)</Label>
              <Input
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div>
              <Label>Preço (R$)</Label>
              <Input
                type="number"
                name="preco"
                value={formData.preco}
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>

          {/* DESCONTO / ESTOQUE / TEMPO */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Desconto (%)</Label>
              <Input
                type="number"
                name="desconto"
                value={formData.desconto}
                onChange={handleNumberChange}
              />
            </div>
            <div>
              <Label>Estoque</Label>
              <Input
                type="number"
                name="estoque"
                value={formData.estoque}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div>
              <Label>Tempo de Produção</Label>
              <Input
                name="tempoEstimadoProducao"
                value={formData.tempoEstimadoProducao}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* DIMENSÕES */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Largura (cm)</Label>
              <Input
                type="number"
                name="largura"
                value={formData.dimensoes.largura}
                onChange={handleDimensaoChange}
                required
              />
            </div>
            <div>
              <Label>Altura (cm)</Label>
              <Input
                type="number"
                name="altura"
                value={formData.dimensoes.altura}
                onChange={handleDimensaoChange}
                required
              />
            </div>
            <div>
              <Label>Profundidade (cm)</Label>
              <Input
                type="number"
                name="profundidade"
                value={formData.dimensoes.profundidade}
                onChange={handleDimensaoChange}
                required
              />
            </div>
          </div>

          {/* IMAGEM */}
          <div>
            <Label>Imagem do Produto</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <div className="mt-3">
                <Image
                  src={preview}
                  alt="Prévia da imagem"
                  width={100}
                  height={100}
                  className="rounded border"
                />
              </div>
            )}
          </div>

          {/* BOTÕES */}
          <div className="flex justify-between mt-6">
            {onDelete && (
              <Button type="button" variant="destructive" onClick={onDelete}>
                Excluir
              </Button>
            )}
            <Button type="submit">{buttonText}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

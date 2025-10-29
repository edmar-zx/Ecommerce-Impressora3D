'use client';
import React from 'react';

interface ModalDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    produtoNome: string;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}

export const ModalDelete: React.FC<ModalDeleteProps> = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    produtoNome,
    title = "Confirmar Exclusão",
    message = "Tem certeza que deseja deletar o produto",
    confirmText = "Deletar",
    cancelText = "Cancelar"
}) => {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[1000]"
                onClick={onClose}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-[1001] w-96">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                </h3>
                <p className="text-gray-600 mb-6">
                    {message} <strong>"{produtoNome}"</strong>? 
                    Esta ação não pode ser desfeita.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </>
    );
};
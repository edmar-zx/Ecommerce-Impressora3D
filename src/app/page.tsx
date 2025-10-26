'use client';
import React from 'react';
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen">
      <Link href="/admin/DashboardProduct">
        <h1 className="text-black font-sans text-center text-[24px]">Cadastrar Produtos</h1>
        <h1>Olá</h1>
      </Link>
    </div>
  );
}

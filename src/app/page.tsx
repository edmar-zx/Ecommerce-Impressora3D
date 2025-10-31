'use client';
import React from 'react';
import Link from "next/link";
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';

import HeroSection from '@/components/HeroSection';
import { AllProductsList } from '@/components/AllProductsList';
import { FeaturedProductsCarousel } from '@/components/FeaturedProductsCarousel';

export default function Home() {
  return (
    <div>
      <Link href="/admin/DashboardProduct">
        <h1 className="text-black font-sans text-center text-[24px]">Cadastrar Produtos</h1>
      </Link>
      <Hero />
      <Categories />
      <FeaturedProductsCarousel />
      <HeroSection />

      <section id='allProducts'>
        <AllProductsList />
      </section>
    </div>
  );
}
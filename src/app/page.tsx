'use client';
import React from 'react';
import Link from "next/link";
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';

import HeroSection from '@/components/HeroSection';
import { AllProductsList } from '@/components/AllProductsList';
import { FeaturedProductsCarousel } from '@/components/FeaturedProductsCarousel';
import About from '@/components/About';

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-[90%] flex flex-col gap-30 mt-10'>
        <Hero />
        <Categories />
        <FeaturedProductsCarousel />
        <HeroSection />
       
        <section id='allProducts'>
          <AllProductsList />
        </section>
         <About/>
      </div>

    </div>
  );
}
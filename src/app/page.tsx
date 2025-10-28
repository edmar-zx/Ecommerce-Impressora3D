'use client';
import React from 'react';
import styled from 'styled-components';
import Link from "next/link";
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import { ProductList } from './DashboardProduct/styles';


export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <ProductList />
    </div>
  );
}

const Container = styled.div`
  height: 100vh;
`;

const Title = styled.h1`
  color: #000;
  font-family: Arial, sans-serif;
  text-align: center;
  font-size: 24px;
`;


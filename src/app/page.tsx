'use client';
import React from 'react';
import styled from 'styled-components';
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Link href="/admin/DashboardProduct">
        <Title>Cadastrar Produtos</Title>
        <h1>Olá</h1>
      </Link>
    </Container>
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
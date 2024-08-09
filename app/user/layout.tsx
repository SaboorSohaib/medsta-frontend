'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/redux/provider';
import Navbar from '../genral/navbar';
import Footer from '../genral/footer';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'Medsta',
  description: 'Medsta',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

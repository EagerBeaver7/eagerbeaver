import React from 'react';
import './globals.css'
import Header from './_common/Header/page';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eager Beaver',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}

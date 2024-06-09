'use client';

import './globals.css';
import { ReactNode } from 'react';
import { StoreProvider } from '../context/StoreContext';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

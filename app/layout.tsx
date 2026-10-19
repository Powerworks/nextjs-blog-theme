import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Next.js Blog Theme',
  description: 'A modern Next.js + Tailwind blog starter.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased text-lg bg-white dark:bg-gray-900 dark:text-white leading-base`}>
        {children}
      </body>
    </html>
  );
}

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/query-client';

export const metadata = {
  title: 'Culinary Blog - Blog Ẩm Thực & Chia Sẻ Công Thức Nấu Ăn',
  description: 'Nền tảng blog chia sẻ công thức nấu ăn, mẹo vặt nhà bếp và dữ liệu vi mô chuẩn SEO Recipe JSON-LD.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 text-slate-900 min-h-screen antialiased">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}

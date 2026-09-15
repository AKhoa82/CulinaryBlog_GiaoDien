import React from 'react';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#F5F0E6] flex flex-col font-sans selection:bg-[#C6A15B]/25 selection:text-[#022C24]">
      {children}
    </div>
  );
}


import React from 'react';
import { DashboardSidebar } from '../../components/layout/DashboardSidebar';

export default function DashboardLayout({
  children,
  currentPath = '/dashboard',
  onNavigate = () => {},
}: {
  children: React.ReactNode;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}) {
  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#1C2421] flex flex-col md:flex-row">
      <DashboardSidebar currentPath={currentPath} onNavigate={onNavigate} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

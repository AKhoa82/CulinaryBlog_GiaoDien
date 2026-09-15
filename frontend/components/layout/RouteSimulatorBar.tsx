import React, { useState } from 'react';
import { Layers, Sparkles, Compass, ChevronDown, ChevronUp, Code2 } from 'lucide-react';

export interface RouteSimulatorBarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isLoadingSkeleton: boolean;
  onToggleSkeleton: () => void;
}

export const RouteSimulatorBar: React.FC<RouteSimulatorBarProps> = ({
  currentPath,
  onNavigate,
  isLoadingSkeleton,
  onToggleSkeleton,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Map URLs to Next.js App Router file conventions
  const getAppRouterFilePath = (path: string): string => {
    if (path === '/') return 'frontend/app/page.tsx';
    if (path === '/recipes') return 'frontend/app/recipes/page.tsx';
    if (path.startsWith('/recipes/')) return 'frontend/app/recipes/[slug]/page.tsx';
    if (path === '/categories') return 'frontend/app/categories/page.tsx';
    if (path.startsWith('/categories/')) return 'frontend/app/categories/[slug]/page.tsx';
    if (path === '/auth/login') return 'frontend/app/(auth)/login/page.tsx';
    if (path === '/auth/register') return 'frontend/app/(auth)/register/page.tsx';
    if (path === '/dashboard') return 'frontend/app/dashboard/page.tsx';
    if (path === '/dashboard/recipes') return 'frontend/app/dashboard/recipes/page.tsx';
    if (path === '/dashboard/recipes/new') return 'frontend/app/dashboard/recipes/new/page.tsx';
    if (path.includes('/edit')) return 'frontend/app/dashboard/recipes/[id]/edit/page.tsx';
    if (path === '/dashboard/categories') return 'frontend/app/dashboard/categories/page.tsx';
    if (path === '/profile') return 'frontend/app/profile/page.tsx';
    if (path.startsWith('/search')) return 'frontend/app/search/page.tsx';
    return 'frontend/app/page.tsx';
  };

  const routePresets = [
    { label: 'Trang chủ (/)', path: '/' },
    { label: 'Công thức (/recipes)', path: '/recipes' },
    { label: 'Chi tiết (/recipes/[slug])', path: '/recipes/pho-bo-ha-noi-truyen-thong' },
    { label: 'Danh mục (/categories)', path: '/categories' },
    { label: 'Món nước (/categories/[slug])', path: '/categories/mon-nuoc' },
    { label: 'Đăng nhập (/auth/login)', path: '/auth/login' },
    { label: 'Đăng ký (/auth/register)', path: '/auth/register' },
    { label: 'Dashboard (/dashboard)', path: '/dashboard' },
    { label: 'QL Công thức (/dashboard/recipes)', path: '/dashboard/recipes' },
    { label: 'Tạo công thức (/recipes/new)', path: '/dashboard/recipes/new' },
    { label: 'Sửa công thức (/[id]/edit)', path: '/dashboard/recipes/rec-1/edit' },
    { label: 'QL Danh mục (/categories)', path: '/dashboard/categories' },
    { label: 'Hồ sơ (/profile)', path: '/profile' },
    { label: 'Tìm kiếm (/search)', path: '/search?q=phở' },
  ];

  return (
    <div className="bg-[#0A261E] text-[#E4ECE3] border-b border-[#064E3B]/60 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-white bg-[#064E3B] px-2.5 py-1 rounded-lg border border-[#0F3D2E]">
            <Layers className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span className="text-[11px] text-[#E4ECE3]">Next.js 14 App Router Skeleton</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[#8FA89B] font-mono text-[11px]">
            <Code2 className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Route file:</span>
            <span className="text-[#C9A45C] bg-[#072018] px-2 py-0.5 rounded border border-[#0F3D2E]">
              {getAppRouterFilePath(currentPath)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Skeleton Toggle Button */}
          <button
            onClick={onToggleSkeleton}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold text-[11px] transition-all cursor-pointer border ${
              isLoadingSkeleton
                ? 'bg-[#C56A4A] text-white border-[#B85D3B] shadow-xs'
                : 'bg-[#064E3B] text-[#E4ECE3] border-[#0F3D2E] hover:bg-[#047857] hover:text-white'
            }`}
            title="Nhấn để mô phỏng trạng thái Skeleton Loading khi tải dữ liệu từ API"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isLoadingSkeleton ? 'animate-spin text-[#C9A45C]' : ''}`} />
            <span>Mô phỏng Loading Skeleton: {isLoadingSkeleton ? 'ĐANG BẬT' : 'TẮT'}</span>
          </button>

          {/* Quick Route Switcher collapse */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#064E3B] hover:bg-[#047857] text-[#E4ECE3] cursor-pointer border border-[#0F3D2E]"
          >
            <Compass className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span className="hidden md:inline">14 Tuyến Route</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expandable Route quick jumper bar */}
      {isExpanded && (
        <div className="bg-[#072018] border-t border-[#064E3B]/40 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[10px] uppercase font-bold text-[#8FA89B] whitespace-nowrap mr-1">
              Chuyển nhanh:
            </span>
            {routePresets.map((r) => {
              const active = currentPath === r.path;
              return (
                <button
                  key={r.path}
                  onClick={() => onNavigate(r.path)}
                  className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#C56A4A] text-white font-bold shadow-xs'
                      : 'bg-[#064E3B]/70 text-[#D4E3D2] hover:bg-[#064E3B] hover:text-white border border-[#0F3D2E]/60'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

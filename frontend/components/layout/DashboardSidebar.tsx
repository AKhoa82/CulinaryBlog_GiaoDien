import React from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  PlusCircle,
  FolderTree,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export interface DashboardSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ currentPath, onNavigate }) => {
  const menuItems = [
    {
      label: 'Tổng quan Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: 'Quản lý công thức',
      path: '/dashboard/recipes',
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
    {
      label: 'Thêm công thức mới',
      path: '/dashboard/recipes/new',
      icon: <PlusCircle className="w-4 h-4" />,
    },
    {
      label: 'Quản lý danh mục',
      path: '/dashboard/categories',
      icon: <FolderTree className="w-4 h-4" />,
    },
    {
      label: 'Hồ sơ cá nhân',
      path: '/profile',
      icon: <User className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#FBF8F1] border-r border-[#E5DECE] min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* User Card */}
        <div className="p-3 bg-[#F5F0E6] rounded-xl border border-[#E5DECE] flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Lê Anh Khoa"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-[#C6A15B]/30"
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-[#1C2421] truncate font-editorial">Lê Anh Khoa</h4>
            <div className="flex items-center gap-1 text-[10px] text-[#063C2F] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-[#C6A15B]" />
              <span>Bếp trưởng quản trị</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
            Quản trị nội dung
          </div>
          {menuItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#022C24] text-[#FBF8F1] shadow-2xs border border-[#C6A15B]/40'
                    : 'text-[#1C2421]/80 hover:text-[#063C2F] hover:bg-[#F5F0E6]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[#C6A15B]' : 'text-[#8D958F]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#C6A15B]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer link to public site */}
      <div className="pt-4 border-t border-[#E5DECE]">
        <button
          onClick={() => onNavigate('/')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#1C2421]/80 hover:text-[#063C2F] hover:bg-[#F5F0E6] rounded-lg transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Về trang bìa tạp chí</span>
        </button>
      </div>
    </aside>
  );
};

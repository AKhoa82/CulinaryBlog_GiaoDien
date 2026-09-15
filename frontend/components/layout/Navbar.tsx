import React, { useState } from 'react';
import { ChefHat, Search, Menu, X, Bookmark, PlusCircle, LayoutDashboard, User } from 'lucide-react';
import { Button } from '../ui/Button';

export interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  savedCount?: number;
  userRole?: 'admin' | 'author' | 'reader';
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  savedCount = 3,
  userRole = 'author',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Công thức', path: '/recipes' },
    { label: 'Danh mục', path: '/categories' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#022C24]/95 backdrop-blur-md border-b border-[#063C2F] shadow-sm text-[#FBF8F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo */}
          <div
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#063C2F] border border-[#C6A15B]/30 flex items-center justify-center text-[#FBF8F1] shadow-xs group-hover:border-[#C6A15B] transition-all">
              <ChefHat className="w-5 h-5 text-[#C6A15B]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#FBF8F1] block leading-none font-editorial">
                Culinary<span className="text-[#C6A15B] italic font-normal">Blog</span>
              </span>
              <span className="text-[9px] uppercase font-medium tracking-[0.2em] text-[#C6A15B]/80 block mt-1">
                Bản Sắc Ẩm Thực Việt
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all duration-200 cursor-pointer rounded-md ${
                    isActive
                      ? 'text-[#C6A15B] bg-[#063C2F]/70 border border-[#C6A15B]/30'
                      : 'text-[#F5F0E6]/75 hover:text-[#FBF8F1] hover:bg-[#063C2F]/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center relative max-w-xs w-full">
            <Search className="w-4 h-4 text-[#C6A15B]/70 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm món ngon, nguyên liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#062E27] border border-[#063C2F] rounded-full text-[#FBF8F1] placeholder:text-[#F5F0E6]/40 focus:bg-[#022C24] focus:border-[#C6A15B] focus:outline-none focus:ring-1 focus:ring-[#C6A15B]/30 transition-all"
            />
          </form>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => onNavigate('/search')}
              className="p-2 text-[#F5F0E6]/80 hover:text-[#C6A15B] hover:bg-[#063C2F]/50 rounded-lg lg:hidden cursor-pointer transition-colors"
              title="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('/profile')}
              className="relative p-2 text-[#F5F0E6]/80 hover:text-[#C6A15B] hover:bg-[#063C2F]/50 rounded-lg cursor-pointer transition-colors"
              title="Công thức đã lưu"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B9674A] text-[#FBF8F1] text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('/dashboard')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#F5F0E6]/85 border border-[#063C2F] hover:border-[#C6A15B]/40 hover:text-[#C6A15B] bg-[#063C2F]/40 cursor-pointer transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Dashboard</span>
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('/dashboard/recipes/new')}
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Tạo công thức
            </Button>

            {/* Profile Avatar / Login */}
            <button
              onClick={() => onNavigate('/profile')}
              className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-[#063C2F] transition-colors cursor-pointer border border-[#C6A15B]/30 ml-1 bg-[#022C24]"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Lê Anh Khoa"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-[#C6A15B]/50"
              />
              <span className="text-xs font-medium text-[#FBF8F1] hidden xl:inline pr-2">
                Lê Anh Khoa
              </span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-1">
            <button
              onClick={() => onNavigate('/search')}
              className="p-2 text-[#F5F0E6]/80 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F5F0E6]/80 hover:bg-[#063C2F] rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#063C2F] bg-[#022C24] px-4 pt-3 pb-5 space-y-3 animate-fadeIn text-[#FBF8F1]">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-[#C6A15B]/70 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm kiếm công thức..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#062E27] border border-[#063C2F] rounded-lg text-[#FBF8F1] focus:outline-none focus:border-[#C6A15B]"
            />
          </form>

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  onNavigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium ${
                  currentPath === link.path ? 'bg-[#063C2F] text-[#C6A15B] font-bold border border-[#C6A15B]/30' : 'text-[#F5F0E6]/70 hover:bg-[#063C2F]/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#063C2F] flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-[#FBF8F1] border-[#063C2F] bg-[#063C2F]/30"
              onClick={() => {
                onNavigate('/dashboard');
                setMobileMenuOpen(false);
              }}
              leftIcon={<LayoutDashboard className="w-4 h-4 text-[#C6A15B]" />}
            >
              Bảng điều khiển (Dashboard)
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                onNavigate('/dashboard/recipes/new');
                setMobileMenuOpen(false);
              }}
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Đăng công thức mới
            </Button>
            <div className="flex gap-2 pt-2">
              <button
                className="flex-1 py-2 text-xs font-medium text-[#F5F0E6]/80 hover:text-[#C6A15B] bg-[#063C2F]/40 rounded-lg border border-[#063C2F]"
                onClick={() => {
                  onNavigate('/auth/login');
                  setMobileMenuOpen(false);
                }}
              >
                Đăng nhập
              </button>
              <button
                className="flex-1 py-2 text-xs font-medium text-[#C6A15B] hover:text-[#FBF8F1] bg-[#063C2F] rounded-lg border border-[#C6A15B]/40"
                onClick={() => {
                  onNavigate('/auth/register');
                  setMobileMenuOpen(false);
                }}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

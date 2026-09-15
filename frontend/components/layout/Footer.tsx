import React from 'react';
import { ChefHat, Heart, MapPin, Mail, Github, BookOpen } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#022C24] text-[#8D958F] pt-14 pb-9 border-t border-[#063C2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & School info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-[#FBF8F1]">
              <div className="w-9 h-9 rounded-lg bg-[#063C2F] border border-[#C6A15B]/30 flex items-center justify-center shadow-xs">
                <ChefHat className="w-5 h-5 text-[#C6A15B]" />
              </div>
              <span className="text-xl font-bold tracking-tight font-editorial">
                Culinary<span className="text-[#C6A15B] italic font-normal">Blog</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#8D958F] max-w-md leading-relaxed">
              Nền tảng blog ẩm thực và chia sẻ công thức nấu ăn cao cấp. Không gian lưu giữ bản sắc hương vị truyền thống và nghệ thuật ẩm thực đương đại Việt Nam.
            </p>
            <div className="p-4 rounded-xl bg-[#063C2F]/50 border border-[#063C2F] text-xs text-[#F5F0E6]/85 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#C6A15B]">
                <BookOpen className="w-4 h-4" />
                <span>Đồ án Môn học: Phát triển Ứng dụng Web Nâng cao</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Khoa CNTT - Trường Đại học Đà Lạt (Dalat University - DLU)</span>
              </div>
              <div className="text-[#8D958F] text-[11px]">
                Nhóm sinh viên: <strong className="text-[#FBF8F1]">Lê Anh Khoa</strong> (Trưởng nhóm) và các cộng sự.
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest font-editorial">Khám phá</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/recipes')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer text-[#F5F0E6]/75"
                >
                  Tất cả công thức
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/categories')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer text-[#F5F0E6]/75"
                >
                  Danh mục món ăn
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/search')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer text-[#F5F0E6]/75"
                >
                  Tìm kiếm món ngon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/categories/an-kieng-healthy')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer text-[#F5F0E6]/75"
                >
                  Eat Clean &amp; Dưỡng sinh
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Management & Auth */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#C6A15B] uppercase tracking-widest font-editorial">Hệ thống</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/dashboard')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer text-[#F5F0E6]/75"
                >
                  Bảng điều khiển tác giả
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/dashboard/recipes/new')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer text-[#F5F0E6]/75"
                >
                  Đăng công thức mới
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/profile')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer text-[#F5F0E6]/75"
                >
                  Hồ sơ cá nhân
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/auth/login')}
                  className="hover:text-[#C6A15B] transition-colors cursor-pointer text-[#F5F0E6]/75"
                >
                  Đăng nhập / Đăng ký
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#063C2F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8D958F]">
          <p>© 2025 Culinary Blog - Bản sắc Ẩm thực Việt. Đồ án sinh viên Đại học Đà Lạt.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#C6A15B]/80 text-[11px]">
              Giao diện chuẩn bị đồ án <Heart className="w-3.5 h-3.5 text-[#B9674A] fill-[#B9674A]" /> Next.js App Router
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

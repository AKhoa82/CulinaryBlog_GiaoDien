import React from 'react';
import { FolderTree, ArrowRight, Soup, Flame, Salad, Cake, Leaf, Coffee } from 'lucide-react';
import { Category } from '../../types';
import { Skeleton } from '../../components/ui/Skeleton';

export interface CategoriesPageProps {
  categories: Category[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  categories,
  isLoading,
  onNavigate,
}) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-[#E5DECE] pb-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold mb-1">
          Bản Sắc Hương Vị
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C2421] tracking-tight font-editorial">
          Khám Phá Danh Mục Món Ăn
        </h1>
        <p className="text-xs sm:text-sm text-[#8D958F] mt-1.5 max-w-2xl">
          Tuyển chọn các thể loại món ăn theo văn hóa ẩm thực truyền thống, kỹ nghệ chế biến và phong cách sống cân bằng dưỡng sinh.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#FBF8F1] rounded-xl border border-[#E5DECE] p-4 space-y-4">
                <Skeleton variant="rounded" className="aspect-16/10 w-full" />
                <Skeleton variant="text" className="h-6 w-3/4" />
                <Skeleton variant="text" className="h-4 w-full" />
                <Skeleton variant="text" className="h-4 w-2/3" />
              </div>
            ))
          : categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate(`/categories/${cat.slug}`)}
                className="group bg-[#FBF8F1] rounded-xl border border-[#E5DECE] shadow-2xs hover:shadow-sm hover:border-[#C6A15B]/50 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#F5F0E6]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 right-3 bg-[#022C24]/85 backdrop-blur-xs text-[#FBF8F1] text-[11px] font-semibold px-3 py-1 rounded-full border border-[#C6A15B]/30 tracking-wider">
                    {cat.recipeCount} công thức
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#1C2421] group-hover:text-[#063C2F] transition-colors font-editorial">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#8D958F] line-clamp-2 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-[#E5DECE] flex items-center justify-between text-xs font-semibold text-[#063C2F] group-hover:text-[#C6A15B] transition-colors">
                    <span>Xem bộ sưu tập công thức</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

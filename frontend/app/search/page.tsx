import React, { useState, useEffect } from 'react';
import { Search, Sparkles, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { Recipe } from '../../types';
import { RecipeCard } from '../../components/recipes/RecipeCard';
import { RecipeCardSkeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';

export interface SearchPageProps {
  recipes: Recipe[];
  initialQuery?: string;
  isLoading: boolean;
  onNavigate: (path: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleBookmark: (id: string) => void;
  savedIds: string[];
}

export const SearchPage: React.FC<SearchPageProps> = ({
  recipes,
  initialQuery = '',
  isLoading,
  onNavigate,
  onSelectRecipe,
  onToggleBookmark,
  savedIds,
}) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const searchKeywords = ['Phở', 'Bún Bò', 'Ức gà', 'Eat Clean', 'Thịt kho', 'Bánh Crepe', 'Món Chay'];

  const results = recipes.filter((r) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.categoryName.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q)) ||
      r.ingredients.some((i) => i.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Search Header */}
      <div className="bg-[#FBF8F1] p-6 sm:p-8 rounded-2xl border border-[#E5DECE] shadow-2xs space-y-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold mb-1">
            Tra Cứu Ẩm Thực
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C2421] tracking-tight font-editorial">
            Tìm Kiếm Công Thức Nấu Ăn
          </h1>
          <p className="text-xs sm:text-sm text-[#8D958F] mt-1">
            Tra cứu theo tên món, nguyên liệu tinh tuyển (bắp bò, nấm hương, ức gà), danh mục hoặc kỹ thuật chế biến.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-[#C6A15B] absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Nhập tên món ăn, nguyên liệu, gia vị cần tìm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-12 py-2.5 bg-[#F5F0E6] border border-[#E5DECE] rounded-lg text-xs text-[#1C2421] placeholder:text-[#8D958F] focus:outline-none focus:border-[#C6A15B] focus:bg-[#FBF8F1] focus:ring-1 focus:ring-[#C6A15B]/30 transition-all shadow-2xs"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-2.5 text-[11px] text-[#8D958F] hover:text-[#1C2421] bg-[#E5DECE] px-2 py-0.5 rounded cursor-pointer"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Suggestion pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[#8D958F] text-[11px] uppercase tracking-wider font-semibold">Gợi ý tìm kiếm:</span>
          {searchKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setQuery(kw)}
              className="px-3 py-1 rounded-full bg-[#F5F0E6] border border-[#E5DECE] hover:bg-[#022C24] hover:text-[#FBF8F1] hover:border-[#C6A15B]/40 text-[#1C2421] transition-all cursor-pointer text-xs font-medium"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Result Status */}
      <div className="flex items-center justify-between text-xs text-[#8D958F] px-1">
        <div>
          {query ? (
            <span>
              Kết quả cho từ khóa "<strong className="text-[#1C2421] font-editorial">{query}</strong>": Tìm thấy{' '}
              <strong className="text-[#063C2F] font-editorial text-sm">{results.length}</strong> công thức
            </span>
          ) : (
            <span>Hiện có <strong className="text-[#1C2421] font-editorial">{results.length}</strong> công thức trong tuyển tập</span>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={onSelectRecipe}
              onToggleBookmark={onToggleBookmark}
              isBookmarked={savedIds.includes(recipe.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#FBF8F1] rounded-2xl border border-dashed border-[#E5DECE] p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F5F0E6] border border-[#E5DECE] flex items-center justify-center mx-auto text-[#C6A15B]">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1C2421] font-editorial">
            Không tìm thấy công thức nào cho "{query}"
          </h3>
          <p className="text-xs text-[#8D958F] max-w-sm mx-auto">
            Hãy thử tìm bằng từ khóa chung hơn, ví dụ "gà", "bò", "chay", "healthy" hoặc tên nguyên liệu.
          </p>
          <Button variant="outline" size="sm" onClick={() => setQuery('')}>
            Xóa tìm kiếm &amp; Xem tất cả
          </Button>
        </div>
      )}
    </div>
  );
};

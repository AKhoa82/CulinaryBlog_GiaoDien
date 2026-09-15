import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw, UtensilsCrossed } from 'lucide-react';
import { Recipe, Category } from '../../types';
import { RecipeCard } from '../../components/recipes/RecipeCard';
import { RecipeCardSkeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';

export interface RecipesPageProps {
  recipes: Recipe[];
  categories: Category[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleBookmark: (id: string) => void;
  savedIds: string[];
}

export const RecipesPage: React.FC<RecipesPageProps> = ({
  recipes,
  categories,
  isLoading,
  onNavigate,
  onSelectRecipe,
  onToggleBookmark,
  savedIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [maxTime, setMaxTime] = useState<number>(400);
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'calories'>('newest');

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      const matchSearch =
        searchQuery === '' ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory = selectedCategory === 'all' || r.categorySlug === selectedCategory;
      const matchDifficulty = selectedDifficulty === 'all' || r.difficulty === selectedDifficulty;
      const totalTime = r.prepTimeMinutes + r.cookTimeMinutes;
      const matchTime = totalTime <= maxTime;

      return matchSearch && matchCategory && matchDifficulty && matchTime;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'calories') return a.calories - b.calories;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [recipes, searchQuery, selectedCategory, selectedDifficulty, maxTime, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setMaxTime(400);
    setSortBy('newest');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-[#E5DECE] pb-6">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold mb-1">
          Tuyển Tập Ẩm Thực
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C2421] tracking-tight font-editorial">
          Khám Phá Công Thức Nấu Ăn
        </h1>
        <p className="text-xs sm:text-sm text-[#8D958F] mt-1.5 max-w-2xl">
          Tuyển tập các món ăn ngon từ truyền thống ba miền đến sáng tạo đương đại với hướng dẫn chi tiết từng bước.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#FBF8F1] p-6 rounded-2xl border border-[#E5DECE] shadow-2xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#C6A15B] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Tìm theo tên món ăn, nguyên liệu, hương vị (vd: phở bò, cá kho tộ, dưỡng sinh)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#F5F0E6] border border-[#E5DECE] rounded-lg text-[#1C2421] placeholder:text-[#8D958F] focus:bg-[#FBF8F1] focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-2 text-[11px] text-[#8D958F] hover:text-[#1C2421] bg-[#E5DECE] px-2 py-0.5 rounded cursor-pointer"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Category filter */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8D958F] mb-1.5">Danh mục</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#1C2421] focus:outline-none focus:border-[#C6A15B]"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty filter */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8D958F] mb-1.5">Độ khó</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#1C2421] focus:outline-none focus:border-[#C6A15B]"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="Dễ">Dễ (Dưới 30 phút)</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Khó">Khó (Cầu kỳ / hầm lâu)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8D958F] mb-1.5">Sắp xếp theo</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#1C2421] focus:outline-none focus:border-[#C6A15B]"
            >
              <option value="newest">Mới nhất</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="calories">Lượng calo thấp nhất</option>
            </select>
          </div>

          {/* Reset Filters button */}
          <div className="flex items-end">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              className="w-full h-[34px]"
            >
              Đặt lại bộ lọc
            </Button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#8D958F]">
        <div>
          Tìm thấy <strong className="text-[#1C2421] font-editorial text-sm">{filteredRecipes.length}</strong> công thức phù hợp
        </div>
        {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery !== '') && (
          <span className="text-[#063C2F] font-semibold uppercase text-[11px] tracking-wider">Đang áp dụng bộ lọc</span>
        )}
      </div>

      {/* Recipe Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
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
        <div className="bg-[#FBF8F1] rounded-2xl border border-dashed border-[#E5DECE] p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F5F0E6] border border-[#E5DECE] flex items-center justify-center mx-auto text-[#C6A15B]">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1C2421] font-editorial">Không tìm thấy công thức phù hợp</h3>
          <p className="text-xs text-[#8D958F] max-w-sm mx-auto">
            Hãy thử tìm với từ khóa khác hoặc điều chỉnh lại các tiêu chí lọc danh mục và độ khó.
          </p>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Xem tất cả công thức
          </Button>
        </div>
      )}
    </div>
  );
};

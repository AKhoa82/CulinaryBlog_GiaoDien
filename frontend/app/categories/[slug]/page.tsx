import React from 'react';
import { ArrowLeft, UtensilsCrossed } from 'lucide-react';
import { Category, Recipe } from '../../../types';
import { RecipeCard } from '../../../components/recipes/RecipeCard';
import { RecipeCardSkeleton, Skeleton } from '../../../components/ui/Skeleton';
import { Button } from '../../../components/ui/Button';

export interface CategoryDetailPageProps {
  category?: Category;
  recipes: Recipe[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleBookmark: (id: string) => void;
  savedIds: string[];
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  category,
  recipes,
  isLoading,
  onNavigate,
  onSelectRecipe,
  onToggleBookmark,
  savedIds,
}) => {
  if (isLoading || !category) {
    return (
      <div className="space-y-6 pb-16 animate-pulse">
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="rounded" className="h-44 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const categoryRecipes = recipes.filter((r) => r.categorySlug === category.slug);

  return (
    <div className="space-y-8 pb-16">
      <button
        onClick={() => onNavigate('/categories')}
        className="flex items-center gap-1.5 text-xs font-semibold text-[#8D958F] hover:text-[#063C2F] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-[#C6A15B]" />
        <span>Quay lại tất cả danh mục</span>
      </button>

      {/* Category Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[#022C24] text-[#FBF8F1] p-8 sm:p-12 shadow-sm border border-[#063C2F]">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6A15B] bg-[#063C2F] px-3 py-1 rounded-full border border-[#C6A15B]/30">
            Chuyên Đề Ẩm Thực
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-editorial text-[#FBF8F1]">{category.name}</h1>
          <p className="text-xs sm:text-sm text-[#F5F0E6]/80 leading-relaxed max-w-xl font-normal">
            {category.description}
          </p>
          <div className="text-xs text-[#8D958F] pt-2">
            Tuyển chọn: <strong className="text-[#C6A15B] font-editorial text-sm">{categoryRecipes.length}</strong> công thức tinh hoa
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none mix-blend-luminosity">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Recipe Grid for this category */}
      {categoryRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryRecipes.map((recipe) => (
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
          <h3 className="text-base font-bold text-[#1C2421] font-editorial">Chưa có công thức nào trong danh mục này</h3>
          <p className="text-xs text-[#8D958F] max-w-sm mx-auto">
            Hãy là người đầu tiên đóng góp công thức món ăn mới cho danh mục này nhé!
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate('/dashboard/recipes/new')}
          >
            Đăng công thức ngay
          </Button>
        </div>
      )}
    </div>
  );
};

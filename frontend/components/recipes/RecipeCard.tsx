import React from 'react';
import { Clock, Users, Flame, Star, Bookmark } from 'lucide-react';
import { Recipe } from '../../types';
import { Badge } from '../ui/Badge';
import { formatTime } from '../../lib/utils';

export interface RecipeCardProps {
  recipe: Recipe;
  onSelect?: (recipe: Recipe) => void;
  onToggleBookmark?: (recipeId: string) => void;
  isBookmarked?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelect,
  onToggleBookmark,
  isBookmarked = false,
}) => {
  const difficultyVariant = {
    'Dễ': 'success' as const,
    'Trung bình': 'warning' as const,
    'Khó': 'danger' as const,
  }[recipe.difficulty] || 'default';

  return (
    <article
      onClick={() => onSelect?.(recipe)}
      className="group bg-[#FBF8F1] rounded-xl border border-[#E5DECE] shadow-2xs hover:shadow-sm hover:border-[#C6A15B]/50 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#F5F0E6]">
        <img
          src={recipe.coverImage}
          alt={recipe.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="inline-flex items-center text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full bg-[#022C24]/85 text-[#FBF8F1] backdrop-blur-xs border border-[#C6A15B]/30">
            {recipe.categoryName}
          </span>
          <Badge variant={difficultyVariant} size="sm" className="backdrop-blur-md shadow-2xs text-[10px]">
            {recipe.difficulty}
          </Badge>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark?.(recipe.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs cursor-pointer ${
            isBookmarked
              ? 'bg-[#B9674A] text-[#FBF8F1]'
              : 'bg-[#FBF8F1]/85 text-[#1C2421] hover:bg-[#FBF8F1] hover:text-[#B9674A]'
          }`}
          title={isBookmarked ? 'Bỏ lưu công thức' : 'Lưu công thức vào sổ tay'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[#C6A15B] text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold text-[#1C2421]">{recipe.rating.toFixed(1)}</span>
            <span className="text-[#8D958F] font-normal text-[11px]">({recipe.reviewCount} đánh giá)</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#1C2421] line-clamp-2 group-hover:text-[#063C2F] transition-colors leading-snug mb-2 font-editorial">
            {recipe.title}
          </h3>

          <p className="text-xs text-[#8D958F] line-clamp-2 leading-relaxed mb-4">
            {recipe.description}
          </p>
        </div>

        <div className="space-y-3 pt-3.5 border-t border-[#E5DECE]">
          <div className="flex items-center justify-between text-xs text-[#8D958F]">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#A8894D] shrink-0" />
              <span>{formatTime(recipe.prepTimeMinutes + recipe.cookTimeMinutes)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#A8894D] shrink-0" />
              <span>{recipe.servings} phần</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#B9674A] shrink-0" />
              <span>{recipe.calories} kcal</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <img
                src={recipe.author.avatar}
                alt={recipe.author.name}
                className="w-5 h-5 rounded-full object-cover ring-1 ring-[#DDD4C4]"
              />
              <span className="text-xs font-medium text-[#1C2421]/80 truncate max-w-[120px]">
                {recipe.author.name}
              </span>
            </div>
            <span className="text-xs font-semibold text-[#063C2F] group-hover:text-[#A8894D] group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1">
              Chi tiết công thức →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

import React, { useState } from 'react';
import {
  Clock,
  Users,
  Flame,
  Star,
  Bookmark,
  Share2,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowLeft,
  Calendar,
  ChefHat,
  Printer,
} from 'lucide-react';
import { Recipe } from '../../../types';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { NutritionTable } from '../../../components/recipes/NutritionTable';
import { JsonLdPreview } from '../../../components/recipes/JsonLdPreview';
import { Skeleton } from '../../../components/ui/Skeleton';
import { formatTime, formatDate, generateRecipeJsonLd } from '../../../lib/utils';

export interface RecipeDetailPageProps {
  recipe?: Recipe;
  isLoading: boolean;
  onNavigate: (path: string) => void;
  onToggleBookmark: (id: string) => void;
  isBookmarked: boolean;
}

export const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({
  recipe,
  isLoading,
  onNavigate,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  if (isLoading || !recipe) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-pulse">
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="text" className="h-10 w-3/4" />
        <div className="flex gap-4">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="space-y-2">
            <Skeleton variant="text" width={120} height={16} />
            <Skeleton variant="text" width={80} height={12} />
          </div>
        </div>
        <Skeleton variant="rounded" className="w-full h-80" />
        <div className="grid grid-cols-4 gap-4">
          <Skeleton variant="rounded" className="h-20" />
          <Skeleton variant="rounded" className="h-20" />
          <Skeleton variant="rounded" className="h-20" />
          <Skeleton variant="rounded" className="h-20" />
        </div>
        <div className="space-y-4">
          <Skeleton variant="text" className="h-6 w-1/4" />
          <Skeleton variant="text" className="h-4 w-full" />
          <Skeleton variant="text" className="h-4 w-full" />
        </div>
      </div>
    );
  }

  const baseServings = recipe.servings;
  const currentServings = Math.max(1, Math.round(baseServings * servingsMultiplier));

  const toggleIngredient = (id: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  // Embed real JSON-LD data
  const jsonLdData = generateRecipeJsonLd(recipe);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Real Schema.org JSON-LD tag for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Top back button & actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/recipes')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#8D958F] hover:text-[#063C2F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#C6A15B]" />
          <span>Quay lại tuyển tập công thức</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleBookmark(recipe.id)}
            leftIcon={<Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#B9674A] text-[#B9674A]' : 'text-[#C6A15B]'}`} />}
          >
            {isBookmarked ? 'Đã lưu sổ tay' : 'Lưu công thức'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: recipe.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Đã sao chép liên kết bài viết!');
              }
            }}
            leftIcon={<Share2 className="w-3.5 h-3.5 text-[#C6A15B]" />}
          >
            Chia sẻ
          </Button>
        </div>
      </div>

      {/* Header Editorial Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            onClick={() => onNavigate(`/categories/${recipe.categorySlug}`)}
            className="text-[11px] font-semibold uppercase tracking-wider text-[#FBF8F1] bg-[#022C24] hover:bg-[#063C2F] border border-[#C6A15B]/30 px-3 py-1 rounded-full cursor-pointer transition-colors"
          >
            {recipe.categoryName}
          </span>
          <Badge
            variant={
              recipe.difficulty === 'Dễ' ? 'success' : recipe.difficulty === 'Trung bình' ? 'warning' : 'danger'
            }
          >
            Độ khó: {recipe.difficulty}
          </Badge>
          <div className="flex items-center gap-1 text-[#C6A15B] text-xs font-bold ml-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-[#1C2421]">{recipe.rating.toFixed(1)}</span>
            <span className="text-[#8D958F] font-normal">({recipe.reviewCount} lượt đánh giá)</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C2421] tracking-tight leading-[1.2] font-editorial">
          {recipe.title}
        </h1>

        <p className="text-sm sm:text-base text-[#1C2421]/80 leading-relaxed font-normal">
          {recipe.description}
        </p>

        {/* Author info */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5DECE]">
          <div className="flex items-center gap-3">
            <img
              src={recipe.author.avatar}
              alt={recipe.author.name}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-[#C6A15B]/50"
            />
            <div>
              <div className="text-xs font-bold text-[#1C2421] font-editorial">{recipe.author.name}</div>
              <div className="text-[11px] text-[#8D958F] flex items-center gap-2">
                <span className="capitalize">{recipe.author.role === 'admin' ? 'Bếp trưởng điều hành' : 'Tác giả ẩm thực'}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#A8894D]" />
                  {formatDate(recipe.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden shadow-sm bg-[#F5F0E6] border border-[#E5DECE]">
        <img
          src={recipe.coverImage}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Quick Specs Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FBF8F1] p-4 rounded-xl border border-[#E5DECE] shadow-2xs text-center">
        <div className="p-2">
          <div className="text-[10px] uppercase tracking-widest text-[#8D958F] font-semibold mb-1 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#C6A15B]" /> Chuẩn bị
          </div>
          <div className="text-sm font-bold text-[#1C2421] font-editorial">{recipe.prepTimeMinutes} phút</div>
        </div>
        <div className="p-2 border-l border-[#E5DECE]">
          <div className="text-[10px] uppercase tracking-widest text-[#8D958F] font-semibold mb-1 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#063C2F]" /> Nấu chín
          </div>
          <div className="text-sm font-bold text-[#063C2F] font-editorial">{formatTime(recipe.cookTimeMinutes)}</div>
        </div>
        <div className="p-2 border-l border-[#E5DECE]">
          <div className="text-[10px] uppercase tracking-widest text-[#8D958F] font-semibold mb-1 flex items-center justify-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#063C2F]" /> Khẩu phần
          </div>
          <div className="text-sm font-bold text-[#1C2421] font-editorial">{currentServings} phần</div>
        </div>
        <div className="p-2 border-l border-[#E5DECE]">
          <div className="text-[10px] uppercase tracking-widest text-[#8D958F] font-semibold mb-1 flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#B9674A]" /> Lượng calo
          </div>
          <div className="text-sm font-bold text-[#B9674A] font-editorial">{recipe.calories} kcal</div>
        </div>
      </div>

      {/* Ingredients Section */}
      <section className="bg-[#FBF8F1] rounded-2xl border border-[#E5DECE] p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DECE] pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#1C2421] tracking-tight flex items-center gap-2 font-editorial">
              <span>Nguyên Liệu Cần Chuẩn Bị</span>
              <span className="text-xs font-normal text-[#8D958F]">
                ({recipe.ingredients.length} loại)
              </span>
            </h2>
            <p className="text-xs text-[#8D958F] mt-1">
              Đánh dấu các nguyên liệu bạn đã chuẩn bị sẵn sàng
            </p>
          </div>

          {/* Servings Adjuster */}
          <div className="flex items-center gap-2 bg-[#F5F0E6] border border-[#E5DECE] p-1.5 rounded-lg text-xs">
            <span className="text-[#1C2421] font-medium px-1">Khẩu phần:</span>
            <button
              onClick={() => setServingsMultiplier((prev) => Math.max(0.5, prev - 0.5))}
              className="w-6 h-6 rounded bg-[#FBF8F1] font-bold text-[#1C2421] hover:bg-[#E5DECE] border border-[#DDD4C4] flex items-center justify-center cursor-pointer transition-colors"
            >
              -
            </button>
            <span className="font-bold text-[#063C2F] px-1 font-editorial text-sm">{currentServings} phần</span>
            <button
              onClick={() => setServingsMultiplier((prev) => prev + 0.5)}
              className="w-6 h-6 rounded bg-[#FBF8F1] font-bold text-[#1C2421] hover:bg-[#E5DECE] border border-[#DDD4C4] flex items-center justify-center cursor-pointer transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Ingredients list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recipe.ingredients.map((ing) => {
            const isChecked = !!checkedIngredients[ing.id];
            const numericAmount = parseFloat(ing.amount);
            const displayAmount = !isNaN(numericAmount)
              ? (numericAmount * servingsMultiplier).toFixed(numericAmount % 1 === 0 ? 0 : 1)
              : ing.amount;

            return (
              <div
                key={ing.id}
                onClick={() => toggleIngredient(ing.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-[#F5F0E6]/60 border-[#E5DECE] text-[#8D958F] line-through'
                    : 'bg-[#F5F0E6] border-[#E5DECE] hover:bg-[#EDE6D7] text-[#1C2421]'
                }`}
              >
                <div
                  className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border transition-colors ${
                    isChecked
                      ? 'bg-[#063C2F] border-[#063C2F] text-[#FBF8F1]'
                      : 'border-[#DDD4C4] bg-[#FBF8F1]'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="text-xs flex-1">
                  <span className="font-bold text-[#1C2421] mr-1.5 font-editorial">
                    {displayAmount} {ing.unit}
                  </span>
                  <span>{ing.name}</span>
                  {ing.notes && (
                    <span className="block text-[11px] text-[#8D958F] not-italic no-underline mt-0.5">
                      ({ing.notes})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cooking Instructions Steps */}
      <section className="bg-[#FBF8F1] rounded-2xl border border-[#E5DECE] p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="border-b border-[#E5DECE] pb-4">
          <h2 className="text-xl font-bold text-[#1C2421] tracking-tight flex items-center gap-2 font-editorial">
            <span>Các Bước Thực Hiện</span>
            <span className="text-xs font-normal text-[#8D958F]">
              ({recipe.instructions.length} bước)
            </span>
          </h2>
          <p className="text-xs text-[#8D958F] mt-1">
            Kỹ thuật chế biến chuẩn mực từ đầu bếp
          </p>
        </div>

        <div className="space-y-6">
          {recipe.instructions.map((step) => {
            const isCompleted = !!completedSteps[step.step];
            const formattedStep = step.step < 10 ? `0${step.step}` : `${step.step}`;

            return (
              <div
                key={step.step}
                className={`p-5 sm:p-6 rounded-xl border transition-all ${
                  isCompleted
                    ? 'bg-[#063C2F]/5 border-[#C6A15B]/40'
                    : 'bg-[#F5F0E6] border-[#E5DECE]'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold font-editorial text-[#C6A15B]">
                      {formattedStep}.
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#1C2421] font-editorial">{step.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {step.durationMinutes && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8D958F] bg-[#FBF8F1] px-2.5 py-1 rounded-md border border-[#E5DECE]">
                        <Clock className="w-3 h-3 text-[#C6A15B]" />
                        {step.durationMinutes} phút
                      </span>
                    )}
                    <button
                      onClick={() => toggleStep(step.step)}
                      className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer border ${
                        isCompleted
                          ? 'bg-[#063C2F] text-[#FBF8F1] border-[#063C2F]'
                          : 'bg-[#FBF8F1] text-[#1C2421] border-[#DDD4C4] hover:bg-[#EDE6D7]'
                      }`}
                    >
                      {isCompleted ? 'Đã hoàn thành' : 'Đánh dấu'}
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#1C2421]/85 leading-relaxed pl-8">
                  {step.description}
                </p>

                {step.tip && (
                  <div className="mt-3.5 ml-8 p-3.5 rounded-lg bg-[#022C24]/5 border border-[#C6A15B]/30 flex items-start gap-2.5 text-xs text-[#1C2421]">
                    <Lightbulb className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-[#063C2F] font-editorial">Ghi chú đầu bếp: </strong>
                      <span className="text-[#1C2421]/90">{step.tip}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Nutrition Information */}
      <section>
        <NutritionTable nutrition={recipe.nutrition} servings={currentServings} />
      </section>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8D958F]">Từ khóa:</span>
        {recipe.tags.map((tag, i) => (
          <span
            key={i}
            onClick={() => onNavigate(`/search?q=${encodeURIComponent(tag)}`)}
            className="text-xs bg-[#FBF8F1] hover:bg-[#022C24] hover:text-[#FBF8F1] border border-[#E5DECE] hover:border-[#C6A15B]/40 text-[#1C2421] px-3 py-1 rounded-full cursor-pointer transition-all font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* JSON-LD Schema.org Inspector as requested */}
      <JsonLdPreview recipe={recipe} />
    </div>
  );
};

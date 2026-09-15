import React from 'react';
import { ChefHat, ArrowRight, Sparkles, Flame, Clock, Heart, BookOpen } from 'lucide-react';
import { Recipe, Category } from '../types';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { RecipeCardSkeleton, Skeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';

export interface HomePageProps {
  recipes: Recipe[];
  categories: Category[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleBookmark: (id: string) => void;
  savedIds: string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  recipes,
  categories,
  isLoading,
  onNavigate,
  onSelectRecipe,
  onToggleBookmark,
  savedIds,
}) => {
  const featuredRecipes = recipes.filter((r) => r.isFeatured);
  const latestRecipes = recipes.slice(0, 6);

  return (
    <div className="space-y-16 pb-20">
      {/* Editorial Cover Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-[#022C24] text-[#FBF8F1] border border-[#063C2F] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
          {/* Editorial typography side */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between z-10 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#063C2F]/80 border border-[#C6A15B]/30 text-[#C6A15B] text-[11px] font-semibold tracking-[0.2em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Bản Sắc Ẩm Thực Việt • Ấn Phẩm Số 08</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] font-editorial text-[#FBF8F1]">
                  KHƠI NGUỒN <br />
                  <span className="text-[#C6A15B] italic font-normal">CẢM HỨNG</span> <br />
                  ẨM THỰC.
                </h1>
                <div className="w-16 h-0.5 bg-[#C6A15B] mt-4" />
              </div>

              <p className="text-xs sm:text-sm text-[#F5F0E6]/80 leading-relaxed max-w-lg">
                Không gian lưu giữ và tôn vinh phong vị truyền thống ba miền cùng kỹ nghệ chế biến đương đại. Từng công thức đều được đong đếm tỉ mỉ từ những đầu bếp am tường bản sắc ẩm thực Việt.
              </p>
            </div>

            {/* CTAs and Highlights */}
            <div className="space-y-8 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate('/recipes')}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Khám phá công thức
                </Button>
                <button
                  onClick={() => onNavigate('/categories')}
                  className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium tracking-wide text-[#FBF8F1] border border-[#C6A15B]/40 hover:bg-[#063C2F] hover:border-[#C6A15B] transition-all cursor-pointer"
                >
                  Bộ sưu tập món ăn
                </button>
              </div>

              {/* Quick Editorial Numbers / Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#063C2F] text-[#F5F0E6]/80">
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-editorial text-[#C6A15B]">120+</div>
                  <div className="text-[10px] sm:text-xs text-[#8D958F] uppercase tracking-wider mt-0.5">Công thức chuẩn vị</div>
                </div>
                <div className="border-l border-[#063C2F] pl-4">
                  <div className="text-xl sm:text-2xl font-bold font-editorial text-[#C6A15B]">100%</div>
                  <div className="text-[10px] sm:text-xs text-[#8D958F] uppercase tracking-wider mt-0.5">Định lượng chi tiết</div>
                </div>
                <div className="border-l border-[#063C2F] pl-4">
                  <div className="text-xl sm:text-2xl font-bold font-editorial text-[#C6A15B]">Fine</div>
                  <div className="text-[10px] sm:text-xs text-[#8D958F] uppercase tracking-wider mt-0.5">Bản sắc ẩm thực</div>
                </div>
              </div>
            </div>
          </div>

          {/* Large food photography side */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
              alt="Món ăn Việt Nam đặc sắc"
              className="w-full h-full object-cover object-center scale-102 hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#022C24] via-[#022C24]/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 right-4 bg-[#022C24]/80 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-[#C6A15B]/30 text-[11px] text-[#FBF8F1] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
              <span>Phở Bò Hà Nội • Di sản hương vị</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories (Bộ Sưu Tập Danh Mục) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#E5DECE] pb-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold mb-1">
              Bộ Sưu Tập Món
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2421] tracking-tight font-editorial">
              Danh Mục Món Ăn Đặc Sắc
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="text-xs font-semibold text-[#063C2F] hover:text-[#C6A15B] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Tất cả danh mục</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2 p-3 bg-[#FBF8F1] rounded-xl border border-[#E5DECE]">
                  <Skeleton variant="rounded" className="aspect-square w-full" />
                  <Skeleton variant="text" className="h-4 w-3/4 mx-auto" />
                  <Skeleton variant="text" className="h-3 w-1/2 mx-auto" />
                </div>
              ))
            : categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => onNavigate(`/categories/${cat.slug}`)}
                  className="group bg-[#FBF8F1] rounded-xl border border-[#E5DECE] p-3 hover:border-[#C6A15B]/60 hover:shadow-xs transition-all text-center cursor-pointer overflow-hidden flex flex-col items-center"
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2.5 bg-[#F5F0E6]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xs font-semibold text-[#1C2421] group-hover:text-[#063C2F] transition-colors line-clamp-1 font-editorial">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-[#8D958F] mt-0.5">
                    {cat.recipeCount} công thức
                  </span>
                </div>
              ))}
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#E5DECE] pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#B9674A] text-[11px] font-bold uppercase tracking-[0.2em] mb-1">
              <Flame className="w-3.5 h-3.5 fill-[#B9674A]" />
              <span>Tuyển Chọn Bếp Trưởng</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2421] tracking-tight font-editorial">
              Công Thức Nổi Bật Tuần Này
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/recipes')}
            className="text-xs font-semibold text-[#063C2F] hover:text-[#C6A15B] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Xem thêm công thức</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <RecipeCardSkeleton key={i} />)
            : featuredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={onSelectRecipe}
                  onToggleBookmark={onToggleBookmark}
                  isBookmarked={savedIds.includes(recipe.id)}
                />
              ))}
        </div>
      </section>

      {/* Cooking Tip Banner / Editorial Note */}
      <section className="bg-[#FBF8F1] border border-[#E5DECE] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-[#022C24] text-[#C6A15B] rounded-xl shrink-0 shadow-xs">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold tracking-widest text-[#C6A15B] mb-1">
              Sổ Tay Ẩm Thực Gia Đình
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#1C2421] mb-1 font-editorial">
              Bạn có công thức gia truyền muốn lưu giữ và chia sẻ?
            </h3>
            <p className="text-xs sm:text-sm text-[#8D958F] max-w-xl leading-relaxed">
              Trở thành tác giả tại Culinary Blog để tạo bộ sưu tập món ngon riêng, ghi chép định lượng chuẩn xác và lan tỏa tinh hoa nấu nướng đến hàng ngàn người yêu ẩm thực.
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="md"
          onClick={() => onNavigate('/dashboard/recipes/new')}
          className="shrink-0"
        >
          Đăng công thức ngay
        </Button>
      </section>

      {/* Latest Recipes Grid */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#E5DECE] pb-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold mb-1">
              Hương Vị Mới
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2421] tracking-tight font-editorial">
              Món Mới Cập Nhật
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/recipes')}
            className="text-xs font-semibold text-[#063C2F] hover:text-[#C6A15B] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Tất cả công thức</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <RecipeCardSkeleton key={i} />)
            : latestRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={onSelectRecipe}
                  onToggleBookmark={onToggleBookmark}
                  isBookmarked={savedIds.includes(recipe.id)}
                />
              ))}
        </div>
      </section>
    </div>
  );
};

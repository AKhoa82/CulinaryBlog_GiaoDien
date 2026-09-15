import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check,
  Save,
  Sparkles,
} from 'lucide-react';
import { recipeSchema, RecipeFormData } from '../../../../lib/validations';
import { Category, Recipe } from '../../../../types';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { slugify } from '../../../../lib/utils';

export interface RecipeFormPageProps {
  categories: Category[];
  onNavigate: (path: string) => void;
  onSaveRecipe?: (newRecipe: Recipe) => void;
  initialData?: Partial<Recipe>;
  isEditMode?: boolean;
}

export const RecipeFormPage: React.FC<RecipeFormPageProps> = ({
  categories,
  onNavigate,
  onSaveRecipe,
  initialData,
  isEditMode = false,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const defaultValues: RecipeFormData = {
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    coverImage:
      initialData?.coverImage ||
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    categorySlug: initialData?.categorySlug || categories[0]?.slug || 'mon-nuoc',
    difficulty: initialData?.difficulty || 'Trung bình',
    prepTimeMinutes: initialData?.prepTimeMinutes || 25,
    cookTimeMinutes: initialData?.cookTimeMinutes || 45,
    servings: initialData?.servings || 4,
    calories: initialData?.calories || 450,
    tags: initialData?.tags ? initialData.tags.join(', ') : 'Món Ngon, Truyền Thống, Dễ Làm',
    status: initialData?.status || 'published',
    ingredients: initialData?.ingredients || [
      { id: '1', name: 'Thịt bắp bò hoa tươi', amount: '500', unit: 'g', notes: 'Thái lát mỏng' },
      { id: '2', name: 'Bánh phở tươi sợi mềm', amount: '800', unit: 'g', notes: 'Trần nước sôi' },
      { id: '3', name: 'Hành hoa và rau mùi thơm', amount: '100', unit: 'g' },
    ],
    instructions: initialData?.instructions || [
      {
        step: 1,
        title: 'Sơ chế nguyên liệu tươi',
        description: 'Rửa sạch thịt bò bằng nước gừng muối loãng, thái lát mỏng vừa ăn. Nhặt sạch hành mùi.',
        durationMinutes: 15,
        tip: 'Cho thịt bò vào ngăn đá 15 phút trước khi thái để dễ thái lát mỏng tang.',
      },
      {
        step: 2,
        title: 'Nấu nước dùng thơm lừng',
        description: 'Ninh nước dùng cùng gia vị thảo quả, quế hồi rang thơm ở lửa nhỏ.',
        durationMinutes: 45,
      },
    ],
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues,
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: 'instructions',
  });

  const watchTitle = watch('title');
  const watchCoverImage = watch('coverImage');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue('title', val);
    if (!isEditMode) {
      setValue('slug', slugify(val));
    }
  };

  const onSubmit = (data: RecipeFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(true);

      const targetCategory = categories.find((c) => c.slug === data.categorySlug);

      const savedRecipe: Recipe = {
        id: initialData?.id || `rec-${Date.now()}`,
        slug: data.slug,
        title: data.title,
        description: data.description,
        coverImage: data.coverImage,
        categorySlug: data.categorySlug,
        categoryName: targetCategory ? targetCategory.name : 'Món Ngon',
        author: {
          id: 'user-1',
          name: 'Lê Anh Khoa',
          email: 'anhkhoa@culinaryblog.dlu.vn',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          role: 'admin',
        },
        difficulty: data.difficulty,
        prepTimeMinutes: data.prepTimeMinutes,
        cookTimeMinutes: data.cookTimeMinutes,
        servings: data.servings,
        calories: data.calories,
        rating: initialData?.rating || 5.0,
        reviewCount: initialData?.reviewCount || 1,
        tags: data.tags.split(',').map((t) => t.trim()),
        isFeatured: initialData?.isFeatured ?? true,
        status: data.status,
        createdAt: initialData?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        nutrition: {
          calories: data.calories,
          protein: Math.round(data.calories * 0.05),
          carbohydrates: Math.round(data.calories * 0.1),
          fat: Math.round(data.calories * 0.03),
        },
        ingredients: data.ingredients,
        instructions: data.instructions,
      };

      onSaveRecipe?.(savedRecipe);

      setTimeout(() => {
        onNavigate('/dashboard/recipes');
      }, 1200);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-[#E5DECE] pb-4">
        <button
          type="button"
          onClick={() => onNavigate('/dashboard/recipes')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#8D958F] hover:text-[#063C2F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách công thức</span>
        </button>

        <div className="text-[11px] text-[#C6A15B] font-mono tracking-wider uppercase">
          Biên tập phẩm thực tiêu chuẩn
        </div>
      </div>

      <div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold">
          {isEditMode ? 'Hiệu Chỉnh Tác Phẩm' : 'Sáng Tác Tinh Hoa Mới'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1C2421] tracking-tight font-editorial mt-1">
          {isEditMode ? 'Chỉnh Sửa Công Thức Nấu Ăn' : 'Tạo Công Thức Nấu Ăn Mới'}
        </h1>
        <p className="text-xs sm:text-sm text-[#8D958F] mt-1">
          Điền đầy đủ các thông tin nguyên liệu, các bước nấu và chỉ số dinh dưỡng cho bài viết
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-[#063C2F]/10 border border-[#063C2F]/20 rounded-2xl flex items-center gap-3 text-xs text-[#063C2F] animate-fadeIn">
          <Check className="w-5 h-5 text-[#063C2F] shrink-0" />
          <div>
            <strong className="font-bold">Thành công! </strong>
            Công thức đã được lưu và cập nhật vào hệ thống. Đang chuyển hướng...
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="bg-[#FBF8F1] p-6 sm:p-8 rounded-2xl border border-[#E5DECE] shadow-2xs space-y-6">
          <h2 className="text-base font-bold text-[#1C2421] font-editorial border-b border-[#E5DECE] pb-3 flex items-center gap-2">
            <span>1. Thông tin cơ bản</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Tiêu đề công thức món ăn *"
                placeholder="vd: Bún Bò Huế Chuẩn Vị Cố Đô Đậm Đà"
                error={errors.title?.message}
                {...register('title', { onChange: handleTitleChange })}
              />
            </div>

            <div>
              <Input
                label="Đường dẫn URL tĩnh (Slug) *"
                placeholder="bun-bo-hue-chuan-vi"
                helperText="Được tự động sinh từ tiêu đề món ăn"
                error={errors.slug?.message}
                {...register('slug')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8D958F] mb-1.5">
                Danh mục món ăn *
              </label>
              <select
                {...register('categorySlug')}
                className="w-full rounded-lg border border-[#E5DECE] text-xs py-2 px-3 bg-[#F5F0E6] text-[#1C2421] focus:outline-none focus:border-[#C6A15B] focus:bg-[#FBF8F1]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.categorySlug && (
                <p className="mt-1.5 text-xs text-[#B9674A] font-medium">
                  {errors.categorySlug.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8D958F] mb-1.5">
                Mô tả tóm tắt món ăn *
              </label>
              <textarea
                rows={3}
                placeholder="Giới thiệu đôi nét về hương vị, nguồn gốc xuất xứ hoặc cảm xúc khi thưởng thức món ăn này..."
                className="w-full rounded-lg border border-[#E5DECE] bg-[#F5F0E6] text-[#1C2421] text-xs p-3 focus:outline-none focus:border-[#C6A15B] focus:bg-[#FBF8F1]"
                {...register('description')}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-[#B9674A] font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Input
                label="Ảnh bìa công thức (URL HTTPS) *"
                placeholder="https://images.unsplash.com/..."
                leftIcon={<ImageIcon className="w-4 h-4" />}
                error={errors.coverImage?.message}
                {...register('coverImage')}
              />
              {watchCoverImage && (
                <div className="mt-2 relative w-full h-44 rounded-xl overflow-hidden bg-[#F5F0E6] border border-[#E5DECE]">
                  <img
                    src={watchCoverImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as any).src =
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className="absolute bottom-2 right-2 bg-[#022C24]/80 text-[#FBF8F1] text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md backdrop-blur-xs border border-[#C6A15B]/30">
                    Xem trước ảnh bìa
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Cooking Parameters */}
        <div className="bg-[#FBF8F1] p-6 sm:p-8 rounded-2xl border border-[#E5DECE] shadow-2xs space-y-6">
          <h2 className="text-base font-bold text-[#1C2421] font-editorial border-b border-[#E5DECE] pb-3 flex items-center gap-2">
            <span>2. Định lượng &amp; Thời gian thực hiện</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8D958F] mb-1">
                Độ khó *
              </label>
              <select
                {...register('difficulty')}
                className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#F5F0E6] text-[#1C2421] focus:bg-[#FBF8F1] focus:border-[#C6A15B]"
              >
                <option value="Dễ">Dễ</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Khó">Khó</option>
              </select>
            </div>

            <div>
              <Input
                label="Chuẩn bị (phút) *"
                type="number"
                error={errors.prepTimeMinutes?.message}
                {...register('prepTimeMinutes', { valueAsNumber: true })}
              />
            </div>

            <div>
              <Input
                label="Nấu chín (phút) *"
                type="number"
                error={errors.cookTimeMinutes?.message}
                {...register('cookTimeMinutes', { valueAsNumber: true })}
              />
            </div>

            <div>
              <Input
                label="Khẩu phần (người) *"
                type="number"
                error={errors.servings?.message}
                {...register('servings', { valueAsNumber: true })}
              />
            </div>

            <div>
              <Input
                label="Năng lượng (kcal) *"
                type="number"
                error={errors.calories?.message}
                {...register('calories', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div>
            <Input
              label="Các thẻ phân loại (Tags, phân cách bằng dấu phẩy) *"
              placeholder="Phở Bò, Món Hà Nội, Món Nước, Món Tết"
              error={errors.tags?.message}
              {...register('tags')}
            />
          </div>
        </div>

        {/* Section 3: Ingredients List (Dynamic) */}
        <div className="bg-[#FBF8F1] p-6 sm:p-8 rounded-2xl border border-[#E5DECE] shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5DECE] pb-3">
            <h2 className="text-base font-bold text-[#1C2421] font-editorial">
              3. Danh sách nguyên liệu ({ingredientFields.length})
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendIngredient({
                  id: `ing-${Date.now()}`,
                  name: '',
                  amount: '1',
                  unit: 'thìa',
                  notes: '',
                })
              }
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Thêm nguyên liệu
            </Button>
          </div>

          <div className="space-y-3">
            {ingredientFields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-12 gap-2 items-center p-3 bg-[#F5F0E6] rounded-xl border border-[#E5DECE]"
              >
                <div className="col-span-5 sm:col-span-4">
                  <input
                    placeholder="Tên nguyên liệu *"
                    className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#1C2421] focus:border-[#C6A15B] focus:outline-none"
                    {...register(`ingredients.${index}.name` as const)}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <input
                    placeholder="Số lượng"
                    className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#1C2421] text-center focus:border-[#C6A15B] focus:outline-none"
                    {...register(`ingredients.${index}.amount` as const)}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <input
                    placeholder="Đơn vị (g, ml, quả)"
                    className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#1C2421] focus:border-[#C6A15B] focus:outline-none"
                    {...register(`ingredients.${index}.unit` as const)}
                  />
                </div>
                <div className="col-span-10 sm:col-span-3">
                  <input
                    placeholder="Ghi chú (tùy chọn)"
                    className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#1C2421] focus:border-[#C6A15B] focus:outline-none"
                    {...register(`ingredients.${index}.notes` as const)}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredientFields.length <= 1}
                    className="p-2 text-[#8D958F] hover:text-[#B9674A] disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {errors.ingredients && (
            <p className="text-xs text-[#B9674A] font-medium">
              {errors.ingredients.message}
            </p>
          )}
        </div>

        {/* Section 4: Instructions Steps (Dynamic) */}
        <div className="bg-[#FBF8F1] p-6 sm:p-8 rounded-2xl border border-[#E5DECE] shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5DECE] pb-3">
            <h2 className="text-base font-bold text-[#1C2421] font-editorial">
              4. Các bước hướng dẫn nấu ({instructionFields.length})
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendInstruction({
                  step: instructionFields.length + 1,
                  title: '',
                  description: '',
                  durationMinutes: 10,
                  tip: '',
                })
              }
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Thêm bước nấu
            </Button>
          </div>

          <div className="space-y-4">
            {instructionFields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 bg-[#F5F0E6] rounded-xl border border-[#E5DECE] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#063C2F] bg-[#FBF8F1] px-3 py-1 rounded-full border border-[#C6A15B]/30 uppercase tracking-wider">
                    Bước {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    disabled={instructionFields.length <= 1}
                    className="p-1.5 text-[#8D958F] hover:text-[#B9674A] disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      placeholder="Tiêu đề bước nấu (vd: Hầm xương bò) *"
                      className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#1C2421] focus:border-[#C6A15B] focus:outline-none"
                      {...register(`instructions.${index}.title` as const)}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Thời gian (phút)"
                      className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#1C2421] focus:border-[#C6A15B] focus:outline-none"
                      {...register(`instructions.${index}.durationMinutes` as const)}
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Mô tả cụ thể thao tác của bước này..."
                    className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#1C2421] focus:border-[#C6A15B] focus:outline-none"
                    {...register(`instructions.${index}.description` as const)}
                  />
                </div>

                <div>
                  <input
                    placeholder="Bí quyết của bếp trưởng cho bước này (tùy chọn)..."
                    className="w-full p-2 text-xs border border-[#E5DECE] rounded-lg bg-[#FBF8F1] text-[#063C2F] placeholder:text-[#8D958F] focus:border-[#C6A15B] focus:outline-none"
                    {...register(`instructions.${index}.tip` as const)}
                  />
                </div>
              </div>
            ))}
          </div>
          {errors.instructions && (
            <p className="text-xs text-[#B9674A] font-medium">
              {errors.instructions.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5DECE]">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => onNavigate('/dashboard/recipes')}
          >
            Hủy thao tác
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
          >
            {isEditMode ? 'Lưu thay đổi công thức' : 'Xuất bản công thức ngay'}
          </Button>
        </div>
      </form>
    </div>
  );
};

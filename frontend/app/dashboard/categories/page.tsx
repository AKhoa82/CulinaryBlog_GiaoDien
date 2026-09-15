import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Check,
  FolderPlus,
} from 'lucide-react';
import { Category } from '../../../types';
import { categorySchema, CategoryFormData } from '../../../lib/validations';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Modal } from '../../../components/ui/Modal';
import { TableRowSkeleton } from '../../../components/ui/Skeleton';
import { slugify } from '../../../lib/utils';

export interface DashboardCategoriesPageProps {
  categories: Category[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
  onAddCategory?: (category: Category) => void;
  onDeleteCategory?: (id: string) => void;
}

export const DashboardCategoriesPage: React.FC<DashboardCategoriesPageProps> = ({
  categories,
  isLoading,
  onNavigate,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      iconName: 'Utensils',
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue('name', val);
    setValue('slug', slugify(val));
  };

  const onSubmit = (data: CategoryFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        slug: data.slug,
        name: data.name,
        description: data.description,
        image: data.image,
        recipeCount: 0,
        iconName: data.iconName,
      };
      setCategoryList((prev) => [newCat, ...prev]);
      onAddCategory?.(newCat);
      setIsModalOpen(false);
      reset();
    }, 600);
  };

  const handleDelete = (id: string) => {
    setCategoryList((prev) => prev.filter((c) => c.id !== id));
    onDeleteCategory?.(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DECE] pb-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold mb-1">
            Chuyên Mục &amp; Bộ Sưu Tập
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1C2421] tracking-tight font-editorial">
            Quản Lý Danh Mục Ẩm Thực
          </h1>
          <p className="text-xs sm:text-sm text-[#8D958F] mt-0.5">
            Tổ chức các chuyên mục và nhóm món ăn trên hệ thống tạp chí
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Thêm danh mục mới
        </Button>
      </div>

      {/* Categories Table */}
      <div className="bg-[#FBF8F1] rounded-2xl border border-[#E5DECE] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#8D958F] font-semibold uppercase text-[10px] tracking-wider border-b border-[#E5DECE]">
              <tr>
                <th className="py-3.5 px-4">Tên danh mục</th>
                <th className="py-3.5 px-3">Slug định danh</th>
                <th className="py-3.5 px-3">Mô tả ngắn</th>
                <th className="py-3.5 px-3 text-center">Số công thức</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DECE]">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} columns={5} />)
              ) : (
                categoryList.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#F5F0E6]/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-10 h-10 rounded-lg object-cover ring-1 ring-[#E5DECE] shrink-0"
                        />
                        <div className="font-bold text-[#1C2421] font-editorial">{cat.name}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#8D958F]">
                      /categories/{cat.slug}
                    </td>
                    <td className="py-3.5 px-3 text-[#8D958F] max-w-xs truncate">
                      {cat.description}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-[#063C2F] font-editorial text-sm">
                      {cat.recipeCount}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onNavigate(`/categories/${cat.slug}`)}
                          className="p-1.5 text-[#8D958F] hover:text-[#063C2F] hover:bg-[#F5F0E6] rounded-lg cursor-pointer transition-colors"
                          title="Xem ngoài website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-1.5 text-[#8D958F] hover:text-[#B9674A] hover:bg-[#B9674A]/10 rounded-lg cursor-pointer transition-colors"
                          title="Xóa danh mục"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Category */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thêm Danh Mục Ẩm Thực Mới"
        description="Nhập thông tin chuyên mục món ăn mới với hệ thống kiểm duyệt chuẩn mực"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Tên danh mục *"
            placeholder="vd: Món Nướng BBQ"
            error={errors.name?.message}
            {...register('name', { onChange: handleNameChange })}
          />

          <Input
            label="Đường dẫn tĩnh (Slug) *"
            placeholder="mon-nuong-bbq"
            error={errors.slug?.message}
            {...register('slug')}
          />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#8D958F] mb-1.5">
              Mô tả danh mục *
            </label>
            <textarea
              rows={2}
              placeholder="Giới thiệu về đặc trưng phong cách của danh mục này..."
              className="w-full rounded-lg border border-[#E5DECE] bg-[#F5F0E6] text-[#1C2421] text-xs p-2.5 focus:outline-none focus:border-[#C6A15B] focus:bg-[#FBF8F1]"
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-[#B9674A] font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          <Input
            label="URL Hình ảnh đại diện *"
            placeholder="https://images.unsplash.com/..."
            error={errors.image?.message}
            {...register('image')}
          />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5DECE]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSubmitting}
            >
              Tạo danh mục
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

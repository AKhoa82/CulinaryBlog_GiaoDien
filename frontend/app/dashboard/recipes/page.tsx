import React, { useState } from 'react';
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Archive,
  ArchiveRestore,
  Send,
  FileText,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { Recipe } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { TableRowSkeleton } from '../../../components/ui/Skeleton';
import { formatDate } from '../../../lib/utils';

export interface DashboardRecipesPageProps {
  recipes: Recipe[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
  onDeleteRecipe?: (id: string) => void;
}

export const DashboardRecipesPage: React.FC<DashboardRecipesPageProps> = ({
  recipes,
  isLoading,
  onNavigate,
  onDeleteRecipe,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [recipeList, setRecipeList] = useState<Recipe[]>(recipes);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'warning' = 'success') => {
    setActionNotice({ message, type });
    setTimeout(() => setActionNotice(null), 3500);
  };

  const filtered = recipeList.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    setRecipeList((prev) => prev.filter((r) => r.id !== id));
    onDeleteRecipe?.(id);
    setDeleteConfirmId(null);
    showNotification('Đã xóa vĩnh viễn công thức thành công.');
  };

  // FR-RCP-005: Xuất bản / Hủy xuất bản
  const handleTogglePublish = (recipe: Recipe) => {
    if (recipe.status !== 'published') {
      // Business rule: Recipe phải có ít nhất 1 step và 1 nguyên liệu mới được publish
      if (!recipe.instructions || recipe.instructions.length === 0) {
        showNotification('Không thể xuất bản: Công thức phải có ít nhất 1 bước thực hiện.', 'warning');
        return;
      }
      if (!recipe.ingredients || recipe.ingredients.length === 0) {
        showNotification('Không thể xuất bản: Công thức phải có ít nhất 1 nguyên liệu.', 'warning');
        return;
      }
      setRecipeList((prev) =>
        prev.map((item) => (item.id === recipe.id ? { ...item, status: 'published', updatedAt: new Date().toISOString() } : item))
      );
      showNotification(`Đã xuất bản công thức "${recipe.title}" thành công.`);
    } else {
      setRecipeList((prev) =>
        prev.map((item) => (item.id === recipe.id ? { ...item, status: 'draft', updatedAt: new Date().toISOString() } : item))
      );
      showNotification(`Đã chuyển công thức "${recipe.title}" về Bản nháp (Draft).`);
    }
  };

  // FR-RCP-006: Lưu trữ công thức (Archive / Unarchive)
  const handleToggleArchive = (recipe: Recipe) => {
    if (recipe.status === 'archived') {
      setRecipeList((prev) =>
        prev.map((item) => (item.id === recipe.id ? { ...item, status: 'draft', updatedAt: new Date().toISOString() } : item))
      );
      showNotification(`Đã khôi phục công thức "${recipe.title}" từ kho lưu trữ về Bản nháp.`);
    } else {
      setRecipeList((prev) =>
        prev.map((item) => (item.id === recipe.id ? { ...item, status: 'archived', updatedAt: new Date().toISOString() } : item))
      );
      showNotification(`Đã chuyển công thức "${recipe.title}" vào mục Lưu trữ (Archived).`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DECE] pb-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold mb-1">
            Danh Mục Quản Trị
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1C2421] tracking-tight font-editorial">
            Quản Lý Công Thức Nấu Ăn
          </h1>
          <p className="text-xs sm:text-sm text-[#8D958F] mt-0.5">
            Quản lý toàn bộ vòng đời công thức: Tạo mới, Chỉnh sửa, Xuất bản (Publish), Lưu trữ (Archive) và Xóa
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onNavigate('/dashboard/recipes/new')}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Thêm công thức mới
        </Button>
      </div>

      {/* Action Notification */}
      {actionNotice && (
        <div
          className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-medium animate-fadeIn ${
            actionNotice.type === 'success'
              ? 'bg-[#063C2F]/10 border-[#063C2F]/20 text-[#063C2F]'
              : 'bg-[#B9674A]/10 border-[#B9674A]/20 text-[#B9674A]'
          }`}
        >
          {actionNotice.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-[#063C2F] shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-[#B9674A] shrink-0" />
          )}
          <span>{actionNotice.message}</span>
        </div>
      )}

      {/* Filter and Search controls */}
      <div className="bg-[#FBF8F1] p-4 rounded-xl border border-[#E5DECE] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#C6A15B] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên công thức..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F5F0E6] border border-[#E5DECE] rounded-lg text-[#1C2421] placeholder:text-[#8D958F] focus:outline-none focus:border-[#C6A15B] focus:bg-[#FBF8F1] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#8D958F] whitespace-nowrap font-medium">Trạng thái:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs p-1.5 border border-[#E5DECE] rounded-lg bg-[#FBF8F1] focus:outline-none focus:border-[#C6A15B] font-medium text-[#1C2421]"
          >
            <option value="all">Tất cả trạng thái ({recipeList.length})</option>
            <option value="published">Đã xuất bản (Published)</option>
            <option value="draft">Bản nháp (Draft)</option>
            <option value="archived">Đã lưu trữ (Archived)</option>
          </select>
        </div>
      </div>

      {/* Recipes Table */}
      <div className="bg-[#FBF8F1] rounded-2xl border border-[#E5DECE] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#8D958F] font-semibold uppercase text-[10px] tracking-wider border-b border-[#E5DECE]">
              <tr>
                <th className="py-3.5 px-4">Tên công thức</th>
                <th className="py-3.5 px-3">Danh mục</th>
                <th className="py-3.5 px-3">Độ khó</th>
                <th className="py-3.5 px-3">Trạng thái</th>
                <th className="py-3.5 px-3">Ngày cập nhật</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DECE]">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => <TableRowSkeleton key={i} columns={6} />)
              ) : filtered.length > 0 ? (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F5F0E6]/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={r.coverImage}
                          alt={r.title}
                          className="w-11 h-11 rounded-lg object-cover ring-1 ring-[#E5DECE] shrink-0"
                        />
                        <div className="max-w-xs">
                          <div
                            onClick={() => onNavigate(`/recipes/${r.slug}`)}
                            className="font-bold text-[#1C2421] line-clamp-1 hover:text-[#063C2F] cursor-pointer font-editorial"
                          >
                            {r.title}
                          </div>
                          <div className="text-[11px] text-[#8D958F] mt-0.5">
                            {r.prepTimeMinutes + r.cookTimeMinutes} phút • {r.servings} phần • {r.calories} kcal
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-[#1C2421] font-medium">
                      {r.categoryName}
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge
                        variant={
                          r.difficulty === 'Dễ' ? 'success' : r.difficulty === 'Trung bình' ? 'warning' : 'danger'
                        }
                        size="sm"
                      >
                        {r.difficulty}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3">
                      {r.status === 'published' && (
                        <Badge variant="success" size="sm">
                          Đã xuất bản
                        </Badge>
                      )}
                      {r.status === 'draft' && (
                        <Badge variant="warning" size="sm">
                          Bản nháp
                        </Badge>
                      )}
                      {r.status === 'archived' && (
                        <Badge variant="neutral" size="sm">
                          Đã lưu trữ
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-[#8D958F]">
                      {formatDate(r.updatedAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Publish / Unpublish action (FR-RCP-005) */}
                        <button
                          onClick={() => handleTogglePublish(r)}
                          className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                            r.status === 'published'
                              ? 'text-[#B9674A] hover:bg-[#B9674A]/10'
                              : 'text-[#063C2F] hover:bg-[#063C2F]/10'
                          }`}
                          title={
                            r.status === 'published'
                              ? 'Hủy xuất bản (Chuyển về Draft)'
                              : 'Xuất bản công thức công khai'
                          }
                        >
                          {r.status === 'published' ? (
                            <FileText className="w-3.5 h-3.5" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Archive / Unarchive action (FR-RCP-006) */}
                        <button
                          onClick={() => handleToggleArchive(r)}
                          className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                            r.status === 'archived'
                              ? 'text-[#063C2F] hover:bg-[#063C2F]/10'
                              : 'text-[#8D958F] hover:text-[#1C2421] hover:bg-[#F5F0E6]'
                          }`}
                          title={
                            r.status === 'archived'
                              ? 'Khôi phục từ lưu trữ'
                              : 'Lưu trữ công thức (Ẩn khỏi công khai)'
                          }
                        >
                          {r.status === 'archived' ? (
                            <ArchiveRestore className="w-3.5 h-3.5" />
                          ) : (
                            <Archive className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* View public page */}
                        <button
                          onClick={() => onNavigate(`/recipes/${r.slug}`)}
                          className="p-1.5 text-[#8D958F] hover:text-[#063C2F] hover:bg-[#F5F0E6] rounded-lg cursor-pointer transition-colors"
                          title="Xem trên trang chi tiết"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit recipe (FR-RCP-004) */}
                        <button
                          onClick={() => onNavigate(`/dashboard/recipes/${r.id}/edit`)}
                          className="p-1.5 text-[#8D958F] hover:text-[#063C2F] hover:bg-[#F5F0E6] rounded-lg cursor-pointer transition-colors"
                          title="Chỉnh sửa công thức"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete recipe (FR-RCP-007) */}
                        <button
                          onClick={() => setDeleteConfirmId(r.id)}
                          className="p-1.5 text-[#8D958F] hover:text-[#B9674A] hover:bg-[#B9674A]/10 rounded-lg cursor-pointer transition-colors"
                          title="Xóa công thức"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8D958F]">
                    Không tìm thấy công thức nào phù hợp với bộ lọc
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#022C24]/60 backdrop-blur-xs">
          <div className="bg-[#FBF8F1] rounded-2xl max-w-sm w-full p-6 shadow-xl border border-[#E5DECE] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#B9674A]/10 text-[#B9674A] flex items-center justify-center mx-auto border border-[#B9674A]/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-[#1C2421] font-editorial">Xác nhận xóa công thức</h3>
              <p className="text-xs text-[#8D958F] mt-1">
                Bạn có chắc chắn muốn xóa bài viết này không? Thao tác này sẽ cascade xóa các nguyên liệu, các bước thực hiện và ảnh liên quan.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setDeleteConfirmId(null)}
              >
                Hủy bỏ
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="flex-1"
                onClick={() => handleDelete(deleteConfirmId)}
              >
                Xác nhận xóa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

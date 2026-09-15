import React from 'react';
import {
  UtensilsCrossed,
  Eye,
  Heart,
  MessageSquare,
  TrendingUp,
  PlusCircle,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Recipe, Category } from '../../types';
import { MOCK_DASHBOARD_STATS } from '../../lib/mock-data';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DashboardStatSkeleton, Skeleton } from '../../components/ui/Skeleton';
import { formatDate } from '../../lib/utils';

export interface DashboardOverviewPageProps {
  recipes: Recipe[];
  categories: Category[];
  isLoading: boolean;
  onNavigate: (path: string) => void;
}

export const DashboardOverviewPage: React.FC<DashboardOverviewPageProps> = ({
  recipes,
  categories,
  isLoading,
  onNavigate,
}) => {
  const stats = [
    {
      label: 'Tổng công thức',
      value: recipes.length,
      change: '+4 trong tuần',
      icon: <UtensilsCrossed className="w-4 h-4 text-[#C6A15B]" />,
      bg: 'bg-[#F5F0E6] border border-[#E5DECE]',
    },
    {
      label: 'Lượt xem bài viết',
      value: MOCK_DASHBOARD_STATS.totalViews,
      change: '+18% so với tháng trước',
      icon: <Eye className="w-4 h-4 text-[#063C2F]" />,
      bg: 'bg-[#F5F0E6] border border-[#E5DECE]',
    },
    {
      label: 'Lượt lưu sổ tay',
      value: MOCK_DASHBOARD_STATS.totalLikes,
      change: '+240 tuần này',
      icon: <Heart className="w-4 h-4 text-[#B9674A]" />,
      bg: 'bg-[#F5F0E6] border border-[#E5DECE]',
    },
    {
      label: 'Đánh giá & Bình luận',
      value: MOCK_DASHBOARD_STATS.totalComments,
      change: '98% tích cực',
      icon: <MessageSquare className="w-4 h-4 text-[#C6A15B]" />,
      bg: 'bg-[#F5F0E6] border border-[#E5DECE]',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#022C24] rounded-2xl p-6 sm:p-8 text-[#FBF8F1] shadow-sm border border-[#063C2F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C6A15B] bg-[#063C2F] px-3 py-1 rounded-full border border-[#C6A15B]/30">
            Bàn Làm Việc Biên Tập
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2.5 font-editorial text-[#FBF8F1]">
            Chào mừng trở lại, Bếp Trưởng Lê Anh Khoa!
          </h1>
          <p className="text-xs sm:text-sm text-[#F5F0E6]/80 mt-1 max-w-xl">
            Các bài viết của bạn tuần này đạt lượng tương tác kỷ lục. Hãy tiếp tục sáng tạo và chia sẻ các công thức tinh hoa mới.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 relative z-10">
          <Button
            variant="secondary"
            size="md"
            onClick={() => onNavigate('/dashboard/recipes/new')}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Biên Soạn Món Mới
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <DashboardStatSkeleton key={i} />)
          : stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[#FBF8F1] p-5 rounded-xl border border-[#E5DECE] shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#8D958F]">{stat.label}</span>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-[#1C2421] font-editorial">{stat.value}</div>
                <div className="flex items-center gap-1 text-[11px] text-[#063C2F] font-medium">
                  <TrendingUp className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{stat.change}</span>
                </div>
              </div>
            ))}
      </div>

      {/* Two Column Layout: Recent Recipes & Category Popularity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Recent Recipes Table */}
        <div className="lg:col-span-2 bg-[#FBF8F1] rounded-2xl border border-[#E5DECE] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1C2421] font-editorial">Công thức biên soạn gần đây</h2>
              <p className="text-xs text-[#8D958F]">Các bài viết mới đăng tải hoặc chỉnh sửa gần nhất</p>
            </div>
            <button
              onClick={() => onNavigate('/dashboard/recipes')}
              className="text-xs font-semibold text-[#063C2F] hover:text-[#C6A15B] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B]" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-[#8D958F] border-b border-[#E5DECE]">
                <tr>
                  <th className="pb-3 font-semibold">Công thức</th>
                  <th className="pb-3 font-semibold">Danh mục</th>
                  <th className="pb-3 font-semibold">Trạng thái</th>
                  <th className="pb-3 font-semibold text-right">Đánh giá</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DECE]">
                {recipes.slice(0, 4).map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => onNavigate(`/dashboard/recipes/${r.id}/edit`)}
                    className="hover:bg-[#F5F0E6] cursor-pointer transition-colors"
                  >
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={r.coverImage}
                          alt={r.title}
                          className="w-10 h-10 rounded-lg object-cover ring-1 ring-[#E5DECE] shrink-0"
                        />
                        <div>
                          <div className="font-bold text-[#1C2421] line-clamp-1 hover:text-[#063C2F] font-editorial">
                            {r.title}
                          </div>
                          <div className="text-[11px] text-[#8D958F] mt-0.5">
                            Cập nhật: {formatDate(r.updatedAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-[#8D958F]">{r.categoryName}</td>
                    <td className="py-3 px-2">
                      <Badge variant="success" size="sm">
                        Đã xuất bản
                      </Badge>
                    </td>
                    <td className="py-3 pl-2 text-right font-bold text-[#1C2421]">
                      <span className="text-[#C6A15B]">★</span> {r.rating.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right col: Category Share */}
        <div className="bg-[#FBF8F1] rounded-2xl border border-[#E5DECE] p-6 shadow-2xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-[#1C2421] font-editorial">Phân bố danh mục phổ biến</h2>
            <p className="text-xs text-[#8D958F]">Tỷ lệ quan tâm của độc giả theo chủ đề</p>
          </div>

          <div className="space-y-4 pt-2">
            {MOCK_DASHBOARD_STATS.popularCategories.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium text-[#1C2421]">
                  <span>{item.name}</span>
                  <span className="text-[#063C2F] font-semibold">{item.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#E5DECE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#063C2F] rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E5DECE]">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onNavigate('/dashboard/categories')}
            >
              Quản lý danh mục
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

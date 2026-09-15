import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Bookmark,
  UtensilsCrossed,
  Edit3,
  Check,
  Camera,
  ShieldCheck,
} from 'lucide-react';
import { UserProfile, Recipe } from '../../types';
import { MOCK_USER_PROFILE } from '../../lib/mock-data';
import { profileSchema, ProfileFormData } from '../../lib/validations';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { RecipeCard } from '../../components/recipes/RecipeCard';

export interface ProfilePageProps {
  recipes: Recipe[];
  savedRecipeIds: string[];
  onNavigate: (path: string) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleBookmark: (id: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  recipes,
  savedRecipeIds,
  onNavigate,
  onSelectRecipe,
  onToggleBookmark,
}) => {
  const [profile, setProfile] = useState<UserProfile>(MOCK_USER_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [activeTab, setActiveTab] = useState<'my-recipes' | 'saved' | 'settings'>('my-recipes');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
      location: profile.location,
      website: profile.website || '',
      avatar: profile.avatar,
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setProfile((prev) => ({
        ...prev,
        name: data.name,
        email: data.email,
        bio: data.bio,
        location: data.location,
        website: data.website || '',
        avatar: data.avatar,
      }));
      setIsEditing(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }, 600);
  };

  const savedRecipes = recipes.filter((r) => savedRecipeIds.includes(r.id));
  const myPublishedRecipes = recipes.filter((r) => r.author.name === 'Lê Anh Khoa');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Profile Header Banner */}
      <div className="bg-[#FBF8F1] rounded-2xl border border-[#E5DECE] shadow-2xs overflow-hidden">
        <div className="h-36 sm:h-44 bg-[#022C24] border-b border-[#063C2F] relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover ring-4 ring-[#FBF8F1] shadow-sm bg-[#F5F0E6]"
                />
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute bottom-1 right-1 p-1.5 rounded-md bg-[#022C24] text-[#C6A15B] border border-[#C6A15B]/30 hover:bg-[#063C2F] cursor-pointer transition-colors"
                  title="Đổi ảnh đại diện"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1C2421] font-editorial">{profile.name}</h1>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-[#022C24] text-[#FBF8F1] border border-[#C6A15B]/30 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-[#C6A15B]" />
                    {profile.role === 'admin' ? 'Bếp trưởng quản trị' : 'Tác giả ẩm thực'}
                  </span>
                </div>
                <p className="text-xs text-[#8D958F] mt-0.5">
                  <span className="font-semibold text-[#1C2421]">@{profile.userName}</span> • {profile.email} {profile.emailConfirmed && <span className="text-[#063C2F] font-medium ml-1">✓ Đã xác thực</span>}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={isEditing ? 'outline' : 'primary'}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                leftIcon={<Edit3 className="w-3.5 h-3.5" />}
              >
                {isEditing ? 'Đóng chỉnh sửa' : 'Chỉnh sửa hồ sơ'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('/dashboard')}
              >
                Vào Bàn Làm Việc
              </Button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#1C2421]/80 leading-relaxed max-w-2xl mb-4 font-normal">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#8D958F] border-t border-[#E5DECE] pt-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{profile.location}</span>
            </div>
            {profile.website && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#C6A15B]" />
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#063C2F] hover:underline"
                >
                  {profile.website}
                </a>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Gia nhập từ {profile.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-[#063C2F]/10 border border-[#063C2F]/20 rounded-lg flex items-center gap-2 text-xs text-[#063C2F] animate-fadeIn font-medium">
          <Check className="w-4 h-4 text-[#063C2F]" />
          <span>Thông tin hồ sơ tác giả đã được cập nhật thành công!</span>
        </div>
      )}

      {/* Edit Form Modal/Drawer if editing */}
      {isEditing && (
        <div className="bg-[#FBF8F1] p-6 sm:p-8 rounded-2xl border border-[#E5DECE] shadow-2xs space-y-4 animate-fadeIn">
          <h2 className="text-base font-bold text-[#1C2421] border-b border-[#E5DECE] pb-3 font-editorial">
            Cập nhật thông tin tài khoản tác giả
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Họ và tên tác giả *"
              error={errors.name?.message}
              {...register('name')}
            />

            <div>
              <Input
                label="Email (Cố định)"
                type="email"
                disabled
                defaultValue={profile.email}
                className="bg-[#F5F0E6] text-[#8D958F] cursor-not-allowed"
              />
              <span className="text-[10px] text-[#8D958F] mt-1 block">
                * Thay đổi email yêu cầu quy trình xác thực mã bảo mật riêng.
              </span>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8D958F] mb-1.5">
                Tiểu sử tác giả (Bio)
              </label>
              <textarea
                rows={3}
                className="w-full text-xs p-3 rounded-lg border border-[#E5DECE] bg-[#F5F0E6] text-[#1C2421] focus:bg-[#FBF8F1] focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30"
                {...register('bio')}
              />
              {errors.bio && (
                <p className="mt-1 text-xs text-[#B9674A]">{errors.bio.message}</p>
              )}
            </div>

            <Input
              label="Địa điểm cư trú *"
              error={errors.location?.message}
              {...register('location')}
            />

            <Input
              label="Website cá nhân / Chuyên trang"
              error={errors.website?.message}
              {...register('website')}
            />

            <div className="sm:col-span-2">
              <Input
                label="Đường dẫn ảnh chân dung (Avatar URL) *"
                error={errors.avatar?.message}
                {...register('avatar')}
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2 pt-3 border-t border-[#E5DECE]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSaving}
              >
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#E5DECE]">
        <button
          onClick={() => setActiveTab('my-recipes')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer font-editorial ${
            activeTab === 'my-recipes'
              ? 'border-[#063C2F] text-[#063C2F]'
              : 'border-transparent text-[#8D958F] hover:text-[#1C2421]'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4 text-[#C6A15B]" />
          <span>Công thức đã biên soạn ({myPublishedRecipes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer font-editorial ${
            activeTab === 'saved'
              ? 'border-[#063C2F] text-[#063C2F]'
              : 'border-transparent text-[#8D958F] hover:text-[#1C2421]'
          }`}
        >
          <Bookmark className="w-4 h-4 text-[#C6A15B]" />
          <span>Sổ tay lưu trữ ({savedRecipes.length})</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'my-recipes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPublishedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSelect={onSelectRecipe}
              onToggleBookmark={onToggleBookmark}
              isBookmarked={savedRecipeIds.includes(recipe.id)}
            />
          ))}
        </div>
      )}

      {activeTab === 'saved' && (
        <div>
          {savedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={onSelectRecipe}
                  onToggleBookmark={onToggleBookmark}
                  isBookmarked={true}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#FBF8F1] rounded-2xl border border-dashed border-[#E5DECE] p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F5F0E6] border border-[#E5DECE] flex items-center justify-center mx-auto text-[#C6A15B]">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#1C2421] font-editorial">Chưa có công thức nào được lưu vào sổ tay</h3>
              <p className="text-xs text-[#8D958F]">
                Hãy nhấn vào biểu tượng dấu trang ở bất kỳ công thức nào để lưu lại sổ tay của bạn
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('/recipes')}
              >
                Khám phá tuyển tập món ăn
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

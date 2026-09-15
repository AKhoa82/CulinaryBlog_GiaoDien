import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, Check, Eye, EyeOff, ArrowLeft, ArrowRight, Sparkles, ChefHat, AlertCircle } from 'lucide-react';
import { registerSchema, RegisterFormData } from '../../../lib/validations';

export interface RegisterPageProps {
  onNavigate: (path: string) => void;
  onSuccessRegister?: (email: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onSuccessRegister }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: true,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRegSuccess(true);
      setTimeout(() => {
        onSuccessRegister?.(data.email);
        onNavigate('/dashboard');
      }, 1000);
    }, 900);
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F0E6] flex flex-col justify-center">
      {/* Editorial Spread Container: Full Viewport on desktop */}
      <div className="w-full min-h-screen bg-[#FBF8F1] grid grid-cols-1 lg:grid-cols-12 shadow-sm">
        
        {/* =========================================================================
            LEFT PANEL: Cinematic Food Photography & Community Story (Visual Panel)
           ========================================================================= */}
        <div className="relative lg:col-span-5 min-h-[360px] sm:min-h-[420px] lg:min-h-screen overflow-hidden bg-[#022C24] flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-[#FBF8F1]">
          {/* Background Photography: Chef crafting and seasoning fresh culinary creation */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=85"
              alt="Đầu bếp đang chăm chút chế biến và bài trí món ăn với thảo mộc tươi"
              className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000 ease-out"
            />
            {/* Subtle multi-stop gradient: preserves natural warm food tones while enhancing text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#022C24]/95 via-[#022C24]/45 to-[#022C24]/30" />
            <div className="absolute inset-0 bg-[#022C24]/20 mix-blend-multiply" />
          </div>

          {/* Top Brand Tag on Image */}
          <div className="relative z-10 flex items-center justify-between">
            <div
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#022C24]/85 backdrop-blur-md border border-[#C6A15B]/40 text-[#FBF8F1] cursor-pointer hover:border-[#C6A15B] transition-all group"
            >
              <ChefHat className="w-4 h-4 text-[#C6A15B] group-hover:rotate-12 transition-transform" />
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FBF8F1] leading-none">
                  CULINARY BLOG
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#C6A15B] font-medium leading-none pt-0.5">
                  ẨM THỰC VIỆT NAM
                </span>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#F5F0E6]/70 bg-[#022C24]/60 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#F5F0E6]/15">
              <Sparkles className="w-3 h-3 text-[#C6A15B]" />
              <span>Gia nhập cộng đồng</span>
            </span>
          </div>

          {/* Center / Bottom Editorial Quotation */}
          <div className="relative z-10 space-y-4 my-auto lg:my-0 lg:mt-auto pt-12 lg:pt-0">
            <div className="w-10 h-[2px] bg-[#C6A15B]" />
            
            <div className="space-y-2">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold">
                Cộng Đồng Tác Giả Ẩm Thực
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-[#FBF8F1] leading-[1.2] tracking-tight">
                “Mỗi công thức <br className="hidden sm:inline" />
                <span className="text-[#C6A15B] italic font-normal">đều mang một</span> câu chuyện riêng.”
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#F5F0E6]/80 leading-relaxed max-w-md font-sans">
              Trở thành người lưu giữ và lan tỏa phong vị ẩm thực Việt. Đóng góp công thức gia truyền, kỹ thuật làm bếp và ghi dấu ấn cá nhân trong không gian biên tập cao cấp.
            </p>

            <div className="pt-3 border-t border-[#F5F0E6]/20 flex items-center justify-between text-[10px] text-[#F5F0E6]/60 uppercase tracking-[0.15em]">
              <span>Cộng Tác Viên • Bếp Trưởng • Blogger</span>
              <span>Tham gia miễn phí</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT PANEL: Luxury Editorial Registration Form (Auth Panel)
           ========================================================================= */}
        <div className="lg:col-span-7 bg-[#FBF8F1] flex flex-col justify-center py-10 sm:py-14 px-6 sm:px-12 lg:px-16">
          <div className="w-full max-w-[480px] mx-auto space-y-6">
            
            {/* Top Minimalist Navigation / Brand Indicator */}
            <div className="flex items-center justify-between border-b border-[#E5DECE]/70 pb-3">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#8D958F] hover:text-[#063C2F] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Trang chủ</span>
              </button>

              <div className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-semibold">
                02 — Đăng Ký Tác Giả
              </div>
            </div>

            {/* Editorial Heading Section */}
            <div className="space-y-2">
              <div className="w-8 h-[2px] bg-[#C6A15B]" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C2421] font-editorial tracking-tight leading-tight">
                Đăng Ký <br />
                <span className="text-[#063C2F] font-normal italic">Trở Thành Một Phần Của Cộng Đồng</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#8D958F] leading-relaxed">
                Tạo tài khoản để chia sẻ những công thức và câu chuyện ẩm thực của riêng bạn.
              </p>
            </div>

            {/* Success Alert */}
            {regSuccess && (
              <div className="p-3.5 bg-[#063C2F]/10 border border-[#063C2F]/30 rounded-lg flex items-center gap-2.5 text-xs text-[#063C2F] animate-fadeIn font-medium">
                <Check className="w-4 h-4 text-[#063C2F] shrink-0" />
                <span>Đăng ký thành công! Đang thiết lập bàn làm việc tác giả...</span>
              </div>
            )}

            {/* Form with React Hook Form + Zod */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Row 1: Name and Username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#063C2F]">
                    Họ và tên tác giả *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C6A15B]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="vd: Lê Anh Khoa"
                      className={`block w-full h-[52px] pl-10 pr-3.5 rounded-lg border text-xs sm:text-sm bg-[#F5F0E6]/50 text-[#1C2421] placeholder:text-[#8D958F] transition-colors focus:outline-none focus:bg-[#FBF8F1] ${
                        errors.name
                          ? 'border-[#B9674A] focus:border-[#B9674A] focus:ring-1 focus:ring-[#B9674A]/20'
                          : 'border-[#E5DECE] focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30'
                      }`}
                      {...register('name')}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-[#B9674A] font-medium mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#063C2F]">
                    Tên định danh (Username) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C6A15B]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="vd: khoale_culinary"
                      className={`block w-full h-[52px] pl-10 pr-3.5 rounded-lg border text-xs sm:text-sm bg-[#F5F0E6]/50 text-[#1C2421] placeholder:text-[#8D958F] transition-colors focus:outline-none focus:bg-[#FBF8F1] ${
                        errors.userName
                          ? 'border-[#B9674A] focus:border-[#B9674A] focus:ring-1 focus:ring-[#B9674A]/20'
                          : 'border-[#E5DECE] focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30'
                      }`}
                      {...register('userName')}
                    />
                  </div>
                  {errors.userName && (
                    <p className="text-xs text-[#B9674A] font-medium mt-1">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#063C2F]">
                  Địa chỉ Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C6A15B]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="vd: name@culinaryblog.vn"
                    className={`block w-full h-[52px] pl-10 pr-3.5 rounded-lg border text-xs sm:text-sm bg-[#F5F0E6]/50 text-[#1C2421] placeholder:text-[#8D958F] transition-colors focus:outline-none focus:bg-[#FBF8F1] ${
                      errors.email
                        ? 'border-[#B9674A] focus:border-[#B9674A] focus:ring-1 focus:ring-[#B9674A]/20'
                        : 'border-[#E5DECE] focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30'
                    }`}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-[#B9674A] font-medium mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Row 3: Password and Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#063C2F]">
                    Mật khẩu (tối thiểu 8 ký tự) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C6A15B]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`block w-full h-[52px] pl-10 pr-10 rounded-lg border text-xs sm:text-sm bg-[#F5F0E6]/50 text-[#1C2421] placeholder:text-[#8D958F] transition-colors focus:outline-none focus:bg-[#FBF8F1] ${
                        errors.password
                          ? 'border-[#B9674A] focus:border-[#B9674A] focus:ring-1 focus:ring-[#B9674A]/20'
                          : 'border-[#E5DECE] focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30'
                      }`}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8D958F] hover:text-[#063C2F] transition-colors cursor-pointer"
                      title={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-[#B9674A] font-medium mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#063C2F]">
                    Xác nhận mật khẩu *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C6A15B]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`block w-full h-[52px] pl-10 pr-10 rounded-lg border text-xs sm:text-sm bg-[#F5F0E6]/50 text-[#1C2421] placeholder:text-[#8D958F] transition-colors focus:outline-none focus:bg-[#FBF8F1] ${
                        errors.confirmPassword
                          ? 'border-[#B9674A] focus:border-[#B9674A] focus:ring-1 focus:ring-[#B9674A]/20'
                          : 'border-[#E5DECE] focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]/30'
                      }`}
                      {...register('confirmPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8D958F] hover:text-[#063C2F] transition-colors cursor-pointer"
                      title={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-[#B9674A] font-medium mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-[#1C2421] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 rounded border-[#E5DECE] text-[#063C2F] focus:ring-[#C6A15B] accent-[#063C2F] cursor-pointer"
                    {...register('acceptTerms')}
                  />
                  <span className="text-[#1C2421]/80 leading-relaxed font-medium">
                    Tôi đồng ý với Quy chuẩn biên soạn &amp; Điều khoản bảo vệ tác quyền ẩm thực của Culinary Blog
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-xs text-[#B9674A] font-medium">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[52px] rounded-lg bg-[#C6A15B] text-[#022C24] hover:bg-[#063C2F] hover:text-[#FBF8F1] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-[#022C24] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Đăng ký tài khoản tác giả</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Editorial Footer Navigation to Login */}
            <div className="pt-4 border-t border-[#E5DECE] text-center text-xs text-[#8D958F] space-y-1">
              <div>
                <span>Đã có tài khoản tác giả? </span>
                <button
                  type="button"
                  onClick={() => onNavigate('/auth/login')}
                  className="font-bold text-[#063C2F] hover:text-[#C6A15B] transition-colors underline underline-offset-4 cursor-pointer ml-1"
                >
                  Đăng nhập vào hệ thống →
                </button>
              </div>
              <div className="text-[11px] text-[#8D958F]/70 pt-1">
                Không gian chia sẻ tinh hoa ẩm thực ba miền và tri thức làm bếp Việt
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};


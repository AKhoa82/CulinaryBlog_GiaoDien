import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Check, Eye, EyeOff, ArrowLeft, ArrowRight, Sparkles, ChefHat, AlertCircle } from 'lucide-react';
import { loginSchema, LoginFormData } from '../../../lib/validations';

export interface LoginPageProps {
  onNavigate: (path: string) => void;
  onSuccessLogin?: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onSuccessLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'anhkhoa080205@gmail.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setIsSubmitting(true);
    setAuthError(null);

    // Simulate Auth.js v5 signIn() call with latency
    setTimeout(() => {
      setIsSubmitting(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onSuccessLogin?.(data.email);
        onNavigate('/dashboard');
      }, 1000);
    }, 900);
  };

  const handleOAuthLogin = (provider: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccessLogin?.(`user_${provider}@example.com`);
      onNavigate('/dashboard');
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F0E6] flex flex-col justify-center">
      {/* Editorial Spread Container: Full Viewport on desktop */}
      <div className="w-full min-h-screen bg-[#FBF8F1] grid grid-cols-1 lg:grid-cols-12 shadow-sm">
        
        {/* =========================================================================
            LEFT PANEL: Cinematic Food Photography & Editorial Story (Visual Panel)
           ========================================================================= */}
        <div className="relative lg:col-span-5 min-h-[360px] sm:min-h-[420px] lg:min-h-screen overflow-hidden bg-[#022C24] flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-[#FBF8F1]">
          {/* Background Photography with Warm Contrast */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1400&q=85"
              alt="Tô phở bò truyền thống Việt Nam với thảo mộc thơm và nước dùng thanh trong"
              className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000 ease-out"
            />
            {/* Subtle multi-stop gradient: preserves natural food tones while providing legibility */}
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
              <span>Ấn phẩm ẩm thực</span>
            </span>
          </div>

          {/* Center / Bottom Editorial Quotation */}
          <div className="relative z-10 space-y-4 my-auto lg:my-0 lg:mt-auto pt-12 lg:pt-0">
            <div className="w-10 h-[2px] bg-[#C6A15B]" />
            
            <div className="space-y-2">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold">
                Triết Lý Ẩm Thực
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-[#FBF8F1] leading-[1.2] tracking-tight">
                “Ẩm thực không chỉ là món ăn. <br className="hidden sm:inline" />
                <span className="text-[#C6A15B] italic font-normal">Đó là câu chuyện</span> của mỗi gia đình.”
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#F5F0E6]/80 leading-relaxed max-w-md font-sans">
              Bếp Việt là nơi lưu giữ ký ức, tình thân và sự kết nối giữa những thế hệ qua từng tầng hương vị mộc mạc mà sâu sắc.
            </p>

            <div className="pt-3 border-t border-[#F5F0E6]/20 flex items-center justify-between text-[10px] text-[#F5F0E6]/60 uppercase tracking-[0.15em]">
              <span>Culinary Blog • Việt Nam</span>
              <span>Bản quyền nội dung © 2025</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT PANEL: Luxury Editorial Authentication Form (Auth Panel)
           ========================================================================= */}
        <div className="lg:col-span-7 bg-[#FBF8F1] flex flex-col justify-center py-10 sm:py-14 px-6 sm:px-12 lg:px-16">
          <div className="w-full max-w-[460px] mx-auto space-y-7">
            
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
                01 — Đăng Nhập
              </div>
            </div>

            {/* Editorial Heading Section */}
            <div className="space-y-2">
              <div className="w-8 h-[2px] bg-[#C6A15B]" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C2421] font-editorial tracking-tight leading-tight">
                Đăng Nhập <br />
                <span className="text-[#063C2F] font-normal italic">Vào Bếp Cùng Chúng Tôi</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#8D958F] leading-relaxed">
                Đăng nhập để tiếp tục khám phá, lưu giữ và chia sẻ những công thức ẩm thực yêu thích của bạn.
              </p>
            </div>

            {/* Social Authentication: Google & GitHub */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                disabled={isSubmitting}
                className="w-full h-[50px] flex items-center justify-center gap-3 px-4 border border-[#E5DECE] rounded-lg text-xs font-semibold text-[#1C2421] bg-[#FBF8F1] hover:bg-[#F5F0E6] hover:border-[#C6A15B] transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
                  />
                </svg>
                <span>Tiếp tục với Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('github')}
                disabled={isSubmitting}
                className="w-full h-[50px] flex items-center justify-center gap-3 px-4 border border-[#E5DECE] rounded-lg text-xs font-semibold text-[#1C2421] bg-[#FBF8F1] hover:bg-[#F5F0E6] hover:border-[#C6A15B] transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 fill-[#1C2421] shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Tiếp tục với GitHub</span>
              </button>
            </div>

            {/* Editorial Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-[#E5DECE] w-full" />
              <span className="bg-[#FBF8F1] px-3.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#8D958F] font-medium absolute">
                Hoặc tiếp tục bằng email
              </span>
            </div>

            {/* Success & Error Notifications */}
            {authSuccess && (
              <div className="p-3.5 bg-[#063C2F]/10 border border-[#063C2F]/30 rounded-lg flex items-center gap-2.5 text-xs text-[#063C2F] animate-fadeIn font-medium">
                <Check className="w-4 h-4 text-[#063C2F] shrink-0" />
                <span>Đăng nhập thành công! Đang chuyển hướng vào bàn làm việc...</span>
              </div>
            )}

            {authError && (
              <div className="p-3.5 bg-[#B9674A]/10 border border-[#B9674A]/30 rounded-lg flex items-center gap-2.5 text-xs text-[#B9674A] animate-fadeIn font-medium">
                <AlertCircle className="w-4 h-4 text-[#B9674A] shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form with React Hook Form + Zod */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Input */}
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

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#063C2F]">
                  Mật khẩu *
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-[#1C2421] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#E5DECE] text-[#063C2F] focus:ring-[#C6A15B] accent-[#063C2F] cursor-pointer"
                    {...register('rememberMe')}
                  />
                  <span className="text-[#1C2421]/80 font-medium">Ghi nhớ đăng nhập</span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Hệ thống đặt lại mật khẩu đã gửi hướng dẫn tới email của bạn.');
                  }}
                  className="text-xs text-[#063C2F] hover:text-[#C6A15B] font-medium transition-colors underline underline-offset-4"
                >
                  Quên mật khẩu?
                </a>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[52px] rounded-lg bg-[#C6A15B] text-[#022C24] hover:bg-[#063C2F] hover:text-[#FBF8F1] font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-[#022C24] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Đăng nhập vào hệ thống</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Editorial Footer Navigation to Register */}
            <div className="pt-4 border-t border-[#E5DECE] text-center text-xs text-[#8D958F] space-y-1">
              <div>
                <span>Chưa có tài khoản tác giả? </span>
                <button
                  type="button"
                  onClick={() => onNavigate('/auth/register')}
                  className="font-bold text-[#063C2F] hover:text-[#C6A15B] transition-colors underline underline-offset-4 cursor-pointer ml-1"
                >
                  Tạo tài khoản tác giả →
                </button>
              </div>
              <div className="text-[11px] text-[#8D958F]/70 pt-1">
                Bảo vệ bởi bản quyền nội dung ẩm thực &amp; Tiêu chuẩn bảo mật Culinary Blog
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};


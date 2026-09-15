import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Vui lòng nhập địa chỉ email hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự (tối đa 100)').max(100),
  userName: z
    .string()
    .min(3, 'Tên đăng nhập tối thiểu 3 ký tự')
    .max(30, 'Tên đăng nhập tối đa 30 ký tự')
    .regex(/^[a-zA-Z0-9_]+$/, 'Tên đăng nhập chỉ gồm chữ cái, số và dấu gạch dưới (không dấu cách)'),
  email: z.string().email('Địa chỉ email không đúng định dạng'),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa')
    .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 chữ số')
    .regex(/[^a-zA-Z0-9]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (@, #, $, ...)'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'Bạn phải đồng ý với Điều khoản sử dụng',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const recipeSchema = z.object({
  title: z.string().min(5, 'Tiêu đề công thức tối thiểu 5 ký tự'),
  slug: z.string().min(3, 'Đường dẫn slug tối thiểu 3 ký tự'),
  description: z.string().min(20, 'Mô tả ngắn cần tối thiểu 20 ký tự'),
  coverImage: z.string().url('Đường dẫn ảnh bìa không hợp lệ (cần URL https)'),
  categorySlug: z.string().min(1, 'Vui lòng chọn một danh mục'),
  difficulty: z.enum(['Dễ', 'Trung bình', 'Khó']),
  prepTimeMinutes: z.number().min(1, 'Thời gian chuẩn bị tối thiểu 1 phút'),
  cookTimeMinutes: z.number().min(0, 'Thời gian nấu không được âm'),
  servings: z.number().min(1, 'Khẩu phần ăn tối thiểu 1 người'),
  calories: z.number().min(10, 'Lượng calo tối thiểu 10 kcal'),
  tags: z.string().min(2, 'Nhập các thẻ tags cách nhau bởi dấu phẩy'),
  status: z.enum(['published', 'draft', 'archived']),
  ingredients: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, 'Tên nguyên liệu không được để trống'),
      amount: z.string().min(1, 'Số lượng'),
      unit: z.string().min(1, 'Đơn vị'),
      notes: z.string().optional(),
    })
  ).min(1, 'Cần ít nhất 1 nguyên liệu'),
  instructions: z.array(
    z.object({
      step: z.number(),
      title: z.string().min(3, 'Tiêu đề bước nấu'),
      description: z.string().min(10, 'Mô tả chi tiết bước nấu tối thiểu 10 ký tự'),
      durationMinutes: z.number().optional(),
      tip: z.string().optional(),
    })
  ).min(1, 'Cần ít nhất 1 bước hướng dẫn nấu'),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;

export const categorySchema = z.object({
  name: z.string().min(2, 'Tên danh mục tối thiểu 2 ký tự'),
  slug: z.string().min(2, 'Đường dẫn slug tối thiểu 2 ký tự'),
  description: z.string().min(10, 'Mô tả danh mục tối thiểu 10 ký tự'),
  image: z.string().url('URL hình ảnh không hợp lệ'),
  iconName: z.string().min(1, 'Vui lòng chọn biểu tượng'),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const profileSchema = z.object({
  name: z.string().min(2, 'Họ và tên tối thiểu 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  bio: z.string().max(300, 'Tiểu sử không vượt quá 300 ký tự'),
  location: z.string().min(2, 'Địa điểm sinh sống'),
  website: z.string().url('Website không hợp lệ').optional().or(z.literal('')),
  avatar: z.string().url('URL ảnh đại diện không hợp lệ'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

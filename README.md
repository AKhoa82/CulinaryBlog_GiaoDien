# ĐỒ ÁN MÔN HỌC: CULINARY BLOG - NỀN TẢNG BLOG ẨM THỰC & CHIA SẺ CÔNG THỨC NẤU ĂN

> **Khung Giao Diện (UI Skeleton) - Frontend Web Nâng Cao**  
> Dự án xây dựng giao diện ứng dụng web chia sẻ kinh nghiệm ẩm thực, hướng dẫn nấu ăn chuẩn cấu trúc hiện đại.

---

## 1. Giới thiệu Tổng quan Dự án

**Culinary Blog** là hệ thống blog ẩm thực và mạng xã hội chia sẻ công thức nấu ăn toàn diện, được thiết kế nhằm kết nối những người đam mê ẩm thực, đầu bếp gia đình và các tác giả ẩm thực chuyên nghiệp (Food Bloggers / Chefs). 

Hệ thống cho phép:
- Khám phá hàng trăm công thức nấu ăn phong phú từ món truyền thống Việt Nam đến ẩm thực Á - Âu.
- Tìm kiếm toàn văn bản (Full-text search) và lọc nâng cao theo danh mục, độ khó, thời gian nấu, mức năng lượng (calories).
- Hiển thị chi tiết từng bước nấu, định lượng nguyên liệu chuẩn xác kèm hình ảnh minh họa và dữ liệu vi mô chuẩn SEO ẩm thực (**Recipe Schema JSON-LD**).
- Cung cấp trang cá nhân quản lý công thức đã lưu và bộ sưu tập yêu thích.
- Bảng điều khiển quản trị (**Dashboard**) chuyên biệt cho Tác giả/Quản trị viên (Author/Admin) để quản lý danh mục, đăng tải, cập nhật và theo dõi số liệu các bài viết công thức.

---

## 2. Thông tin Nhóm Phát triển

- **Cơ sở đào tạo**: Trường Đại học Đà Lạt (Dalat University - DLU)
- **Khoa**: Công nghệ Thông tin
- **Đối tượng**: Sinh viên năm 3
- **Thành viên thực hiện**:
  1. **Lê Anh Khoa** (Trưởng nhóm - Phát triển Frontend & Kiến trúc hệ thống)
  2. Các thành viên nhóm đồ án môn học Phát triển Ứng dụng Web nâng cao.

---

## 3. Danh sách Công nghệ Frontend Sử dụng

| Công nghệ / Thư viện | Phiên bản | Vai trò & Mục đích sử dụng |
| :--- | :--- | :--- |
| **Next.js (App Router)** | 14+ / 15 | Khung kiến trúc Frontend chính, Server Components, Route Handlers, Nested Layouts |
| **TypeScript** | 5.8+ | Định kiểu tĩnh an toàn, tự động gợi ý code, hạn chế lỗi runtime |
| **Tailwind CSS** | v4 / Modern | Hệ thống utility-first CSS styling, thiết kế responsive mobile-first tối ưu |
| **TanStack Query (React Query)** | v5 | Quản lý server state, cache dữ liệu, fetch data giả lập và quản lý trạng thái loading/error |
| **React Hook Form** | v7 | Xử lý form hiệu năng cao, tránh re-render thừa cho các biểu mẫu tạo/sửa công thức |
| **Zod** | v3 | Schema declaration và validation dữ liệu biểu mẫu (đăng nhập, đăng ký, công thức) |
| **Auth.js (NextAuth.js)** | v5 | Chuẩn kiến trúc xác thực phiên người dùng, OAuth Providers & Credentials |
| **Lucide React** | Latest | Bộ icon vector giao diện người dùng hiện đại, sắc nét |
| **Motion** | Latest | Hiệu ứng chuyển động mượt mà cho các tương tác người dùng |

---

## 4. Cấu trúc Thư mục Hệ thống (Monorepo-ready)

```text
├── backend/                        # Thư mục dịch vụ Backend API (sẽ phát triển ở giai đoạn tiếp theo)
│   └── README.md
├── frontend/                       # Toàn bộ mã nguồn Frontend theo cấu trúc Next.js App Router
│   ├── app/                        # Next.js 14+ App Router Routes
│   │   ├── (auth)/                 # Nhóm route xác thực
│   │   │   ├── login/page.tsx      # /auth/login - Form đăng nhập Auth.js
│   │   │   └── register/page.tsx   # /auth/register - Form đăng ký tài khoản
│   │   ├── categories/             # Quản lý danh mục phía độc giả
│   │   │   ├── page.tsx            # /categories - Danh sách tất cả danh mục
│   │   │   └── [slug]/page.tsx     # /categories/[slug] - Danh mục chi tiết & danh sách món
│   │   ├── dashboard/              # Bảng điều khiển Author / Admin
│   │   │   ├── layout.tsx          # Layout Dashboard kèm Sidebar & Topbar
│   │   │   ├── page.tsx            # /dashboard - Tổng quan & số liệu thống kê
│   │   │   ├── categories/page.tsx # /dashboard/categories - Quản lý danh mục
│   │   │   └── recipes/            # Quản lý công thức
│   │   │       ├── page.tsx        # /dashboard/recipes - Bảng danh sách công thức
│   │   │       ├── new/page.tsx    # /dashboard/recipes/new - Form tạo công thức mới
│   │   │       └── [id]/edit/      # /dashboard/recipes/[id]/edit - Form chỉnh sửa
│   │   ├── profile/page.tsx        # /profile - Xem & chỉnh sửa thông tin cá nhân
│   │   ├── recipes/                # Khám phá công thức nấu ăn
│   │   │   ├── page.tsx            # /recipes - Tìm kiếm & lọc công thức nâng cao
│   │   │   └── [slug]/page.tsx     # /recipes/[slug] - Chi tiết công thức & JSON-LD
│   │   ├── search/page.tsx         # /search - Trang tìm kiếm toàn văn bản
│   │   ├── layout.tsx              # Root Layout (Navbar, Footer, QueryProvider)
│   │   └── page.tsx                # / - Trang chủ (Featured recipes & categories)
│   ├── components/                 # Các thành phần giao diện tái sử dụng
│   │   ├── layout/                 # Navbar, Footer, Sidebar, Breadcrumb
│   │   ├── recipes/                # RecipeCard, RecipeGrid, NutritionTable, JsonLdPreview
│   │   └── ui/                     # UI components nguyên tử (Button, Card, Input, Skeleton, Badge, Tabs)
│   ├── lib/                        # Thư viện tiện ích, mock data, schema validation, auth config
│   │   ├── auth.ts                 # Cấu hình Auth.js v5
│   │   ├── mock-data.ts            # Dữ liệu tĩnh công thức, danh mục, người dùng
│   │   ├── query-client.ts         # Khởi tạo TanStack Query client
│   │   ├── utils.ts                # Hàm tiện ích xử lý chuỗi, định dạng ngày, slug
│   │   └── validations.ts          # Zod schema cho Auth và Recipe form
│   └── types/                      # TypeScript definitions cho hệ thống
│       └── index.ts
├── src/                            # Bộ chuyển cảnh & tích hợp xem trước trực tiếp (Live Interactive App)
├── README.md                       # Tài liệu hướng dẫn đồ án (Tiếng Việt)
├── metadata.json                   # Cấu hình metadata dự án
└── package.json                    # Cấu hình gói và dependencies
```

---

## 5. Hướng dẫn Chạy Môi trường Development

### Yêu cầu hệ thống:
- **Node.js**: Phiên bản 18.18.0 hoặc 20+ trở lên.
- **npm** (hoặc `yarn` / `pnpm`).

### Các bước cài đặt và khởi chạy:

1. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```

2. **Khởi chạy máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ khởi chạy tại cổng mặc định `http://localhost:3000`.

3. **Kiểm tra cú pháp & kiểu dữ liệu (Type check & Lint):**
   ```bash
   npm run lint
   ```

4. **Xây dựng phiên bản hoàn thiện (Production Build):**
   ```bash
   npm run build
   ```

---

## 6. Tính năng Nổi bật trong Bộ Khung Giao Diện (UI Skeleton)

- **Trải nghiệm Responsive hoàn chỉnh**: Tương thích trên màn hình điện thoại di động (Mobile < 640px), máy tính bảng (Tablet 640px - 1024px) và máy tính để bàn (Desktop > 1024px).
- **Trạng thái Tải dữ liệu (Loading Skeleton)**: Tích hợp nút mô phỏng bật/tắt **Skeleton Loading** trên toàn bộ các trang (Recipe Cards, Recipe Detail, Dashboard Stats, Categories) nhằm kiểm tra phản hồi người dùng khi dữ liệu đang được fetch.
- **Hỗ trợ SEO Ẩm thực (JSON-LD)**: Trang chi tiết công thức (`/recipes/[slug]`) nhúng sẵn cấu trúc Schema.org `Recipe` với đầy đủ tên, mô tả, ảnh, thời gian nấu, khẩu phần, nguyên liệu, các bước nấu và chỉ số dinh dưỡng.
- **Form Validation chuẩn mực**: Form đăng nhập, đăng ký và form soạn thảo công thức áp dụng **React Hook Form** kết hợp **Zod schema** để kiểm tra tính hợp lệ dữ liệu ngay tại giao diện người dùng.
- **Bảng điều khiển tác giả hiện đại**: Quản lý danh sách công thức với thanh tìm kiếm, phân loại theo trạng thái (Đã xuất bản, Bản nháp, Chờ duyệt), hành động xem, sửa, xóa nhanh.

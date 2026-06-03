// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest): NextResponse {
//   const { pathname } = request.nextUrl;

//   // 1. Chỉ áp dụng kiểm tra quyền cho các đường dẫn bắt đầu bằng /admin
//   if (pathname.startsWith("/admin")) {
    
//     // 2. Lấy thông tin user/token từ Cookie (hoặc localStorage tùy cách bạn lưu khi đăng nhập)
//     // Thông thường, để Middleware đọc được ở phía Server-Side, bạn nên lưu thông tin đăng nhập vào Cookie.
//     const userCookie = request.cookies.get("user_info")?.value;
//     const token = request.cookies.get("access_token")?.value;

//     // Trường hợp 1: Chưa đăng nhập (Không có token hoặc cookie thông tin)
//     if (!token || !userCookie) {
//       // Chuyển hướng ngay về trang đăng nhập
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     try {
//       const userInfo = JSON.parse(userCookie);

//       // Trường hợp 2: Có đăng nhập nhưng maLoaiNguoiDung KHÔNG PHẢI là Giáo vụ/Admin ('GV')
//       if (userInfo.maLoaiNguoiDung !== "GV") {
//         // Đá người dùng về trang chủ của client vì không có quyền truy cập admin
//         return NextResponse.redirect(new URL("/", request.url));
//       }
//     } catch (error) {
//       // Phòng trường hợp parse JSON cookie bị lỗi
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   // Cho phép tiếp tục truy cập nếu thỏa mãn các điều kiện
//   return NextResponse.next();
// }

// // Cấu hình matcher để Next.js chỉ chạy middleware này khi vào các trang admin
// export const config = {
//   matcher: ["/admin/:path*"],
// };
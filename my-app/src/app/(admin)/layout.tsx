"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        // 1. Lấy chuỗi thông tin user đăng nhập từ localStorage.
        // Bạn nhớ kiểm tra xem lúc Đăng nhập, bạn lưu tên key là 'user_info', 'user' hay 'USER_LOGIN' nhé!
        const localUser = localStorage.getItem("user_info") || localStorage.getItem("user") || localStorage.getItem("USER_LOGIN");
        
        if (!localUser) {
          // Nếu không tìm thấy ai đăng nhập -> Đẩy về trang đăng nhập
          router.push("/login");
          return;
        }

        const userInfo = JSON.parse(localUser);

        // 2. Kiểm tra vai trò: Nếu KHÔNG PHẢI là Giáo vụ ('GV') thì chặn lại
        if (userInfo.maLoaiNguoiDung !== "GV") {
          alert("Tài khoản của bạn không có quyền truy cập vào khu vực quản trị!");
          router.push("/"); // Đẩy học viên về trang chủ client
          return;
        }

        // 3. Nếu đúng là Giáo vụ ('GV') -> Kích hoạt cho phép vào
        setIsAuthorized(true);
      } catch (error) {
        console.error("Lỗi kiểm tra quyền hạn:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Trong vài mili-giây hệ thống đang đọc localStorage thì hiện vòng xoay chờ
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <Spin size="large" tip="Đang xác thực quyền quản trị..." />
      </div>
    );
  }

  // Đúng quyền Giáo vụ mới hiển thị các trang Admin con (children)
  return isAuthorized ? <>{children}</> : null;
}
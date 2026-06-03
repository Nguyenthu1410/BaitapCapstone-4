"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import AdminLayoutWrapper from "./AdminLayoutWrapper";
import { UserInfo } from "@/src/types/course";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        if (typeof window === "undefined") return;

        const localUser = localStorage.getItem("userLogin");
        
        if (!localUser || localUser === "undefined" || localUser === "null") {
          router.push("/signIn");
          return;
        }

        const userInfo = JSON.parse(localUser) as UserInfo;

        if (!userInfo || userInfo.maLoaiNguoiDung !== "GV") {
          alert("Tài khoản của bạn không có quyền truy cập vào khu vực quản trị!");
          router.push("/"); 
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Lỗi kiểm tra quyền hạn:", error);
        router.push("/signIn");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-50">
        <Spin size="large" description="Đang xác thực quyền quản trị Giáo vụ..." />
      </div>
    );
  }

  return isAuthorized ? (
    <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
  ) : null;
}
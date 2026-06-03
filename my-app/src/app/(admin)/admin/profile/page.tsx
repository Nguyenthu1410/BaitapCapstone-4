"use client";

import React from "react";
import { Card, Skeleton, Avatar, Tag, Divider } from "antd";
import { User, Mail, Phone, ShieldCheck, Key, Users } from "lucide-react";
import { useAdminProfile } from "@/src/hook/admin/useAdminProfile"; 

export default function AdminProfilePage() {
  const { profile, isLoading } = useAdminProfile();

  if (isLoading) {
    return (
      <div className="p-6 bg-[#f5f7fa] min-h-screen flex justify-center items-center">
        <Card className="w-full max-w-2xl rounded-xl shadow-sm">
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 bg-[#f5f7fa] min-h-screen flex justify-center items-center text-red-500 font-bold">
        Không thể lấy thông tin hồ sơ Admin. Bạn vui lòng đăng nhập lại hệ thống nhé!
      </div>
    );
  }

  const initial = profile.hoTen ? profile.hoTen.charAt(0).toUpperCase() : "A";

  return (
    <div className="p-6 bg-[#f5f7fa] min-h-full flex flex-col gap-6 font-sans">
      {/* Tiêu đề trang */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <User size={24} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 m-0">Hồ sơ cá nhân Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Xem chi tiết thông tin tài khoản và quyền hạn quản trị.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* BÊN TRÁI: KHỐI AVATAR VÀ VAI TRÒ */}
        <Card className="md:col-span-1 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center p-6 bg-white">
          <div className="flex justify-center w-full mb-4">
            <Avatar size={100} className="bg-blue-600 text-white text-4xl font-black shadow-md flex items-center justify-center">
              {initial}
            </Avatar>
          </div>
          <h2 className="text-xl font-bold text-gray-800 m-0">{profile.hoTen}</h2>
          <p className="text-gray-400 text-sm mt-1 mb-4">{profile.email}</p>
          <Tag color={profile.maLoaiNguoiDung === "GV" ? "volcano" : "blue"} className="rounded-md px-4 py-1 font-bold text-sm border-transparent">
            {profile.maLoaiNguoiDung === "GV" ? "Ban Giáo Vụ (Admin)" : "Học Viên"}
          </Tag>
        </Card>

        {/* BÊN PHẢI: THÔNG TIN CHI TIẾT */}
        <Card className="md:col-span-2 rounded-xl shadow-sm border border-gray-100 bg-white">
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <ShieldCheck size={22} className="text-blue-600" /> Chi tiết bảo mật tài khoản
          </h3>
          <p className="text-gray-400 text-xs m-0">Thông tin cá nhân được đồng bộ trực tiếp từ cơ sở dữ liệu Cybersoft.</p>
          
          <Divider className="my-4" />
          
          <div className="space-y-4 text-sm">
            {/* Hàng Tài khoản */}
            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium flex items-center gap-2.5">
                <User size={16} className="text-gray-400" /> Tên tài khoản
              </span>
              <span className="text-gray-800 font-bold tracking-wide bg-gray-100 px-2 py-1 rounded">{profile.taiKhoan}</span>
            </div>

            {/* Hàng Mật khẩu */}
            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium flex items-center gap-2.5">
                <Key size={16} className="text-gray-400" /> Mật khẩu đăng nhập
              </span>
              <span className="text-gray-400 font-mono tracking-widest">••••••••</span>
            </div>

            {/* Hàng Email */}
            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium flex items-center gap-2.5">
                <Mail size={16} className="text-gray-400" /> Email
              </span>
              <span className="text-gray-700 font-medium">{profile.email}</span>
            </div>

            {/* Hàng Số điện thoại */}
            <div className="flex items-center justify-between py-2.5 border-b border-gray-50">
              <span className="text-gray-500 font-medium flex items-center gap-2.5">
                <Phone size={16} className="text-gray-400" /> Số điện thoại
              </span>
              <span className="text-gray-700 font-medium">{profile.soDT || "Chưa thiết lập"}</span>
            </div>

            {/* Hàng Mã nhóm */}
            <div className="flex items-center justify-between py-2.5">
              <span className="text-gray-500 font-medium flex items-center gap-2.5">
                <Users size={16} className="text-gray-400" /> Hệ thống phân vùng
              </span>
              <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-md text-xs tracking-wider border border-blue-100">
                Nhóm {profile.maNhom || "GP01"}
              </span>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
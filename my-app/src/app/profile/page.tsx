"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PUBLIC_PATH } from "../../constant/path";
import { UserProfile } from "@/src/types/course";


export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLogin");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push(PUBLIC_PATH.SIGN_IN);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    router.push(PUBLIC_PATH.HOME);
  };

  if (!user) return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Đang tải dữ liệu...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Phần Banner và Avatar */}
        <div className="bg-gradient-to-r from-blue-600 to-[#1a73e8] p-10 text-center text-white relative">
          <div className="w-28 h-28 bg-white text-blue-600 rounded-full mx-auto flex items-center justify-center text-5xl font-black mb-5 shadow-xl uppercase border-4 border-blue-200">
            {user.hoTen.charAt(0)}
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{user.hoTen}</h1>
          <div className="flex justify-center gap-2">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">
              {user.maLoaiNguoiDung === "HV" ? "👨‍🎓 Học viên" : "👨‍🏫 Giảng viên"}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">
              Nhóm: {user.maNhom}
            </span>
          </div>
        </div>
        
        {/* Phần hiển thị chi tiết thông tin */}
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-center border-b border-slate-100 pb-5 mb-8">
             <h2 className="text-xl font-bold text-slate-800">Chi tiết tài khoản</h2>
          </div>
          
          {/* Lưới chứa thông tin (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Họ và tên</label>
              <div className="text-slate-800 bg-slate-50/50 p-3.5 rounded-xl border border-slate-200 font-medium shadow-sm">
                {user.hoTen}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tên tài khoản</label>
              <div className="text-slate-800 bg-slate-50/50 p-3.5 rounded-xl border border-slate-200 font-medium shadow-sm">
                {user.taiKhoan}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Địa chỉ Email</label>
              <div className="text-slate-800 bg-slate-50/50 p-3.5 rounded-xl border border-slate-200 font-medium shadow-sm">
                {user.email}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Số điện thoại</label>
              <div className="text-slate-800 bg-slate-50/50 p-3.5 rounded-xl border border-slate-200 font-medium shadow-sm">
                {user.soDT || <span className="text-slate-400 italic">Chưa cập nhật số điện thoại</span>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mã loại người dùng</label>
              <div className="text-slate-800 bg-slate-50/50 p-3.5 rounded-xl border border-slate-200 font-medium shadow-sm">
                {user.maLoaiNguoiDung} {user.maLoaiNguoiDung === "HV" && "(Học viên)"}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mã nhóm đăng ký</label>
              <div className="text-slate-800 bg-slate-50/50 p-3.5 rounded-xl border border-slate-200 font-medium shadow-sm">
                {user.maNhom}
              </div>
            </div>
            
          </div>

          {/* Cụm nút bấm */}
          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <button 
              className="flex-1 bg-[#1a73e8] hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              onClick={() => alert("Chức năng cập nhật thông tin đang được phát triển")}
            >
              Cập nhật thông tin
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3.5 px-4 rounded-xl border border-red-200 transition-all shadow-sm active:scale-[0.98]"
            >
              Đăng xuất khỏi hệ thống
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
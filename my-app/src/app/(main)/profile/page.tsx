"use client";

import React, { useState } from "react";
import { useProfile } from "@/src/hook/clients/useProfile"; 

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");

  const {
    user,
    isEdit,
    setIsEdit,
    formData,
    setFormData,
    handleUpdate,
    handleCancel,
    handleDeleteCourse,
  } = useProfile();

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-xl font-semibold text-slate-400 animate-pulse">
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-10">
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4 items-start">
        
        {/* SIDEBAR */}
        <div className="w-full md:w-1/3 lg:w-1/4 sticky top-6 space-y-4">
          <div className="bg-white py-8 px-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-linear-to-tr from-slate-400 to-slate-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg ring-4 ring-slate-50">
              {user.hoTen ? user.hoTen.charAt(0).toUpperCase() : "U"}
            </div>
            <h2 className="text-xl font-bold text-slate-800 text-center">
              {user.hoTen}
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-1">
              {user.maLoaiNguoiDung === "GV" ? "Giảng viên" : "Học viên mới"}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-2">
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 ${
                activeTab === "account"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200 font-bold"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <span className="text-lg">👤</span> Thông tin tài khoản
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 mt-1 ${
                activeTab === "courses"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200 font-bold"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <span className="text-lg">📚</span> Khóa học của tôi
            </button>
          </div>
        </div>

        {/* NỘI DUNG CHÍNH */}
        <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
          
          {/* TAB THÔNG TIN TÀI KHOẢN */}
          {activeTab === "account" && (
            <div className="animate-fade-in space-y-6">
              
              {/* Hàng thống kê */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Khóa học ghi danh</p>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-black text-slate-800">{user.chiTietKhoaHocGhiDanh?.length || 0}</span>
                    <span className="text-slate-400 font-bold text-xs bg-slate-50 px-2 py-1 rounded-lg">Khóa</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Tiến độ học tập</p>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-black text-slate-800">0%</span>
                    <div className="w-20 h-2 bg-slate-100 rounded-full mb-2 overflow-hidden">
                      <div className="bg-blue-400 h-full w-[0%]"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Điểm rèn luyện</p>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-3xl font-black text-slate-800">0</span>
                    <span className="text-slate-300 text-xl">🔘</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Form Profile */}
                <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-slate-800">Hồ sơ cá nhân</h3>
                    {!isEdit && (
                      <button 
                        onClick={() => setIsEdit(true)} 
                        className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        Chỉnh sửa
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Họ và tên</label>
                      {isEdit ? (
                        <input type="text" name="hoTen" value={formData?.hoTen || ""} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
                      ) : (
                        <p className="text-slate-700 font-semibold px-4 py-3 bg-slate-50/50 rounded-2xl border border-transparent">{user.hoTen}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Số điện thoại</label>
                      {isEdit ? (
                        <input type="text" name="soDT" value={formData?.soDT || ""} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
                      ) : (
                        <p className="text-slate-700 font-semibold px-4 py-3 bg-slate-50/50 rounded-2xl border border-transparent">{user.soDT}</p>
                      )}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email liên hệ</label>
                      {isEdit ? (
                        <input type="email" name="email" value={formData?.email || ""} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" />
                      ) : (
                        <p className="text-slate-700 font-semibold px-4 py-3 bg-slate-50/50 rounded-2xl border border-transparent">{user.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Tài khoản</label>
                      <p className="text-slate-400 font-medium px-4 py-3 bg-slate-100 rounded-2xl border border-slate-200 cursor-not-allowed">{user.taiKhoan}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Nhóm</label>
                      <p className="text-slate-400 font-medium px-4 py-3 bg-slate-100 rounded-2xl border border-slate-200 cursor-not-allowed">{user.maNhom || "GP01"}</p>
                    </div>
                  </div>

                  {isEdit && (
                    <div className="mt-10 flex gap-4 border-t pt-8">
                      <button onClick={handleUpdate} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95">Lưu thay đổi</button>
                      <button onClick={handleCancel} className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">Hủy</button>
                    </div>
                  )}
                </div>

                {/* Trạng thái học viên */}
                <div className="w-full lg:w-72 space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-800 text-sm mb-4">Kỹ năng hiện có</h4>
                    <div className="text-center py-4">
                      <p className="text-slate-400 text-xs italic">Chưa cập nhật kỹ năng</p>
                    </div>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest">Hạng thành viên</p>
                      <p className="text-lg font-black mt-2">MỚI BẮT ĐẦU</p>
                      <p className="text-[11px] mt-2 opacity-80 leading-relaxed">Hãy hoàn thành khóa học đầu tiên để thăng hạng!</p>
                    </div>
                    <div className="absolute -bottom-4 -right-4 text-6xl opacity-10 uppercase font-black italic">NEW</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB KHÓA HỌC CỦA TÔI */}
          {activeTab === "courses" && (
            <div className="animate-fade-in transition-all">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">Khóa học của tôi</h3>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                    {user.chiTietKhoaHocGhiDanh?.length || 0} đang tham gia
                  </span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[10px] font-black text-slate-400 uppercase bg-slate-50/30">
                        <th className="px-6 py-5">STT</th>
                        <th className="px-6 py-5">Khóa học</th>
                        <th className="px-6 py-5">Hình ảnh</th>
                        <th className="px-6 py-5">Lượt xem</th>
                        <th className="px-6 py-5 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {user.chiTietKhoaHocGhiDanh?.map((item: any, index: number) => (
                        <tr key={item.maKhoaHoc} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4 text-sm font-bold text-slate-300">{index + 1}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-700 max-w-55 truncate group-hover:text-blue-600 transition-colors">
                            {item.tenKhoaHoc}
                          </td>
                          <td className="px-6 py-4">
                            <img src={item.hinhAnh} alt={item.tenKhoaHoc} className="w-16 h-10 object-cover rounded-xl shadow-sm border border-slate-100" />
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-400">
                             {item.luotXem} lượt
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => handleDeleteCourse(item.maKhoaHoc)}
                              className="px-4 py-2 bg-red-50 text-red-600 text-[10px] font-black uppercase rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                            >
                              Hủy học
                            </button>
                          </td>
                        </tr>
                      ))}
                      {(!user.chiTietKhoaHocGhiDanh || user.chiTietKhoaHocGhiDanh.length === 0) && (
                        <tr>
                          <td colSpan={5} className="px-6 py-20 text-center">
                            <p className="text-slate-400 italic text-sm font-medium">Bạn chưa ghi danh khóa học nào.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
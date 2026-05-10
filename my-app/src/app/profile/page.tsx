"use client";

import { useProfile } from "@/src/hook/useProfile";

// Icon SVG thay thế Lucide để tránh lỗi SSR
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;

export default function ProfilePage() {
  const {
    user,
    isEdit,
    setIsEdit,
    formData,
    setFormData,
    handleUpdate,
    handleCancel,
    handleDeleteCourse // Hàm mới thêm vào
  } = useProfile();

  if (!user) return <div className="p-20 text-center animate-pulse">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 px-4 select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* CỘT TRÁI: SIDEBAR MENU */}
        <div className="md:w-1/4 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-blue-400 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold mb-4 shadow-lg uppercase">
              {user.hoTen.charAt(0)}
            </div>
            <h2 className="font-bold text-slate-800 text-lg">{user.hoTen}</h2>
            <p className="text-slate-400 text-sm italic">{user.maLoaiNguoiDung === "HV" ? "Học viên" : "Giảng viên"}</p>
          </div>

          <nav className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 text-blue-600 bg-blue-50 font-bold border-r-4 border-blue-600">
              <UserIcon /> Thông tin tài khoản
            </button>
            <button className="w-full flex items-center gap-3 p-4 text-slate-600 hover:bg-slate-50 font-medium transition-colors">
              <BookIcon /> Khóa học của tôi
            </button>
          </nav>
        </div>

        {/* CỘT PHẢI: NỘI DUNG CHÍNH */}
        <div className="md:w-3/4 space-y-8">
          
          {/* SECTION 1: THÔNG TIN CÁ NHÂN */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Thông tin cá nhân</h3>
              {!isEdit && (
                <button onClick={() => setIsEdit(true)} className="text-xs font-bold text-blue-600 hover:underline">Chỉnh sửa</button>
              )}
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Họ và tên</label>
                <input 
                  disabled={!isEdit}
                  value={formData?.hoTen || ""}
                  onChange={(e) => setFormData({...formData, hoTen: e.target.value})}
                  className={`w-full p-3 rounded-xl border text-sm font-medium transition-all ${isEdit ? "border-blue-400 bg-white outline-none ring-4 ring-blue-50" : "border-transparent bg-slate-50 text-slate-700"}`} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Email</label>
                <input 
                  disabled={!isEdit}
                  value={formData?.email || ""}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full p-3 rounded-xl border text-sm font-medium transition-all ${isEdit ? "border-blue-400 bg-white outline-none ring-4 ring-blue-50" : "border-transparent bg-slate-50 text-slate-700"}`} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Số điện thoại</label>
                <input 
                  disabled={!isEdit}
                  value={formData?.soDT || ""}
                  onChange={(e) => setFormData({...formData, soDT: e.target.value})}
                  className={`w-full p-3 rounded-xl border text-sm font-medium transition-all ${isEdit ? "border-blue-400 bg-white outline-none ring-4 ring-blue-50" : "border-transparent bg-slate-50 text-slate-700"}`} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Tài khoản</label>
                <input disabled value={user.taiKhoan} className="w-full p-3 rounded-xl border border-transparent bg-slate-100 text-slate-400 text-sm font-medium cursor-not-allowed" />
              </div>
            </div>

            {isEdit && (
              <div className="px-8 pb-8 flex gap-3">
                <button onClick={handleUpdate} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all">Lưu thay đổi</button>
                <button onClick={handleCancel} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold active:scale-95">Hủy</button>
              </div>
            )}
          </div>

          {/* SECTION 2: KHÓA HỌC CỦA TÔI (GIỐNG ẢNH) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Khóa học của tôi</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 uppercase bg-slate-50/30">
                    <th className="px-6 py-4">STT</th>
                    <th className="px-6 py-4">Khóa học</th>
                    <th className="px-6 py-4">Hình ảnh</th>
                    <th className="px-6 py-4">Lượt xem</th>
                    <th className="px-6 py-4 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {user.chiTietKhoaHocGhiDanh?.map((item: any, index: number) => (
                    <tr key={item.maKhoaHoc} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-400">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-700 max-w-[200px] truncate">{item.tenKhoaHoc}</td>
                      <td className="px-6 py-4">
                        <img src={item.hinhAnh} className="w-16 h-10 object-cover rounded-lg shadow-sm border border-slate-100" />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-500">{item.luotXem}</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleDeleteCourse(item.maKhoaHoc)}
                          className="px-4 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all active:scale-90"
                        >
                          Hủy
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!user.chiTietKhoaHocGhiDanh || user.chiTietKhoaHocGhiDanh.length === 0) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic text-sm">Bạn chưa đăng ký khóa học nào.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
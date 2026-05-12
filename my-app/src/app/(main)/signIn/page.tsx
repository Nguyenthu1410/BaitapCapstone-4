"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authServices } from '@/src/services/authServices';
import { PUBLIC_PATH } from '@/src/constant/path';
import Link from 'next/link';

export default function SigninPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(''); 
    try {
      const result = await authServices.login(formData);

     // 1. Lưu thông tin đăng nhập
      localStorage.setItem('userLogin', JSON.stringify(result));

     // 2. MỚI THÊM: Báo cho Header biết để nó tự động cập nhật Avatar ngay lập tức!
      window.dispatchEvent(new Event('storage'));

     // 3. Thông báo và chuyển hướng
      alert('Đăng nhập thành công!');
      router.push(PUBLIC_PATH.HOME); 
      
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status; 
        const errorMessage = error.response.data; 
        
        setErrorMsg(`Lỗi ${statusCode}: ${errorMessage}`);
      } else {
        setErrorMsg('Lỗi kết nối đến máy chủ!');
      }
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Tính năng khôi phục mật khẩu tự động đang được bảo trì.\nVui lòng liên hệ Hotline: 0961.05.10.14 hoặc Email: info@cybersoft.edu.vn để được Admin cấp lại mật khẩu!");
    setIsForgotPasswordOpen(false);
    setForgotEmail('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 font-sans relative">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full max-w-md mx-4">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800 mb-2">Chào mừng trở lại</h2>
          <p className="text-slate-500 font-medium">Vui lòng đăng nhập để tiếp tục học tập</p>
        </div>
        
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
            <svg xmlns="http:ww.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">Tài khoản</label>
            <input
              type="text"
              name="taiKhoan"
              value={formData.taiKhoan}
              onChange={handleChange}
              placeholder="Nhập tên tài khoản..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all text-slate-700 font-medium placeholder-slate-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">Mật khẩu</label>
              <button 
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none"
              >
                Quên mật khẩu?
              </button>
            </div>
            <input
              type="password"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all text-slate-700 font-medium placeholder-slate-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1a73e8] text-white py-3.5 px-4 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98] mt-2"
          >
            Đăng nhập hệ thống
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          <p className="text-slate-500 font-medium">
            Chưa có tài khoản?{' '}
            <Link href={PUBLIC_PATH.REGISTER} className="text-blue-600 font-bold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>

      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Khôi phục mật khẩu</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">
                Vui lòng nhập địa chỉ email bạn đã dùng để đăng ký. Chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu cho bạn.
              </p>
              
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Địa chỉ Email</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="vidu@email.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all text-slate-700 font-medium"
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(false)}
                    className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors active:scale-[0.98]"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
                  >
                    Gửi yêu cầu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}


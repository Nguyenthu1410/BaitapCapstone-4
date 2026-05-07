"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authServices } from '@/src/services/authServices';

export default function SigninPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(''); 
    try {
      const result = await authServices.login(formData);

      localStorage.setItem('userLogin', JSON.stringify(result));

      alert('Đăng nhập thành công!');
      router.push('/'); 
      
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>
        
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tài khoản</label>
            <input
              type="text"
              name="taiKhoan"
              value={formData.taiKhoan}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
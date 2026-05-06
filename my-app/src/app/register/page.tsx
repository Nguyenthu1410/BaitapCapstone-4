"use client";
import React from "react";
import { authServices } from "@/src/services/authServices";
import { RegisterForm } from "@/src/types/course";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    defaultValues: { 
      maNhom: "GP01", 
      maLoaiNguoiDung: "HV" 
    }
  });

  const onSubmit = async (data: RegisterForm) => {
    console.log("Dữ liệu gửi đi:", data); // Kiểm tra xem hàm có chạy tới đây không
    try {
      const result = await authServices.register(data);
      console.log("Dữ liệu trả về:", result.data); 
      alert("Đăng ký thành công!");
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data; 
        const status = error.response.status;  
        
        console.error(`Lỗi ${status}:`, errorData);
        alert(`Đăng ký thất bại: ${errorData || "Vui lòng kiểm tra lại thông tin"}`);
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-slate-50 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-800">Tạo Tài Khoản</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Trường Tai Khoan */}
        <input
          {...register("taiKhoan", { required: "Tài khoản không được để trống" })}
          placeholder="Tài khoản"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.taiKhoan && <p className="text-red-500 text-xs">{errors.taiKhoan.message}</p>}

        <input
          type="password"
          {...register("matKhau", { required: "Mật khẩu không được để trống" })}
          placeholder="Mật khẩu"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          {...register("hoTen", { required: "Họ tên không được để trống" })}
          placeholder="Họ và tên"
          className="w-full p-3 border rounded-lg"
        />

        <input
          {...register("email", { required: "Email không được để trống" })}
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
        />

        <input
          {...register("soDT", { required: "Số điện thoại không được để trống" })}
          placeholder="Số điện thoại"
          className="w-full p-3 border rounded-lg"
        />

        <input type="hidden" {...register("maLoaiNguoiDung")} />

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition"
        >
          Đăng Ký Ngay
        </button>
      </form>
    </div>
  );
}
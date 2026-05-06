"use client";
import React from "react";
import { authServices } from "@/src/services/authServices";
import { RegisterForm } from "@/src/types/course";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
    defaultValues: {
      maNhom: "GP01",
      maLoaiNguoiDung: "HV",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const result = await authServices.register(data);
      console.log("Dữ liệu trả về:", result.data);
      alert("Đăng ký thành công!");
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data;
        const status = error.response.status;

        console.error(`Lỗi ${status}:`, errorData);
        alert(
          `Đăng ký thất bại: ${errorData || "Vui lòng kiểm tra lại thông tin"}`,
        );
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-slate-50 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-800">
        Tạo Tài Khoản
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* TÀI KHOẢN */}
        <div>
          <input
            {...register("taiKhoan", {
              required: "Tài khoản không được để trống",
            })}
            placeholder="Tài khoản"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.taiKhoan && (
            <p className="text-red-500 text-xs">{errors.taiKhoan.message}</p>
          )}
        </div>

        {/* MẬT KHẨU */}
        <div>
          <input
            type="password"
            {...register("matKhau", {
              required: "Mật khẩu không được để trống",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Mật khẩu cần có chữ hoa, chữ thường, số và ký tự đặc biệt",
              },
            })}
            placeholder="Mật khẩu (Ít nhất 8 ký tự)"
            className={`w-full p-3 border rounded-lg ${errors.matKhau ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.matKhau && (
            <p className="text-red-500 text-xs mt-1">
              {errors.matKhau.message}
            </p>
          )}
        </div>

        {/* HỌ TÊN */}
        <div>
          <input
            {...register("hoTen", {
              required: "Họ tên không được để trống",
              minLength: { value: 2, message: "Họ tên quá ngắn" },
            })}
            placeholder="Họ và tên"
            className={`w-full p-3 border rounded-lg ${errors.hoTen ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.hoTen && (
            <p className="text-red-500 text-xs mt-1">{errors.hoTen.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            {...register("email", {
              required: "Email không được để trống",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message:''
              },
            })}
            placeholder="Email (@gmail.com)"
            className={`w-full p-3 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* SỐ ĐIỆN THOẠI */}
        <div>
          <input
            {...register("soDT", {
              required: "Số điện thoại không được để trống",
              pattern: {
                value: /^(0[3|5|7|8|9])([0-9]{8})$/,
                message: "Số điện thoại Việt Nam không hợp lệ (10 số)",
              },
            })}
            placeholder="Số điện thoại"
            className={`w-full p-3 border rounded-lg ${errors.soDT ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.soDT && (
            <p className="text-red-500 text-xs mt-1">{errors.soDT.message}</p>
          )}
        </div>
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

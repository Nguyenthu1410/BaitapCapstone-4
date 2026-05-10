"use client";

import React, { useState } from "react";
import { Props } from "../types/course";
import { useRouter } from "next/navigation";
import { PUBLIC_PATH } from "../constant/path";
import { courseService } from "../services/courseServices";

// IMPORT ICON TỪ THƯ VIỆN REACT-ICONS (Bộ Lucide Icons)
import { LuUser, LuUsers, LuEye, LuClock, LuShoppingCart } from "react-icons/lu";

const CourseDetail: React.FC<Props> = ({ course }) => {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);

  // HÀM XỬ LÝ ĐĂNG KÝ KHÓA HỌC
  const handleRegisterCourse = async () => {
    const isLogin = localStorage.getItem("userLogin");
    if (!isLogin) {
      alert("Bạn cần đăng nhập để đăng ký khóa học này!");
      router.push(PUBLIC_PATH.SIGN_IN);
      return;
    }

    try {
      setIsRegistering(true);
      const message = await courseService.dangKyKhoaHoc(course?.maKhoaHoc);
      
      alert(message); 
      router.push(PUBLIC_PATH.PROFILE);
      
    } catch (error: any) {
      alert(`Thất bại: ${error.message}`);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* HÌNH ẢNH */}
        <div className="md:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={course?.hinhAnh || "https://cdn.schoolblocks.com/organizations/e98f255f-6c8e-434f-bf98-276de11abf0d/terraces/25538/online-courses.png"}
              alt={course?.tenKhoaHoc || "Course Image"}
              className="w-full h-auto object-cover aspect-video"
              onError={(e) => {
                e.currentTarget.src = "https://cdn.schoolblocks.com/organizations/e98f255f-6c8e-434f-bf98-276de11abf0d/terraces/25538/online-courses.png";
              }}
            />
          </div>
        </div>

        {/* NỘI DUNG CHI TIẾT */}
        <div className="md:w-1/2 flex flex-col justify-center">
          
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-full w-max text-sm mb-4">
            {course?.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "Khóa học lập trình"}
          </span>

          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            {course?.tenKhoaHoc || "Đang tải tên khóa học..."}
          </h1>

          <div className="grid grid-cols-2 gap-4 text-slate-600 mb-6 py-4 border-y border-slate-100 text-sm">
            <div className="flex items-center gap-2">
              <LuUser size={18} className="text-indigo-500" />
              <span>
                GV: <strong className="text-slate-800">{course?.nguoiTao?.hoTen || "Đang cập nhật"}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <LuUsers size={18} className="text-blue-500" />
              <span>{course?.soLuongHocVien || 0} học viên</span>
            </div>
            <div className="flex items-center gap-2">
              <LuEye size={18} className="text-orange-500" />
              <span>{course?.luotXem || 0} lượt xem</span>
            </div>
            <div className="flex items-center gap-2">
              <LuClock size={18} className="text-green-500" />
              <span>{course?.ngayTao || "Chưa cập nhật"}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2">Mô tả khóa học</h3>
          <p className="text-slate-600 leading-relaxed mb-8">
            {course?.moTa || "Chưa có mô tả cho khóa học này."}
          </p>

          {/* NÚT ĐĂNG KÝ */}
          <button 
            onClick={handleRegisterCourse}
            disabled={isRegistering}
            className={`flex items-center justify-center gap-2 px-8 py-4 text-white font-bold rounded-xl transition-all shadow-md w-max ${
              isRegistering 
                ? "bg-slate-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            <LuShoppingCart size={20} />
            {isRegistering ? "Đang xử lý đăng ký..." : "Đăng ký ngay"}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
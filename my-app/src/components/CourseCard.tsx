"use client";

import * as React from "react";
import Link from "next/link";
import { CourseCardProps } from "../types/course";
import { LuUsers, LuEye, LuShoppingCart } from "react-icons/lu";
import { useCourseCard } from "../hook/clients/useCourseCard"; 

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { localStudents, isRegistering, handleRegister, safeMaKhoaHoc } = useCourseCard(course);

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
      {/* ẢNH KHÓA HỌC */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={course?.hinhAnh}
          alt={course?.tenKhoaHoc}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://cdn.schoolblocks.com/organizations/e98f255f-6c8e-434f-bf98-276de11abf0d/terraces/25538/online-courses.png";
          }}
        />
        {course?.danhMucKhoaHoc?.tenDanhMucKhoaHoc && (
          <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          </div>
        )}
      </div>

      {/* THÔNG TIN CHI TIẾT */}
      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-bold text-slate-800 text-base line-clamp-2 mb-3 h-12 group-hover:text-blue-600 transition-colors leading-tight">
          {course?.tenKhoaHoc}
        </h4>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
          {course?.moTa || "Khám phá những kỹ năng mới cùng chuyên gia hàng đầu..."}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <LuUsers size={16} className="text-blue-500" />
            <span>{localStudents} học viên</span>
          </div>
        </div>

        {/* NÚT TƯƠNG TÁC */}
        <div className="flex gap-2">
          <button 
            onClick={handleRegister}
            disabled={isRegistering}
            className={`flex-1 flex items-center justify-center gap-2 py-2 font-semibold text-sm rounded-lg transition-all active:scale-[0.98] ${
              isRegistering 
                ? "bg-slate-400 text-white cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
            }`}
          >
            <LuShoppingCart size={16} />
            {isRegistering ? "Đang xử lý..." : "Đăng ký học"}
          </button>

          <Link
            href={safeMaKhoaHoc ? `/courseDetail/${encodeURIComponent(safeMaKhoaHoc)}` : "#"}
            className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors active:scale-[0.98]"
            title="Xem chi tiết"
          >
            <LuEye size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
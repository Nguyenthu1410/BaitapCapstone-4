import React from "react";
import { Props } from "../types/course";
import { Users, Eye, Clock, User, ShoppingCart } from 'lucide-react';


const CourseDetail: React.FC<Props> = ({ course }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Phần hình ảnh */}
        <div className="md:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={course.hinhAnh}
              alt={course.tenKhoaHoc}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/600x400";
              }}
            />
          </div>
        </div>

        {/* Phần nội dung chi tiết */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full w-max text-sm mb-4">
            {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
          </span>

          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            {course.tenKhoaHoc}
          </h1>

          <div className="grid grid-cols-2 gap-4 text-gray-600 mb-6 py-4 border-y border-gray-100">
            <div className="flex items-center gap-2">
              <User size={18} className="text-indigo-500" />
              <span>
                GV: <strong>{course.nguoiTao?.hoTen}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-blue-500" />
              <span>{course.soLuongHocVien} học viên</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={18} className="text-orange-500" />
              <span>{course.luotXem} lượt xem</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-green-500" />
              <span>{course.ngayTao}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2">Mô tả</h3>
          <p className="text-gray-600 leading-relaxed mb-8">{course.moTa}</p>

          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md">
            <ShoppingCart size={20} />
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

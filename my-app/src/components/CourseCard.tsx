'use client';

import * as React from 'react';
import { Users, Eye, ShoppingCart } from 'lucide-react';
import { CourseCardProps } from '../types/course';

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={course.hinhAnh}
          alt={course.tenKhoaHoc}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/400x250/4f46e5/ffffff?text=Course+Image';
          }}
        />
        <div className="absolute top-3 right-3 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          HOT
        </div>
        {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc && (
          <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-bold text-slate-800 text-base line-clamp-2 mb-3 h-12 group-hover:text-blue-600 transition-colors leading-tight">
          {course.tenKhoaHoc}
        </h4>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
          {course.moTa || 'Khám phá những kỹ năng mới cùng chuyên gia hàng đầu...'}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Users size={16} className="text-blue-500" />
            <span>{course.soLuongHocVien || 0} học viên</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} className="text-orange-500" />
            <span>{course.luotXem || 0}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-all hover:shadow-md">
            <ShoppingCart size={16} />
            Đăng ký học
          </button>
          <button className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

'use client';

import { useCourses } from '../hook/useCourse';
import { Category, Course } from '../types/course';
import { Users, Eye, ShoppingCart } from 'lucide-react';

const HomePage = () => {
  const { categories, loading, error } = useCourses();

  if (loading) return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-[#f4f7f9]">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Đang tải khóa học...</span>
      </div>
    </section>
  );

  if (error) return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-[#f4f7f9]">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Không thể tải dữ liệu</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    </section>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 bg-[#f4f7f9]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* --- SIDEBAR BÊN TRÁI: DANH MỤC --- */}
        <aside className="md:col-span-3 space-y-6">
          {categories.map((cat: Category) => (
            <div key={cat.maDanhMuc} className="bg-white p-6 shadow-sm border-t-4 border-[#00a2e8] rounded-lg">
              <h3 className="text-[#00a2e8] font-bold text-sm uppercase mb-4">
                {cat.tenDanhMuc}
              </h3>
              <ul className="space-y-3">
                {cat.courses?.map((course: Course) => (
                  <li key={course.maKhoaHoc} className="group flex items-start gap-2 cursor-pointer">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 group-hover:bg-blue-500 transition-colors" />
                    <span className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                      {course.tenKhoaHoc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* --- DANH SÁCH KHÓA HỌC (9 Cột) --- */}
        <main className="md:col-span-9">
          <div className="mb-6 border-b pb-4 border-gray-200">
            <h2 className="text-2xl font-black text-slate-800 uppercase">Tất cả khóa học</h2>
            <p className="text-gray-500 text-sm mt-1">
              {categories.reduce((total, cat) => total + (cat.courses?.length || 0), 0)} khóa học
            </p>
          </div>

          {/* Grid hiển thị tất cả khóa học */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat: Category) =>
              cat.courses?.map((course: Course) => (
                <div
                  key={course.maKhoaHoc}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                >
                  {/* Hình ảnh */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={course.hinhAnh}
                      alt={course.tenKhoaHoc}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x250/4f46e5/ffffff?text=Course+Image';
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      HOT
                    </div>
                    <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
                    </div>
                  </div>

                  {/* Nội dung Card */}
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
              ))
            )}
          </div>
        </main>

      </div>
    </section>
  );
};

export default HomePage;
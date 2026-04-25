'use client';

import { useCourses } from '@/src/hook/useCourse';
import { Category, Course } from '@/src/types/course';
import { Users, Eye, ShoppingCart } from 'lucide-react';

const CourseSection = () => {
  const { categories, loading, error } = useCourses();
  const courses = categories.flatMap((cat: Category) => cat.courses || []);

  if (loading) return <div className="p-10 animate-pulse text-gray-400 text-center">Đang tải dữ liệu...</div>;
  if (error) return <div className="p-10 text-red-500 text-center font-bold">Lỗi: {error}</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 bg-[#f4f7f9]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* --- SIDEBAR BÊN TRÁI (Giữ nguyên) --- */}
        <aside className="md:col-span-3 bg-white p-6 shadow-sm border-t-4 border-[#00a2e8] h-fit sticky top-20">
          <div className="space-y-8">
            {categories.map((cat: Category) => (
              <div key={cat.maDanhMuc}>
                <h3 className="text-[#00a2e8] font-bold text-[13px] uppercase mb-4 tracking-tight">
                  {cat.tenDanhMuc}
                </h3>
                <ul className="space-y-3">
                  {cat.courses?.map((item: Course) => (
                    <li key={item.maKhoaHoc} className="group flex items-start gap-2 cursor-pointer">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 group-hover:bg-blue-500 transition-colors" />
                      <span className="text-gray-600 text-[14px] group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.tenKhoaHoc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* --- DANH SÁCH KHÓA HỌC THAY CHO BANNER (9 Cột) --- */}
        <main className="md:col-span-9">
          <div className="mb-6 flex justify-between items-end border-b pb-4 border-gray-200">
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase">Tất cả khóa học</h2>
              <p className="text-gray-500 text-sm">Tìm thấy {courses.length} khóa học phù hợp</p>
            </div>
          </div>

          {/* Grid hiển thị danh sách khóa học */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: Course) => (
              <div 
                key={course.maKhoaHoc} 
                className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                {/* Hình ảnh */}
                <div className="relative h-40 overflow-hidden bg-gray-200">
                  <img 
                    src={course.hinhAnh} 
                    alt={course.tenKhoaHoc}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                    HOT
                  </div>
                </div>

                {/* Nội dung Card */}
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-bold text-slate-800 text-sm line-clamp-2 mb-3 h-10 group-hover:text-blue-600 transition-colors">
                    {course.tenKhoaHoc}
                  </h4>

                  <div className="flex items-center justify-between text-[12px] text-gray-500 mt-auto">
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-blue-500" />
                      <span>{course.soLuongHocVien}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={14} className="text-orange-500" />
                      <span>{course.luotXem}</span>
                    </div>
                  </div>

                  <button className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-slate-50 text-blue-600 font-bold text-xs rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                    <ShoppingCart size={14} />
                    ĐĂNG KÝ HỌC
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </section>
  );
};

export default CourseSection;
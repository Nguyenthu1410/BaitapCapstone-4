import CourseCard from "@/src/components/CourseCard";
import { courseService } from "@/src/services/courseServices";
import Link from "next/link";

export default async function HomePage() {
  const allCourses = await courseService.getList();
  const featuredCourses = allCourses.slice(0, 8); // Hiện 8 khóa học
  const categories = (await courseService.getCategories()) as any[];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section - Làm cho trang chủ có sức sống hơn */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-6xl font-black text-slate-900 leading-tight mb-6">
              Học kỹ năng mới <br />
              <span className="text-blue-600 underline decoration-blue-200">Mở lối tương lai</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md">
              Hệ thống đào tạo trực tuyến chuẩn quốc tế với lộ trình học bài bản từ con số 0.
            </p>
            <div className="flex gap-4">
              <Link href="/courses" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
                Bắt đầu ngay
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 bg-blue-50 rounded-3xl h-80 flex items-center justify-center border-2 border-dashed border-blue-200">
            <span className="text-blue-400 font-bold">Banner / Illustration Here</span>
          </div>
        </div>
      </section>

      {/* Categories - Bộ lọc nhìn gọn gàng hơn */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Danh mục nổi bật</h2>
            <Link href="/courses" className="text-blue-600 font-semibold hover:underline">Xem tất cả</Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat: any) => (
            <button key={cat.maDanhMuc} className="px-6 py-2 bg-white border border-slate-200 rounded-full font-medium hover:border-blue-600 hover:text-blue-600 transition shadow-sm">
              {cat.tenDanhMuc}
            </button>
          ))}
        </div>
      </div>

      {/* Course List - Lưới khóa học 4 cột cho thoáng */}
      <section className="container mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Khóa học mới nhất</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.maKhoaHoc} course={course} />
          ))}
        </div>
      </section>
    </main>
  );
}
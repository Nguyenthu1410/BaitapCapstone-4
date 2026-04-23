import CourseCard from "@/src/components/CourseCard";
import { courseService } from "@/src/services/courseServices";
import Link from "next/link";

export default async function HomePage() {
  const allCourses = await courseService.getList();
  const featuredCourses = allCourses.slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 1. HERO SECTION */}
      <section className="relative bg-white pt-16 pb-24 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Nâng tầm kỹ năng <br />
              <span className="text-blue-600 font-black">Làm chủ tương lai</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Hệ thống đào tạo trực tuyến với hàng ngàn khóa học chất lượng từ các giảng viên hàng đầu. 
              Học mọi lúc, mọi nơi.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/courses" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-center">
                Bắt đầu học ngay
              </Link>
              <button className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition text-center">
                Xem lộ trình
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
             {/* Bạn có thể thay bằng một ảnh minh họa học tập */}
            <div className="w-full h-[400px] bg-blue-100 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-blue-300">
               <span className="text-blue-500 font-medium">Illustration Image / 3D Asset</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-black text-blue-600">10K+</p>
              <p className="text-sm text-gray-500 font-medium">Học viên</p>
            </div>
            <div>
              <p className="text-3xl font-black text-blue-600">500+</p>
              <p className="text-sm text-gray-500 font-medium">Khóa học</p>
            </div>
            <div>
              <p className="text-3xl font-black text-blue-600">100+</p>
              <p className="text-sm text-gray-500 font-medium">Giảng viên</p>
            </div>
            <div>
              <p className="text-3xl font-black text-blue-600">24/7</p>
              <p className="text-sm text-gray-500 font-medium">Hỗ trợ</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COURSES SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Khóa học nổi bật</h2>
              <p className="text-gray-500">Những khóa học được nhiều người quan tâm nhất</p>
            </div>
            <Link href="/courses" className="hidden md:block text-blue-600 font-bold hover:text-blue-700">
              Xem tất cả &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.maKhoaHoc} course={course} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/courses" className="inline-block px-8 py-3 border border-blue-600 text-blue-600 font-bold rounded-xl">
              Xem tất cả khóa học
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
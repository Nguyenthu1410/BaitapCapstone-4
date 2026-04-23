import CourseCard from "@/src/components/CourseCard";
import { courseService } from "@/src/services/courseServices";
import Link from "next/link";

export default async function HomePage() {
  // Lấy dữ liệu từ API
  const allCourses = await courseService.getList();
  const featuredCourses = allCourses.slice(0, 6);
  const categories = (await courseService.getCategories()) as any[];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 1. HERO SECTION */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
           <h1 className="text-5xl font-extrabold text-blue-600 mb-4">E-Learning App</h1>
           <p className="text-gray-600">Chào mừng Anh Thư đến với hệ thống khóa học.</p>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-lg font-bold mb-4">Danh mục</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat: any) => (
            <button key={cat.maDanhMuc} className="px-4 py-2 bg-white border rounded-full hover:border-blue-600">
              {cat.tenDanhMuc}
            </button>
          ))}
        </div>
      </div>

      {/* 3. LIST SECTION */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.maKhoaHoc} course={course} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
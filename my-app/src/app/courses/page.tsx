import Link from "next/link";
import { courseService } from "../../services/courseServices";
import CourseCard from "../../components/CourseCard";

export default async function CoursesPage() {
  let allCourses: any[] = [];
  let categories: any[] = [];

  try {
    allCourses = await courseService.getList();
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    allCourses = [];
  }

  try {
    categories = (await courseService.getCategories()) as any[];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    categories = [];
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tất cả khóa học</h1>
          <p className="text-gray-600">Khám phá các khóa học chất lượng cao</p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Danh mục</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat: any) => (
              <button key={cat.maDanhMuc} className="px-4 py-2 bg-white border rounded-full hover:border-blue-600">
                {cat.tenDanhMuc}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCourses.map((course) => (
            <CourseCard key={course.maKhoaHoc} course={course} />
          ))}
        </div>

        {allCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không có khóa học nào.</p>
          </div>
        )}
      </div>
    </main>
  );
}
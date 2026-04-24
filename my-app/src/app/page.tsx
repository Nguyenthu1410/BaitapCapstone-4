import Link from "next/link";
import { courseService } from "../services/courseServices";
import CourseCard  from "../components/CourseCard";

export default async function HomePage() {
  let allCourses: any[] = [];
  let categories: any[] = [];

  try {
    allCourses = await courseService.getList();
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    // Provide fallback data
    allCourses = [];
  }

  try {
    categories = (await courseService.getCategories()) as any[];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    categories = [];
  }

  const featuredCourses = allCourses.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
              🚀 Nền tảng học tập hàng đầu
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              Học kỹ năng mới <br />
              <span className="text-blue-600">Mở lối thành công</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Tiếp cận hơn 500+ khóa học từ lập trình, thiết kế đến kinh doanh với các chuyên gia hàng đầu.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/courses" className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1">
                Khám phá ngay
              </Link>
              <button className="px-10 py-5 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
                Dùng thử miễn phí
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-[3rem] flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden">
               <div className="text-center p-12">
                  <div className="text-8xl mb-4">💻</div>
                  <p className="text-blue-600 font-black text-2xl">CYBERSOFT ACADEMY</p>
               </div>
               <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
               <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-4 p-8 gap-8">
            <div className="text-center border-r border-slate-100 last:border-0">
              <p className="text-4xl font-black text-blue-600">25K+</p>
              <p className="text-slate-500 font-medium uppercase text-xs tracking-widest mt-2">Học viên</p>
            </div>
            <div className="text-center border-r border-slate-100 last:border-0">
              <p className="text-4xl font-black text-blue-600">800+</p>
              <p className="text-slate-500 font-medium uppercase text-xs tracking-widest mt-2">Khóa học</p>
            </div>
            <div className="text-center border-r border-slate-100 last:border-0">
              <p className="text-4xl font-black text-blue-600">150+</p>
              <p className="text-slate-500 font-medium uppercase text-xs tracking-widest mt-2">Giảng viên</p>
            </div>
            <div className="text-center last:border-0">
              <p className="text-4xl font-black text-blue-600">4.9/5</p>
              <p className="text-slate-500 font-medium uppercase text-xs tracking-widest mt-2">Đánh giá</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Bạn muốn học gì hôm nay?</h2>
            <p className="text-slate-500">Khám phá các danh mục khóa học được tuyển chọn kỹ lưỡng để phù hợp với lộ trình phát triển của bạn.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-100 transition-all hover:scale-105">
              Tất cả khóa học
            </button>
            {categories.map((cat: any) => (
              <button key={cat.maDanhMuc} className="px-8 py-3 bg-white text-slate-600 border border-slate-200 rounded-full font-bold hover:border-blue-600 hover:text-blue-600 transition-all hover:scale-105 shadow-sm">
                {cat.tenDanhMuc}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.maKhoaHoc} course={course} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/courses" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg">
              Xem tất cả khóa học
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-500">© 2026 E-Learning Academy. Thiết kế bởi Anh Thư - BaitapCapstone-4.</p>
        </div>
      </footer>
    </main>
  );
}
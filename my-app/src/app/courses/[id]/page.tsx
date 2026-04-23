import { courseService } from "@/src/services/courseServices";
import { notFound } from "next/navigation";

export default async function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const courses = await courseService.getList();
    const course = courses.find((course) => course.maKhoaHoc === params.id);
    if (!course) return notFound();

    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Hình ảnh khóa học */}
          <div className="lg:w-2/3">
            <img
              src={course.hinhAnh}
              alt={course.tenKhoaHoc}
              className="w-full rounded-3xl shadow-2xl object-cover h-[400px]"
            />
            <h1 className="text-4xl font-black text-gray-900 mt-8 mb-4">
              {course.tenKhoaHoc}
            </h1>
            <p className="text-gray-600 leading-relaxed text-lg">
              {course.moTa}
            </p>
          </div>

          {/* Cột thông tin đăng ký */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
              <p className="text-3xl font-bold text-blue-600 mb-6">
                Miễn phí / Trả phí
              </p>
              <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition mb-4">
                Đăng ký ngay
              </button>
              <div className="space-y-4 text-sm text-gray-500">
                <p>✔️ Lượt xem: {course.luotXem}</p>
                <p>✔️ Người tạo: {course.nguoiTao.hoTen}</p>
                <p>✔️ Ngày tạo: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}

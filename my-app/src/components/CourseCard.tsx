import Link from "next/link";
import { Course } from "../types/course";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={course.hinhAnh}
          alt={course.tenKhoaHoc}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x250")}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
            {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-2 group-hover:text-blue-600 transition-colors">
          {course.tenKhoaHoc}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {course.moTa || "Khám phá những kỹ năng mới cùng chuyên gia hàng đầu..."}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-blue-600">
              {course.nguoiTao.hoTen.charAt(0)}
            </div>
            <span className="text-xs text-gray-600 font-medium">{course.nguoiTao.hoTen}</span>
          </div>
          <Link 
            href={`/courses/${course.maKhoaHoc}`}
            className="text-sm font-bold text-blue-600 hover:underline"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
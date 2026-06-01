'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseCard from './CourseCard';
import { courseService } from '@/src/services/courseServices';
import { Course } from '@/src/types/course';

const SearchResult: React.FC = () => {
  const params = useSearchParams();
  const keyword = params.get('keyword') ?? '';

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    courseService
      .getList(keyword)
      .then((data) => {
        if (alive) setCourses(data);
      })
      .catch((err: Error) => {
        if (alive) setError(err.message);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [keyword]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">
            Đang tìm kiếm "{keyword}"...
          </span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Không thể tải dữ liệu
        </h3>
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 border-b pb-4 border-gray-200">
        <h2 className="text-2xl font-black text-slate-800 uppercase">
          Kết quả tìm kiếm: "{keyword}"
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {courses.length} khóa học được tìm thấy
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">
            Không tìm thấy khóa học nào phù hợp với từ khóa "{keyword}".
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Hãy thử với từ khóa khác.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.maKhoaHoc} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResult;

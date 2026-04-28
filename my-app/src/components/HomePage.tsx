'use client';

import * as React from 'react';
import { useCourses } from '../hook/useCourse';
import { Category, Course } from '../types/course';
import CourseCard from './CourseCard';
import { useSearchParams } from 'next/navigation';
import { courseService } from '../services/courseServices';

const normalizeKeyword = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');

const HomePage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword')?.trim() || '';
  const { categories, allCourses, loading, error } = useCourses();
  const [selectedCategory, setSelectedCategory] = React.useState<Category['maDanhMuc'] | null>(null);
  const [displayCourses, setDisplayCourses] = React.useState<Course[]>([]);
  const [categoryLoading, setCategoryLoading] = React.useState(false);
  const [categoryError, setCategoryError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setDisplayCourses(allCourses);
  }, [allCourses]);

  const filteredCourses = React.useMemo(() => {
    const normalizedKeyword = normalizeKeyword(keyword);

    if (!normalizedKeyword) return displayCourses;

    return displayCourses.filter((course: Course) =>
      normalizeKeyword(course.tenKhoaHoc).includes(normalizedKeyword)
    );
  }, [displayCourses, keyword]);

  const selectedCategoryInfo = React.useMemo(
    () => categories.find((cat) => cat.maDanhMuc === selectedCategory) || null,
    [categories, selectedCategory]
  );

  const filteredCategories = React.useMemo(() => {
    if (selectedCategoryInfo) {
      return [
        {
          maDanhMuc: selectedCategoryInfo.maDanhMuc,
          tenDanhMuc: selectedCategoryInfo.tenDanhMuc,
          courses: filteredCourses,
        },
      ];
    }

    const courseMap = new Map<string, Course[]>();
    filteredCourses.forEach((course) => {
      const key = course.danhMucKhoaHoc?.maDanhMucKhoaHoc || 'Khac';
      if (!courseMap.has(key)) courseMap.set(key, []);
      courseMap.get(key)?.push(course);
    });

    const mappedCategories = categories
      .map((cat) => ({
        ...cat,
        courses: courseMap.get(String(cat.maDanhMuc)) || [],
      }))
      .filter((cat) => cat.courses.length > 0);

    const otherCourses = courseMap.get('Khac') || [];
    if (otherCourses.length > 0) {
      mappedCategories.push({
        maDanhMuc: 'Khac',
        tenDanhMuc: 'Khác',
        courses: otherCourses,
      });
    }

    return mappedCategories;
  }, [categories, filteredCourses, selectedCategoryInfo]);

  const totalCourses = filteredCategories.reduce((total, cat) => total + (cat.courses?.length || 0), 0);
  const activeCategoryName = selectedCategoryInfo?.tenDanhMuc || 'Tất cả danh mục';

  React.useEffect(() => {
    if (!selectedCategory) return;

    const categoryExists = categories.some((cat) => cat.maDanhMuc === selectedCategory);
    if (!categoryExists) {
      setSelectedCategory(null);
    }
  }, [categories, selectedCategory]);

  const handleCategorySelect = React.useCallback(
    async (category: Category['maDanhMuc'] | null) => {
      setSelectedCategory(category);
      setCategoryError(null);

      if (category === null) {
        setDisplayCourses(allCourses);
        setCategoryLoading(false);
        return;
      }

      try {
        setCategoryLoading(true);
        const courses = await courseService.getCoursesByCategory(String(category));
        setDisplayCourses(courses);
      } catch (err) {
        setCategoryError(err instanceof Error ? err.message : 'Không thể tải khóa học theo danh mục.');
        setDisplayCourses([]);
      } finally {
        setCategoryLoading(false);
      }
    },
    [allCourses]
  );

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
          <div className="bg-white p-6 shadow-sm border-t-4 border-[#00a2e8] rounded-lg">
            <h3 className="text-[#00a2e8] font-bold text-sm uppercase mb-4">
              Danh mục khóa học
            </h3>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleCategorySelect(null)}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
                  selectedCategory === null
                    ? 'border-[#1a73e8] bg-blue-50 text-[#1a73e8]'
                    : 'border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                Tất cả danh mục
              </button>

              {categories.map((cat: Category) => {
                const isActive = selectedCategory === cat.maDanhMuc;
                return (
                  <button
                    key={cat.maDanhMuc}
                    type="button"
                    onClick={() => handleCategorySelect(cat.maDanhMuc)}
                    className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                      isActive
                        ? 'border-[#1a73e8] bg-blue-50 text-[#1a73e8]'
                        : 'border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600'
                    }`}
                  >
                    <div className="font-semibold uppercase text-sm">{cat.tenDanhMuc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* --- DANH SÁCH KHÓA HỌC (9 Cột) --- */}
        <main className="md:col-span-9">
          <div className="mb-6 border-b pb-4 border-gray-200">
            <h2 className="text-2xl font-black text-slate-800 uppercase">{activeCategoryName}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {keyword
                ? `Kết quả cho "${keyword}" trong ${activeCategoryName}: ${totalCourses} khóa học`
                : `${activeCategoryName}: ${totalCourses} khóa học`}
            </p>
          </div>

          {categoryLoading ? (
            <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              Đang tải khóa học theo danh mục...
            </div>
          ) : null}

          {categoryError ? (
            <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {categoryError}
            </div>
          ) : null}

          {totalCourses === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-800">Không tìm thấy khóa học phù hợp</h3>
              <p className="mt-2 text-sm text-gray-500">
                {selectedCategory
                  ? `Danh mục ${activeCategoryName} hiện không có khóa học khớp với từ khóa bạn đang tìm.`
                  : 'Thử đổi từ khóa khác để tìm đúng khóa học bạn cần.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((cat: Category) =>
                cat.courses?.map((course: Course) => (
                  <CourseCard key={course.maKhoaHoc} course={course} />
                ))
              )}
            </div>
          )}
        </main>

      </div>
    </section>
  );
};

export default HomePage;
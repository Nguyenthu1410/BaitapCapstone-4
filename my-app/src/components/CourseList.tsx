"use client";

import * as React from "react";
import CourseCard from "./CourseCard";
import { Category, Course } from "../types/course";
import { useCourseList } from "../hook/useCourseList";
import Pagination from "./Pagination";

const CourseList = () => {
  const {
    loading,
    error,
    categories,
    selectedCategory,
    handleCategorySelect,
    activeCategoryName,
    keyword,
    totalCourses,
    categoryLoading,
    categoryError,
    filteredCategories,
  } = useCourseList();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(12);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, keyword]);

  const allFilteredCourses = React.useMemo(() => {
    return filteredCategories.flatMap((cat) => cat.courses || []);
  }, [filteredCategories]);

  const totalPages = Math.ceil(allFilteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentPaginatedCourses = allFilteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  if (loading)
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 bg-[#f4f7f9]">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Đang tải khóa học...</span>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 bg-[#f4f7f9]">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Không thể tải dữ liệu
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </section>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 bg-[#f4f7f9]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* DANH MỤC */}
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
                    ? "border-[#1a73e8] bg-blue-50 text-[#1a73e8]"
                    : "border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600"
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
                        ? "border-[#1a73e8] bg-blue-50 text-[#1a73e8]"
                        : "border-gray-200 text-gray-600 hover:border-blue-200 hover:text-blue-600"
                    }`}
                  >
                    <div className="font-semibold uppercase text-sm">
                      {cat.tenDanhMuc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* DANH SÁCH KHÓA HỌC */}
        <main className="md:col-span-9">
          <div className="mb-6 border-b pb-4 border-gray-200">
            <h2 className="text-2xl font-black text-slate-800 uppercase">
              {activeCategoryName}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {keyword
                ? `Kết quả cho "${keyword}" trong ${activeCategoryName}: ${totalCourses} khóa học`
                : `${activeCategoryName}: ${totalCourses} khóa học`}
            </p>
          </div>

          {categoryError && (
            <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {categoryError}
            </div>
          )}

          {/* XỬ LÝ GIAO DIỆN CHÍNH Ở ĐÂY */}
          {categoryLoading ? (
            // HIỆU ỨNG SKELETON LÚC ĐANG TẢI (Thay cho dòng chữ xanh cũ)
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-full">
                  <div className="animate-pulse flex flex-col space-y-4">
                    {/* Khung ảnh Thumbnail */}
                    <div className="h-40 bg-slate-200 rounded-xl w-full"></div>
                    {/* Khung Text */}
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2 mt-4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : totalCourses === 0 ? (
            // KHÔNG CÓ KHÓA HỌC NÀO
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-800">
                Không tìm thấy khóa học phù hợp
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {selectedCategory
                  ? `Danh mục ${activeCategoryName} hiện không có khóa học khớp với từ khóa bạn đang tìm.`
                  : "Thử đổi từ khóa khác để tìm đúng khóa học bạn cần."}
              </p>
            </div>
          ) : (
            // RENDER KHÓA HỌC THẬT SAU KHI TẢI XONG
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPaginatedCourses.map((course: Course) => (
                <CourseCard key={course.maKhoaHoc} course={course} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* PHẦN PHÂN TRANG (Chỉ hiện khi tải xong và có khóa học) */}
      {!categoryLoading && totalCourses > 0 && (
        <div className="mt-8 space-x-3 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}
    </section>
  );
};

export default CourseList;
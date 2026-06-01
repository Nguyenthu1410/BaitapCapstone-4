// // import { useState, useEffect, useMemo, useCallback } from 'react';
// // import { useSearchParams } from 'next/navigation';
// // import { useCourses } from './useCourse';
// // import { courseService } from '../services/courseServices';
// // import { Category, Course } from '../types/course';

// // const normalizeKeyword = (value: string) =>
// //   value
// //     .toLowerCase()
// //     .normalize('NFD')
// //     .replace(/[\u0300-\u036f]/g, '')
// //     .replace(/đ/g, 'd');

// // export const useCourseList = (category?: string | null) => {
// //   const searchParams = useSearchParams();
// //   const keyword = searchParams.get('keyword')?.trim() || '';
  
// //   const urlCategory = searchParams.get('category'); 

// //   const { categories, allCourses, loading, error } = useCourses();
  
// //   const [selectedCategory, setSelectedCategory] = useState<Category['maDanhMuc'] | null>(null);
// //   const [displayCourses, setDisplayCourses] = useState<Course[]>([]);
// //   const [categoryLoading, setCategoryLoading] = useState(false);
// //   const [categoryError, setCategoryError] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (!selectedCategory) {
// //       setDisplayCourses(allCourses);
// //     }
// //   }, [allCourses, selectedCategory]);

// //   const filteredCourses = useMemo(() => {
// //     const normalizedKeyword = normalizeKeyword(keyword);
// //     if (!normalizedKeyword) return displayCourses;
// //     return displayCourses.filter((course: Course) =>
// //       normalizeKeyword(course.tenKhoaHoc).includes(normalizedKeyword)
// //     );
// //   }, [displayCourses, keyword]);

// //   const selectedCategoryInfo = useMemo(
// //     () => categories.find((cat) => cat.maDanhMuc === selectedCategory) || null,
// //     [categories, selectedCategory]
// //   );

// //   const filteredCategories = useMemo(() => {
// //     if (selectedCategoryInfo) {
// //       return [{
// //         maDanhMuc: selectedCategoryInfo.maDanhMuc,
// //         tenDanhMuc: selectedCategoryInfo.tenDanhMuc,
// //         courses: filteredCourses,
// //       }];
// //     }

// //     const courseMap = new Map<string, Course[]>();
// //     filteredCourses.forEach((course) => {
// //       const key = course.danhMucKhoaHoc?.maDanhMucKhoaHoc || 'Khac';
// //       if (!courseMap.has(key)) courseMap.set(key, []);
// //       courseMap.get(key)?.push(course);
// //     });

// //     const mappedCategories = categories
// //       .map((cat) => ({
// //         ...cat,
// //         courses: courseMap.get(String(cat.maDanhMuc)) || [],
// //       }))
// //       .filter((cat) => cat.courses.length > 0);

// //     const otherCourses = courseMap.get('Khac') || [];
// //     if (otherCourses.length > 0) {
// //       mappedCategories.push({
// //         maDanhMuc: 'Khac',
// //         tenDanhMuc: 'Khác',
// //         courses: otherCourses,
// //       });
// //     }

// //     return mappedCategories;
// //   }, [categories, filteredCourses, selectedCategoryInfo]);

// //   const totalCourses = filteredCategories.reduce((total, cat) => total + (cat.courses?.length || 0), 0);
// //   const activeCategoryName = selectedCategoryInfo?.tenDanhMuc || 'Tất cả danh mục';

// //   useEffect(() => {
// //     if (!selectedCategory) return;
// //     const categoryExists = categories.some((cat) => cat.maDanhMuc === selectedCategory);
// //     if (!categoryExists) {
// //       setSelectedCategory(null);
// //     }
// //   }, [categories, selectedCategory]);
  
// //   const handleCategorySelect = useCallback(
// //     async (categoryValue: Category['maDanhMuc'] | null) => {
// //       setSelectedCategory(categoryValue);
// //       setCategoryError(null);
      
// //       setCategoryLoading(true); 

// //       if (categoryValue === null) {
// //         setTimeout(() => {
// //           setDisplayCourses(allCourses);
// //           setCategoryLoading(false);
// //         }, 400);
// //         return;
// //       }

// //       if (categoryValue === 'Khac') {
// //         setTimeout(() => {
// //           const otherCourses = allCourses.filter((course) => {
// //             const code = course.danhMucKhoaHoc?.maDanhMucKhoaHoc;
// //             return !code || !categories.some(cat => String(cat.maDanhMuc) === String(code));
// //           });
          
// //           setDisplayCourses(otherCourses);
// //           setCategoryLoading(false);
// //         }, 400); 
// //         return;
// //       }

// //       try {
// //         const courses = await courseService.getCoursesByCategory(String(categoryValue));
// //         setDisplayCourses(courses);
// //       } catch (err) {
// //         setCategoryError(err instanceof Error ? err.message : 'Không thể tải khóa học theo danh mục.');
// //         setDisplayCourses([]);
// //       } finally {
// //         setCategoryLoading(false);
// //       }
// //     },
// //     [allCourses, categories]
// //   );

// //   useEffect(() => {
// //     const targetCategory = category || urlCategory;
// //     if (targetCategory) {
// //       handleCategorySelect(targetCategory);
// //     }
// //   }, [category, urlCategory, handleCategorySelect]);

// //   return {
// //     loading,
// //     error,
// //     categories,
// //     selectedCategory,
// //     handleCategorySelect,
// //     activeCategoryName,
// //     keyword,
// //     totalCourses,
// //     categoryLoading,
// //     categoryError,
// //     filteredCategories
// //   };
// // };

// import { useState, useEffect, useCallback, useMemo } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { courseService } from '../services/courseServices';
// import { Category, Course } from '../types/course';

// export const useCourseList = (initialPage: number = 1, initialItemsPerPage: number = 10) => {
//   const searchParams = useSearchParams();
//   const keyword = searchParams.get('keyword')?.trim() || '';
//   const urlCategory = searchParams.get('category');

//   // 1. State Danh mục
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(urlCategory || null);

//   // 2. State Khóa học & Phân trang
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(initialPage);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [totalCourses, setTotalCourses] = useState<number>(0);

//   // 3. State Loading & Error
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // FETCH DANH MỤC (Chỉ chạy 1 lần khi load web)
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await courseService.getCategories();
//         setCategories(data);
//       } catch (err) {
//         console.error("Lỗi lấy danh mục:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // FETCH KHÓA HỌC (Tự động chuyển đổi giữa Server Pagination và Client Pagination)
//   const fetchCourses = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (selectedCategory) {
//         // Trường hợp 1: Có chọn danh mục (API không hỗ trợ phân trang) -> Lấy tất cả rồi tự cắt (Client-side)
//         const data = await courseService.getCoursesByCategory(selectedCategory);
        
//         setTotalCourses(data.length);
//         setTotalPages(Math.ceil(data.length / itemsPerPage));
        
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         setCourses(data.slice(startIndex, startIndex + itemsPerPage));
//       } else {
//         // Trường hợp 2: "Tất cả danh mục" hoặc Đang Search -> Dùng API phân trang chuẩn (Server-side)
//         const response = await courseService.getCoursesPaginated(currentPage, itemsPerPage, keyword);
//         setCourses(response.items);
//         setTotalPages(response.totalPages);
//         setTotalCourses(response.count || response.items.length || 0); 
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Lỗi tải danh sách khóa học');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, itemsPerPage, selectedCategory, keyword]);

//   // Kích hoạt fetchCourses mỗi khi có sự thay đổi về trang, số lượng hoặc danh mục
//   useEffect(() => {
//     fetchCourses();
//   }, [fetchCourses]);

//   // CÁC HÀM XỬ LÝ SỰ KIỆN TỪ GIAO DIỆN
//   const handlePageChange = useCallback((newPage: number) => {
//     setCurrentPage(newPage);
//   }, []);

//   const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
//     setItemsPerPage(newItemsPerPage);
//     setCurrentPage(1); // Trở về trang 1
//   }, []);

//   const handleCategorySelect = useCallback((categoryValue: string | null) => {
//     setSelectedCategory(categoryValue);
//     setCurrentPage(1); // Trở về trang 1
//   }, []);

//   const activeCategoryName = useMemo(() => {
//     if (!selectedCategory) return 'Tất cả danh mục';
//     const cat = categories.find((c) => String(c.maDanhMuc) === String(selectedCategory));
//     return cat ? cat.tenDanhMuc : 'Tất cả danh mục';
//   }, [selectedCategory, categories]);

//   return {
//     allCourses,
//     courses,
//     categories,
//     selectedCategory,
//     activeCategoryName,
//     keyword,
//     currentPage,
//     itemsPerPage,
//     totalPages,
//     totalCourses,
//     loading,
//     error,
//     handlePageChange,
//     handleItemsPerPageChange,
//     handleCategorySelect,
//   };
// };

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { courseService } from '@/src/services/courseServices';
import { Category, Course } from '@/src/types/course';

const normalizeKeyword = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');

export const useCourseList = (category?: string | null) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword')?.trim() || '';
  const urlCategory = searchParams.get('category'); 

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<Category['maDanhMuc'] | null>(null);
  const [displayCourses, setDisplayCourses] = useState<Course[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [coursesData, categoriesData] = await Promise.all([
          courseService.getList(),
          courseService.getCategories()
        ]);
        
        setAllCourses(coursesData);
        setCategories(categoriesData);
        setDisplayCourses(coursesData); 
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const filteredCourses = useMemo(() => {
    const normalizedKeyword = normalizeKeyword(keyword);
    if (!normalizedKeyword) return displayCourses;
    return displayCourses.filter((course: Course) =>
      normalizeKeyword(course.tenKhoaHoc).includes(normalizedKeyword)
    );
  }, [displayCourses, keyword]);

  const selectedCategoryInfo = useMemo(
    () => categories.find((cat) => String(cat.maDanhMuc) === String(selectedCategory)) || null,
    [categories, selectedCategory]
  );

  // Đếm tổng số lượng khóa học trực tiếp từ mảng (Chống bug)
  const totalCourses = filteredCourses.length;
  const activeCategoryName = selectedCategoryInfo?.tenDanhMuc || 'Tất cả danh mục';

  const handleCategorySelect = useCallback(
    async (categoryValue: Category['maDanhMuc'] | null) => {
      setSelectedCategory(categoryValue);
      setCategoryError(null);
      setCategoryLoading(true); 

      if (categoryValue === null) {
        setDisplayCourses(allCourses);
        setCategoryLoading(false);
        return;
      }

      try {
        const courses = await courseService.getCoursesByCategory(String(categoryValue));
        setDisplayCourses(courses);
      } catch (err) {
        setCategoryError('Không thể tải khóa học theo danh mục.');
        setDisplayCourses([]);
      } finally {
        setCategoryLoading(false);
      }
    },
    [allCourses]
  );

  useEffect(() => {
    const targetCategory = category || urlCategory;
    if (targetCategory && categories.length > 0) {
      handleCategorySelect(targetCategory);
    }
  }, [category, urlCategory, handleCategorySelect, categories.length]);

  return {
    allCourses,
    filteredCourses, // Đã thêm biến này vào output
    loading,
    error,
    categories,
    selectedCategory,
    handleCategorySelect,
    activeCategoryName,
    keyword,
    totalCourses,
    categoryLoading,
    categoryError
  };
};
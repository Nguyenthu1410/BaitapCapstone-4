import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCourses } from './useCourse';
import { courseService } from '../services/courseServices';
import { Category, Course } from '../types/course';

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

  const { categories, allCourses, loading, error } = useCourses();
  
  const [selectedCategory, setSelectedCategory] = useState<Category['maDanhMuc'] | null>(null);
  const [displayCourses, setDisplayCourses] = useState<Course[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCategory) {
      setDisplayCourses(allCourses);
    }
  }, [allCourses, selectedCategory]);

  const filteredCourses = useMemo(() => {
    const normalizedKeyword = normalizeKeyword(keyword);
    if (!normalizedKeyword) return displayCourses;
    return displayCourses.filter((course: Course) =>
      normalizeKeyword(course.tenKhoaHoc).includes(normalizedKeyword)
    );
  }, [displayCourses, keyword]);

  const selectedCategoryInfo = useMemo(
    () => categories.find((cat) => cat.maDanhMuc === selectedCategory) || null,
    [categories, selectedCategory]
  );

  const filteredCategories = useMemo(() => {
    if (selectedCategoryInfo) {
      return [{
        maDanhMuc: selectedCategoryInfo.maDanhMuc,
        tenDanhMuc: selectedCategoryInfo.tenDanhMuc,
        courses: filteredCourses,
      }];
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

  useEffect(() => {
    if (!selectedCategory) return;
    const categoryExists = categories.some((cat) => cat.maDanhMuc === selectedCategory);
    if (!categoryExists) {
      setSelectedCategory(null);
    }
  }, [categories, selectedCategory]);

  // const handleCategorySelect = useCallback(
  // //   async (categoryValue: Category['maDanhMuc'] | null) => {
  // //     setSelectedCategory(categoryValue);
  // //     setCategoryError(null);

  // //     if (categoryValue === null) {
  // //       setDisplayCourses(allCourses);
  // //       setCategoryLoading(false);
  // //       return;
  // //     }

  // //     try {
  // //       setCategoryLoading(true);
  // //       const courses = await courseService.getCoursesByCategory(String(categoryValue));
  // //       setDisplayCourses(courses);
  // //     } catch (err) {
  // //       setCategoryError(err instanceof Error ? err.message : 'Không thể tải khóa học theo danh mục.');
  // //       setDisplayCourses([]);
  // //     } finally {
  // //       setCategoryLoading(false);
  // //     }
  // //   },
  // //   [allCourses]
  // // );
  // // const handleCategorySelect = useCallback(
  //   async (categoryValue: Category['maDanhMuc'] | null) => {
  //     setSelectedCategory(categoryValue);
  //     setCategoryError(null);

  //     // 1. Nếu chọn "Tất cả danh mục"
  //     if (categoryValue === null) {
  //       setDisplayCourses(allCourses);
  //       setCategoryLoading(false);
  //       return;
  //     }

  //     // 2. XỬ LÝ RIÊNG CHO DANH MỤC "KHÁC" (Không gọi API)
  //     if (categoryValue === 'Khac') {
  //       const otherCourses = allCourses.filter((course) => {
  //         const code = course.danhMucKhoaHoc?.maDanhMucKhoaHoc;
  //         // Lọc ra những khóa học KHÔNG có danh mục hoặc danh mục không nằm trong list API trả về
  //         return !code || !categories.some(cat => String(cat.maDanhMuc) === String(code));
  //       });
        
  //       setDisplayCourses(otherCourses);
  //       setCategoryLoading(false);
  //       return;
  //     }

  //     // 3. Gọi API bình thường cho các danh mục chuẩn (BackEnd, FrontEnd,...)
  //     try {
  //       setCategoryLoading(true);
  //       const courses = await courseService.getCoursesByCategory(String(categoryValue));
  //       setDisplayCourses(courses);
  //     } catch (err) {
  //       setCategoryError(err instanceof Error ? err.message : 'Không thể tải khóa học theo danh mục.');
  //       setDisplayCourses([]);
  //     } finally {
  //       setCategoryLoading(false);
  //     }
  //   },
  //   // Nhớ thêm biến categories vào mảng dependency này để nó cập nhật đúng nhé
  //   [allCourses, categories] 
  // );
  
  const handleCategorySelect = useCallback(
    async (categoryValue: Category['maDanhMuc'] | null) => {
      setSelectedCategory(categoryValue);
      setCategoryError(null);
      
      // Bật loading LÊN NGAY LẬP TỨC cho tất cả mọi trường hợp
      setCategoryLoading(true); 

      // 1. Nếu chọn "Tất cả danh mục"
      if (categoryValue === null) {
        // Dùng setTimeout tạo trễ 400ms cho đồng bộ UX
        setTimeout(() => {
          setDisplayCourses(allCourses);
          setCategoryLoading(false);
        }, 400);
        return;
      }

      // 2. XỬ LÝ RIÊNG CHO DANH MỤC "KHÁC" (Không gọi API)
      if (categoryValue === 'Khac') {
        setTimeout(() => {
          const otherCourses = allCourses.filter((course) => {
            const code = course.danhMucKhoaHoc?.maDanhMucKhoaHoc;
            return !code || !categories.some(cat => String(cat.maDanhMuc) === String(code));
          });
          
          setDisplayCourses(otherCourses);
          setCategoryLoading(false);
        }, 400); // Cũng trễ 400ms luôn
        return;
      }

      // 3. Gọi API bình thường cho các danh mục chuẩn
      try {
        const courses = await courseService.getCoursesByCategory(String(categoryValue));
        setDisplayCourses(courses);
      } catch (err) {
        setCategoryError(err instanceof Error ? err.message : 'Không thể tải khóa học theo danh mục.');
        setDisplayCourses([]);
      } finally {
        setCategoryLoading(false);
      }
    },
    [allCourses, categories]
  );
  
  useEffect(() => {
    const targetCategory = category || urlCategory;
    if (targetCategory) {
      handleCategorySelect(targetCategory);
    }
  }, [category, urlCategory, handleCategorySelect]);

  return {
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
    filteredCategories
  };
};

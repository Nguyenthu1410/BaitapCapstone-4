import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCourses } from '../hook/useCourse'; // Sửa lại đường dẫn nếu cần
import { courseService } from '../services/courseServices';
import { Category, Course } from '../types/course';

// Hàm helper để ở ngoài cùng
const normalizeKeyword = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');

export const useCourseHomePage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword')?.trim() || '';
  
  const { categories, allCourses, loading, error } = useCourses();
  
  const [selectedCategory, setSelectedCategory] = useState<Category['maDanhMuc'] | null>(null);
  const [displayCourses, setDisplayCourses] = useState<Course[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    setDisplayCourses(allCourses);
  }, [allCourses]);

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

  const handleCategorySelect = useCallback(
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

  // Trả về tất cả những "nguyên liệu" mà UI cần để render
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
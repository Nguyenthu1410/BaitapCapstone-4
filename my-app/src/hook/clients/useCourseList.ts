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
    filteredCourses, 
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
import { useState, useEffect } from 'react';
import { Category, Course } from '@/src/types/course';
import { courseService } from '../services/courseServices';

export const useCourses = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [dataCats, dataCourses] = await Promise.all([
          courseService.getCategories(),
          courseService.getList(),
        ]);

        setAllCourses(dataCourses);

        const courseMap = new Map<string, Course[]>();
        dataCourses.forEach((course: Course) => {
          const key = course.danhMucKhoaHoc?.maDanhMucKhoaHoc || 'Khac';
          if (!courseMap.has(key)) courseMap.set(key, []);
          courseMap.get(key)!.push(course);
        });

        const mappedData: Category[] = dataCats.map((cat: { maDanhMuc: string; tenDanhMuc: string }) => ({
          maDanhMuc: cat.maDanhMuc,
          tenDanhMuc: cat.tenDanhMuc,
          courses: courseMap.get(cat.maDanhMuc) || []
        }));

        // Add category for courses without danhMuc
        const khacCourses = courseMap.get('Khac') || [];
        if (khacCourses.length > 0) {
          mappedData.push({
            maDanhMuc: 'Khac',
            tenDanhMuc: 'Khác',
            courses: khacCourses
          });
        }

        setCategories(mappedData);
      } catch (err: any) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, allCourses, loading, error };
};
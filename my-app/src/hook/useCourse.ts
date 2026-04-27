import { useState, useEffect } from 'react';
import { Category, Course } from '@/src/types/course';
import { ENDPOINTS, MA_NHOM } from '../constant/api';

export const useCourses = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const headers = {
          "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJBSSBPZmZpY2UgMTgiLCJIZXRIYW5TdHJpbmciOiIxNC8wOS8yMDI2IiwiSGV0SGFuVGltZSI6IjE3ODkzNDQwMDAwMDAiLCJuYmYiOjE3NzM1MDc2MDAsImV4cCI6MTc4OTQ5MTYwMH0.6p1EhQEwDnyRqvY2Z1a5-gx1WCRacreY_O74vXMApl0",
          "Content-Type": "application/json",
        };

        const [resCat, resCourse] = await Promise.all([
          fetch(ENDPOINTS.LAY_DANH_MUC_KHOA_HOC, { headers }),
          fetch(`${ENDPOINTS.LAY_DANH_SACH_KHOA_HOC}?maNhom=${MA_NHOM}`, { headers })]);

        if (!resCat.ok || !resCourse.ok) {
          console.error('resCat.ok:', resCat.ok, 'resCourse.ok:', resCourse.ok);
          throw new Error('Lỗi kết nối server');
        }

        const dataCats = await resCat.json();
        const dataCourses = await resCourse.json();

        const courseMap = new Map<string, Course[]>();
        dataCourses.forEach((course: any) => {
          const key = course.danhMucKhoaHoc?.maDanhMucKhoaHoc || 'Khac';
          if (!courseMap.has(key)) courseMap.set(key, []);
          courseMap.get(key)!.push(course);
        });

        const mappedData: Category[] = dataCats.map((cat: any) => ({
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

  return { categories, loading, error };
};
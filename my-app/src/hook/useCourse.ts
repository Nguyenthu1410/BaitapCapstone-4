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
           "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjIwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTg2MjQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzkwMDEwMDAwfQ.EeWR303-_B1UvS0JNqgB9-oekCYMonI_KPT2LceiOb8",
           "Content-Type": "application/json",
         };

        const [resCat, resCourse] = await Promise.all([
          fetch(ENDPOINTS.LAY_DANH_MUC_KHOA_HOC, { headers }),
fetch(`${ENDPOINTS.LAY_DANH_SACH_KHOA_HOC}?maNhom=${MA_NHOM}`, { headers })        ]);

        if (!resCat.ok || !resCourse.ok) {
          console.error('resCat.ok:', resCat.ok, 'resCourse.ok:', resCourse.ok);
          throw new Error('Lỗi kết nối server');
        }

        const dataCats = await resCat.json();
        const dataCourses = await resCourse.json();

        const mappedData: Category[] = dataCats.map((cat: any) => ({
          maDanhMuc: cat.maDanhMuc,
          tenDanhMuc: cat.tenDanhMuc,
          courses: dataCourses.filter((c: any) => c.danhMucKhoaHoc?.maDanhMucKhoaHoc === cat.maDanhMuc && c.maKhoaHoc && c.maKhoaHoc.trim() !== '')
        }));

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
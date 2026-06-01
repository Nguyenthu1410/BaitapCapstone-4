import { useState, useEffect } from "react";
import { courseService } from "@/src/services/courseServices";
import { ENDPOINTS } from "@/src/constant/api";

export const useDashboardAdmin = () => {
  const [stats, setStats] = useState({
    tongHocVien: 0,
    khoaHocHienCo: 0,
    luotDangKyMoi: 32, 
    yeuCauChoDuyet: 1, 
    tongLuotXem: 0, 
    tongGiaoVu: 0,  
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);

        // 1. LẤY DATA KHÓA HỌC & TÍNH TỔNG LƯỢT XEM TỪ API DANH SÁCH
        const courses = await courseService.getList(); 
        
        const totalCourses = courses ? courses.length : 0;
        
        const totalViews = courses 
          ? courses.reduce((sum, course) => sum + (Number(course.luotXem) || 0), 0) 
          : 0;
        // 2. LẤY DATA NGƯỜI DÙNG & CHIA TỈ LỆ
        const userRes = await fetch(ENDPOINTS.DANH_SACH_NGUOI_DUNG);
        let totalHV = 0;
        let totalGV = 0;

        if (userRes.ok) {
          const users = await userRes.json();
          totalHV = users.filter((u: any) => u.maLoaiNguoiDung === 'HV').length;
          totalGV = users.filter((u: any) => u.maLoaiNguoiDung === 'GV').length;
        }
        // 3. CẬP NHẬT STATE
        setStats((prev) => ({
          ...prev,
          khoaHocHienCo: totalCourses,
          tongHocVien: totalHV,
          tongLuotXem: totalViews,
          tongGiaoVu: totalGV,
        }));

      } catch (error) {
        console.error("Lỗi tải dữ liệu Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return { stats, loading };
};
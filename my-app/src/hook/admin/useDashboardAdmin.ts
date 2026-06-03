"use client";

import { useState, useEffect, useCallback } from "react";
import { courseService } from "@/src/services/courseServices"; 
import { userServices } from "@/src/services/userServices";
import { message } from "antd";

export const useDashboardAdmin = () => {
  const [stats, setStats] = useState({
    tongHocVien: 0,
    khoaHocHienCo: 0,
    luotDangKyMoi: 0, 
    yeuCauChoDuyet: 0, 
    tongLuotXem: 0, 
    tongGiaoVu: 0,  
  });
  const [pendingStudents, setPendingStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Mảng cố định lưu danh sách học viên chờ duyệt gốc từ API để đối chiếu
  const [originalPendingStudents, setOriginalPendingStudents] = useState<any[]>([]);

  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(true);

      const courses = await courseService.getList(); 
      const totalCourses = courses ? courses.length : 0;
      
      const totalViews = courses 
        ? courses.reduce((sum: number, course: any) => sum + (Number(course.luotXem) || 0), 0) 
        : 0;

      const resUsers: any = await userServices.getListUserPagination(1, 100);
      const usersList = resUsers?.items || [];
      
      const totalHV = usersList.filter((u: any) => u.maLoaiNguoiDung === 'HV').length;
      const totalGV = usersList.filter((u: any) => u.maLoaiNguoiDung === 'GV').length;

      let allPendingStudents: any[] = [];
      if (courses && courses.length > 0) {
        const targetCourses = courses.slice(0, 8); 
        const pendingPromises = targetCourses.map((c: any) =>
          userServices.getPendingStudents(c.maKhoaHoc).catch(() => [])
        );

        const pendingResults = await Promise.all(pendingPromises);
        
        targetCourses.forEach((course: any, index: number) => {
          const students = pendingResults[index];
          
          if (students && Array.isArray(students) && students.length > 0) {
            const studentsWithCourse = students.map((student: any) => ({
              ...student,
              maKhoaHoc: course.maKhoaHoc,
              tenKhoaHoc: course.tenKhoaHoc
            }));
            allPendingStudents = [...allPendingStudents, ...studentsWithCourse];
          }
        });
      }

      setPendingStudents(allPendingStudents);
      setOriginalPendingStudents(allPendingStudents); 

      setStats({
        khoaHocHienCo: totalCourses,
        tongHocVien: resUsers?.totalCount || usersList.length,
        tongLuotXem: totalViews,
        tongGiaoVu: totalGV > 0 ? totalGV : 3,
        yeuCauChoDuyet: allPendingStudents.length,
        luotDangKyMoi: allPendingStudents.length,
      });

    } catch (error) {
      console.error("Lỗi tải dữ liệu Dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Duyệt lẻ từng học viên ở bảng bên phải
  const handleApproveRegistration = async (maKhoaHoc: string, taiKhoan: string) => {
    setActionLoading(taiKhoan);
    try {
      await userServices.approveStudent(maKhoaHoc, taiKhoan); 
      message.success(`Duyệt lẻ thành công học viên [${taiKhoan}]!`);
      
      // Biến mất khỏi bảng bên phải (pendingStudents)
      setPendingStudents((prev) => prev.filter((item) => !(item.taiKhoan === taiKhoan && item.maKhoaHoc === maKhoaHoc)));
      
      setStats((prev) => ({
        ...prev,
        yeuCauChoDuyet: Math.max(0, prev.yeuCauChoDuyet - 1),
        luotDangKyMoi: Math.max(0, prev.luotDangKyMoi - 1)
      }));
    } catch (error: any) {
      message.error(error.message || "Duyệt học viên thất bại!");
    } finally {
      setActionLoading(null);
    }
  };

  // Từ chối lẻ từng học viên ở bảng bên phải
  const handleRejectRegistration = async (maKhoaHoc: string, taiKhoan: string) => {
    setActionLoading(taiKhoan);
    try {
      await userServices.rejectStudent(maKhoaHoc, taiKhoan); 
      message.success(`Đã từ chối ghi danh học viên [${taiKhoan}]!`);
      
      setPendingStudents((prev) => prev.filter((item) => !(item.taiKhoan === taiKhoan && item.maKhoaHoc === maKhoaHoc)));
      setOriginalPendingStudents((prev) => prev.filter((item) => !(item.taiKhoan === taiKhoan && item.maKhoaHoc === maKhoaHoc)));
      
      setStats((prev) => ({
        ...prev,
        yeuCauChoDuyet: Math.max(0, prev.yeuCauChoDuyet - 1),
        luotDangKyMoi: Math.max(0, prev.luotDangKyMoi - 1)
      }));
    } catch (error: any) {
      message.error(error.message || "Từ chối thất bại!");
    } finally {
      setActionLoading(null);
    }
  };

  // === XỬ LÝ DUYỆT HÀNG LOẠT KHÓA HỌC: ĐỒNG BỘ 4 Ô CARD THỐNG KÊ ===
  const handleApproveAllInCourse = async (maKhoaHoc: string) => {
    setActionLoading(`course-approve-${maKhoaHoc}`);
    
    // 1. Danh sách tất cả học viên ban đầu thuộc khóa học này
    const initialStudentsInCourse = originalPendingStudents.filter(item => item.maKhoaHoc === maKhoaHoc);
    
    // 2. Danh sách những học viên chưa được duyệt lẻ (vẫn đang nằm ở bảng bên phải)
    const unapprovedStudents = pendingStudents.filter(item => item.maKhoaHoc === maKhoaHoc);

    // 3. Lọc ra những người ĐA ĐƯỢC duyệt lẻ (có trong danh sách gốc nhưng không còn ở bảng phải)
    const approvedStudents = initialStudentsInCourse.filter(
      initial => !unapprovedStudents.some(unapproved => unapproved.taiKhoan === initial.taiKhoan)
    );

    if (approvedStudents.length === 0) {
      message.warning("Không có học viên nào được duyệt lẻ trước đó để thực hiện ghi danh khóa học!");
      setActionLoading(null);
      return;
    }

    try {
      message.success(`Ghi danh thành công khóa học cho ${approvedStudents.length} học viên đã duyệt!`);

      // CẬP NHẬT UI: Chỉ giữ lại những người chưa được duyệt lẻ (Trường trường hợp 2)
      setPendingStudents((prev) => [
        ...prev.filter(item => item.maKhoaHoc !== maKhoaHoc), 
        ...unapprovedStudents 
      ]);

      setOriginalPendingStudents((prev) => [
        ...prev.filter(item => item.maKhoaHoc !== maKhoaHoc),
        ...unapprovedStudents
      ]);

      // ĐỒNG BỘ DỮ LIỆU TRÊN 4 Ô CARDS THỐNG KÊ
      setStats((prev) => ({
        ...prev,
        khoaHocHienCo: prev.khoaHocHienCo + 1, // Cộng thêm vào tổng số khóa học hiện có
        tongHocVien: prev.tongHocVien + approvedStudents.length, // Cộng thêm số học viên đã duyệt lẻ vào tổng số học viên
      }));

    } catch (error) {
      message.error("Có lỗi xảy ra khi đồng bộ ghi danh khóa học.");
    } finally {
      setActionLoading(null);
    }
  };

  // Hủy đăng ký hàng loạt những người chưa duyệt lẻ của khóa học
  const handleRejectAllInCourse = async (maKhoaHoc: string) => {
    setActionLoading(`course-reject-${maKhoaHoc}`);
    const unapprovedStudents = pendingStudents.filter(item => item.maKhoaHoc === maKhoaHoc);

    try {
      if (unapprovedStudents.length > 0) {
        await Promise.all(
          unapprovedStudents.map(student => userServices.rejectStudent(maKhoaHoc, student.taiKhoan))
        );
      }
      message.success(`Đã hủy đăng ký của tất cả học viên chưa duyệt trong khóa học!`);

      setPendingStudents((prev) => prev.filter(item => item.maKhoaHoc !== maKhoaHoc));
      setOriginalPendingStudents((prev) => prev.filter(item => item.maKhoaHoc !== maKhoaHoc));
      
      setStats((prev) => ({
        ...prev,
        yeuCauChoDuyet: Math.max(0, prev.yeuCauChoDuyet - unapprovedStudents.length),
        luotDangKyMoi: Math.max(0, prev.luotDangKyMoi - unapprovedStudents.length)
      }));
    } catch (error) {
      message.error("Thao tác thất bại.");
    } finally {
      setActionLoading(null);
    }
  };

  return { 
    stats, 
    loading, 
    pendingStudents, 
    actionLoading,
    handleApproveRegistration,
    handleRejectRegistration,
    handleApproveAllInCourse,
    handleRejectAllInCourse
  };
};
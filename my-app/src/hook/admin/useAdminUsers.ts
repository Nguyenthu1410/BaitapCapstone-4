// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { userServices } from "@/src/services/userServices";
// import { message } from "antd";

// export const useAdminUser = () => {
//   const [users, setUsers] = useState<any[]>([]);
//   const [userTypes, setUserTypes] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [searchKeyword, setSearchKeyword] = useState("");

//   // === HÀM LẤY DỮ LIỆU TỔNG HỢP NGƯỜI DÙNG ===
//   // Đã tối ưu hóa việc gọi lại liên tục từ Server để đồng bộ tài khoản vừa được Admin phê duyệt ở Dashboard
//   const fetchUserData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       // Trường hợp 1: Có từ khóa tìm kiếm -> Gọi chính xác API Search kèm theo mã nhóm
//       if (searchKeyword.trim() !== "") {
//         const res: any = await userServices.searchUsers(searchKeyword);
//         if (res) {
//           setUsers(res); 
//           setTotalCount(res.length); 
//         }
//       } 
//       // Trường hợp 2: Không tìm kiếm -> Gọi API phân trang lấy danh sách mới nhất từ Database
//       else {
//         const res: any = await userServices.getListUserPagination(page, pageSize);
//         if (res) {
//           setUsers(res.items || []); 
//           setTotalCount(res.totalCount || 0);
//         }
//       }
//     } catch (error: any) {
//       console.error("Lỗi fetch dữ liệu người dùng:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [page, pageSize, searchKeyword]);

//   const fetchUserTypes = async () => {
//     try {
//       const res: any = await userServices.getUserTypes();
//       setUserTypes(res || []);
//     } catch (error) {}
//   };

//   // Tự động kích hoạt làm mới danh sách khi Admin truy cập trang hoặc thay đổi Page phân trang/Từ khóa tìm kiếm
//   useEffect(() => {
//     fetchUserData();
//   }, [fetchUserData]);

//   useEffect(() => {
//     fetchUserTypes();
//   }, []);

//   // === CÁC HÀM XỬ LÝ KHÁC (GIỮ NGUYÊN CODE CŨ CỦA BẠN) ===
//   const handleAddUser = async (formValues: any) => {
//     try {
//       await userServices.addUser({ ...formValues, maNhom: "GP01" });
//       message.success("Thêm người dùng thành công!");
//       fetchUserData(); 
//       return true;
//     } catch (error: any) {
//       message.error(error.message || "Thêm thất bại!");
//       return false;
//     }
//   };

//   const handleDeleteUser = async (taiKhoan: string) => {
//     try {
//       await userServices.deleteUser(taiKhoan);
//       message.success("Xóa thành công!");
//       fetchUserData(); 
//     } catch (error: any) {
//       message.error(error.message || "Xóa thất bại!");
//     }
//   };

//   const handleUpdateUser = async (formValues: any) => {
//     try {
//       await userServices.updateUser({ ...formValues, maNhom: "GP01" });
//       message.success("Cập nhật thành công!");
//       fetchUserData(); 
//       return true;
//     } catch (error: any) {
//       message.error(error.message || "Cập nhật thất bại!");
//       return false;
//     }
//   };

//   return {
//     users,
//     userTypes,
//     isLoading,
//     page,
//     pageSize,
//     totalCount,
//     searchKeyword,
//     setPage,
//     setPageSize,
//     setSearchKeyword,
//     handleAddUser,
//     handleDeleteUser,
//     handleUpdateUser,
//     refreshData: fetchUserData
//   };
// };

"use client";

import { useState, useEffect, useCallback } from "react";
import { userServices } from "@/src/services/userServices";
import { message } from "antd";

export const useAdminUser = () => {
  // === STATE QUẢN LÝ DANH SÁCH NGƯỜI DÙNG TỔNG THỂ ===
  const [users, setUsers] = useState<any[]>([]);
  const [userTypes, setUserTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  // === STATE QUẢN LÝ GHI DANH THEO KHÓA HỌC (MODAL) ===
  const [unregisteredUsers, setUnregisteredUsers] = useState<any[]>([]);
  const [pendingStudents, setPendingStudents] = useState<any[]>([]);
  const [approvedStudents, setApprovedStudents] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [submittingModal, setSubmittingModal] = useState(false);

  // === HÀM LẤY DỮ LIỆU TỔNG HỢP NGƯỜI DÙNG ===
  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (searchKeyword.trim() !== "") {
        const res: any = await userServices.searchUsers(searchKeyword);
        if (res) {
          setUsers(res); 
          setTotalCount(res.length); 
        }
      } else {
        const res: any = await userServices.getListUserPagination(page, pageSize);
        if (res) {
          setUsers(res.items || []); 
          setTotalCount(res.totalCount || 0);
        }
      }
    } catch (error: any) {
      console.error("Lỗi fetch dữ liệu người dùng:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, searchKeyword]);

  const fetchUserTypes = async () => {
    try {
      const res: any = await userServices.getUserTypes();
      setUserTypes(res || []);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    fetchUserTypes();
  }, []);

  // === CÁC HÀM XỬ LÝ SỰ KIỆN CRUD NGƯỜI DÙNG ===
  const handleAddUser = async (formValues: any) => {
    try {
      await userServices.addUser({ ...formValues, maNhom: "GP01" });
      message.success("Thêm người dùng thành công!");
      fetchUserData(); 
      return true;
    } catch (error: any) {
      message.error(error.message || "Thêm thất bại!");
      return false;
    }
  };

  const handleDeleteUser = async (taiKhoan: string) => {
    try {
      await userServices.deleteUser(taiKhoan);
      message.success("Xóa thành công!");
      fetchUserData(); 
    } catch (error: any) {
      message.error(error.message || "Xóa thất bại!");
    }
  };

  const handleUpdateUser = async (formValues: any) => {
    try {
      await userServices.updateUser({ ...formValues, maNhom: "GP01" });
      message.success("Cập nhật thành công!");
      fetchUserData(); 
      return true;
    } catch (error: any) {
      message.error(error.message || "Cập nhật thất bại!");
      return false;
    }
  };

  // === HÀM QUẢN LÝ GHI DANH & XÉT DUYỆT HỌC VIÊN (DÙNG TRONG MODAL) ===
  const fetchAllStudentData = useCallback(async (maKhoaHoc: string) => {
    if (!maKhoaHoc) return;
    setLoadingModal(true);
    try {
      const [resUnenrolled, resPending, resApproved]: any = await Promise.all([
        userServices.getUnenrolledUsers(maKhoaHoc),
        userServices.getPendingStudents(maKhoaHoc),
        userServices.getApprovedStudents(maKhoaHoc)
      ]);

      setUnregisteredUsers(resUnenrolled || []);
      setPendingStudents(resPending || []);
      setApprovedStudents(resApproved || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách học viên:", error);
      message.error("Không thể tải danh sách học viên!");
    } finally {
      setLoadingModal(false);
    }
  }, []);

  // Ghi danh trực tiếp từ ô Select
  const handleEnrollUser = async (maKhoaHoc: string) => {
    const taiKhoan = selectedUser;
    if (!taiKhoan || !maKhoaHoc) {
      message.warning("Vui lòng chọn một người dùng từ danh sách!");
      return;
    }
    
    setSubmittingModal(true);
    try {
      await userServices.enrollCourse(maKhoaHoc, taiKhoan);
      message.success(`Thêm thành công học viên [${taiKhoan}] vào khóa học!`);
      setSelectedUser(null);
      await fetchAllStudentData(maKhoaHoc);
    } catch (error: any) {
      message.error(error.message || "Ghi danh thất bại!");
    } finally {
      setSubmittingModal(false);
    }
  };

  // Duyệt học viên đang chờ
  const handleApprove = async (maKhoaHoc: string, taiKhoan: string) => {
    if (!maKhoaHoc) return;
    try {
      await userServices.approveStudent(maKhoaHoc, taiKhoan);
      message.success(`Đã duyệt học viên [${taiKhoan}] thành công!`);
      await fetchAllStudentData(maKhoaHoc);
    } catch (error: any) {
      message.error(error.message || "Duyệt học viên thất bại!");
    }
  };

  // Từ chối hoặc Xóa học viên khỏi lớp
  const handleRejectOrDelete = async (maKhoaHoc: string, taiKhoan: string, msgSuccess: string) => {
    if (!maKhoaHoc) return;
    try {
      await userServices.rejectStudent(maKhoaHoc, taiKhoan);
      message.success(msgSuccess);
      await fetchAllStudentData(maKhoaHoc);
    } catch (error: any) {
      message.error(error.message || "Thao tác thất bại!");
    }
  };

  return {
    // CRUD User chính
    users,
    userTypes,
    isLoading,
    page,
    pageSize,
    totalCount,
    searchKeyword,
    setPage,
    setPageSize,
    setSearchKeyword,
    handleAddUser,
    handleDeleteUser,
    handleUpdateUser,
    refreshData: fetchUserData,

    // Ghi danh & Xét duyệt (Modal)
    unregisteredUsers,
    pendingStudents,
    approvedStudents,
    selectedUser,
    setSelectedUser,
    loadingModal,
    submittingModal,
    fetchAllStudentData,
    handleEnrollUser,
    handleApprove,
    handleRejectOrDelete
  };
};
import { ENDPOINTS } from "../constant/api";
import { fetcher, poster } from "./apiClients";

export const userServices = {
  // THÔNG TIN TÀI KHOẢN
  getAccountInfo: (taiKhoan: string) => {
  return poster(ENDPOINTS.THONG_TIN_TAI_KHOAN, taiKhoan);
},

  // LẤY DANH SÁCH NGƯỜI DÙNG PHÂN TRANG
  getListUserPagination: async (page: number = 1, pageSize: number = 10) => {
    const params: Record<string, string> = {
      MaNhom: "GP01",
      page: page.toString(),
      pageSize: pageSize.toString(),
    };
    return await fetcher(ENDPOINTS.LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG, params);
  },

  // TÌM KIẾM NGƯỜI DÙNG
  searchUsers: async (tuKhoa: string) => {
    const params: Record<string, string> = {
      MaNhom: "GP01",
      tuKhoa: tuKhoa,
    };
    return await fetcher(ENDPOINTS.TIM_KIEM_NGUOI_DUNG, params);
  },

  // LẤY DANH SÁCH KHÓA HỌC CHƯA GHI DANH 
  getUnregisteredCourses: async (taiKhoan: string) => {
    const fullUrl = `${ENDPOINTS.LAY_DANH_SACH_KHOA_HOC_CHUA_GHI_DANH}?TaiKhoan=${taiKhoan}`;
    return await poster(fullUrl, null, 'POST');
  },

  // GHI DANH KHÓA HỌC
  enrollCourse: async (maKhoaHoc: string, taiKhoan: string) => {
    return await poster(ENDPOINTS.GHI_DANH_KHOA_HOC, { maKhoaHoc, taiKhoan }, 'POST');
  },

  // LẤY DANH SÁCH NGƯỜI DÙNG CHƯA GHI DANH
  getUnenrolledUsers: async (maKhoaHoc: string) => {
    return await poster(ENDPOINTS.LAY_DANH_SACH_NGUOI_DUNG_CHUA_GHI_DANH_VAO_KHOA_HOC, { maKhoaHoc }, 'POST');
  },

  // LẤY LOẠI NGƯỜI DÙNG
  getUserTypes: async () => {
    return await fetcher(ENDPOINTS.LAY_LOAI_NGUOI_DUNG);
  },

  // THÊM NGƯỜI DÙNG
  addUser: async (userData: any) => {
    return await poster(ENDPOINTS.THEM_NGUOI_DUNG, userData, 'POST');
  },

  // CẬP NHẬT THÔNG TIN NGƯỜI DÙNG
  updateUser: async (userData: any) => {
    return await poster(ENDPOINTS.CAP_NHAT_THONG_TIN_NGUOI_DUNG, userData, 'PUT');
  },

  // XÓA NGƯỜI DÙNG
  deleteUser: async (taiKhoan: string) => {
    const fullUrl = `${ENDPOINTS.XOA_NGUOI_DUNG}?TaiKhoan=${taiKhoan}`;
    return await poster(fullUrl, null, 'DELETE');
  },

  // DANH SÁCH HỌC VIÊN CHỜ XÉT DUYỆT
  getPendingStudents: async (maKhoaHoc: string) => {
    return await poster(
      ENDPOINTS.LAY_DANH_SACH_HOC_VIEN_CHO_XET_DUYET,
      { maKhoaHoc },
      'POST'
    );
  },

  // DANH SÁCH HỌC VIÊN ĐÃ DUYỆT VÀO KHÓA HỌC
  getApprovedStudents: async (maKhoaHoc: string) => {
    return await poster(
      ENDPOINTS.LAY_DANH_SACH_HOC_VIEN_KHOA_HOC,
      { maKhoaHoc },
      'POST'
    );
  },

  // XÉT DUYỆT GHI DANH
  approveStudent: async (maKhoaHoc: string, taiKhoan: string) => {
    return await poster(
      ENDPOINTS.GHI_DANH_KHOA_HOC, 
      { maKhoaHoc, taiKhoan }, 
      'POST'
    );
  },

  // TỪ CHỐI DUYỆT 
  rejectStudent: async (maKhoaHoc: string, taiKhoan: string) => {
    return await poster(
      ENDPOINTS.HUY_GHI_DANH, 
      { maKhoaHoc, taiKhoan }, 
      'POST'
    );
  },
};
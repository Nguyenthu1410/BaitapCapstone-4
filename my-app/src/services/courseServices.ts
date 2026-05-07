import { ENDPOINTS, MA_NHOM } from "../constant/api";
import { Course, PaginatedResponse } from "../types/course";
import { fetcher } from "./apiClients";

export const courseService = {
  getList: (tenKhoaHoc: string = "") =>
    fetcher<Course[]>(ENDPOINTS.TIM_KIEM_KHOA_HỌC, {
      maNhom: MA_NHOM,
      ...(tenKhoaHoc.trim() ? { tenKhoaHoc: tenKhoaHoc.trim() } : {}),
    }),

  getCoursesByCategory: (maDanhMuc: string) =>
    fetcher<Course[]>(ENDPOINTS.LAY_KHOA_HOC_THEO_DANH_MUC, {
      maDanhMuc,
      MaNhom: MA_NHOM,
    }),

  getDetail: (maKhoaHoc: string) => {
    return fetcher<Course>(ENDPOINTS.LAY_THONG_TIN_KHOA_HOC, { 
      maKhoaHoc: maKhoaHoc.trim() 
    });
  },
  

  getCategories: () => {
    const url = `${ENDPOINTS.LAY_DANH_MUC_KHOA_HOC}`;
    return fetcher<any[]>(url);
  },

  getCoursesPaginated: (page: number, pageSize: number, tenKhoaHoc: string = "") => {
    return fetcher<PaginatedResponse<Course>>(ENDPOINTS.LAY_DANH_SACH_KHOA_HOC_PHAN_TRANG, {
      page: page.toString(),         
      pageSize: pageSize.toString(), 
      MaNhom: MA_NHOM,               
      ...(tenKhoaHoc.trim() ? { tenKhoaHoc: tenKhoaHoc.trim() } : {}),
    });
  },
}
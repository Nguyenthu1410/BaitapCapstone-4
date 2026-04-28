import { ENDPOINTS, MA_NHOM } from "../constant/api";
import { Course } from "../types/course";
import { fetcher } from "./apiClients";

export const courseService = {
  getList: (tenKhoaHoc: string = "") =>
    fetcher<Course[]>(ENDPOINTS.LAY_DANH_SACH_KHOA_HOC, {
      maNhom: MA_NHOM,
      ...(tenKhoaHoc.trim() ? { tenKhoaHoc: tenKhoaHoc.trim() } : {}),
    }),

  getCoursesByCategory: (maDanhMuc: string) =>
    fetcher<Course[]>(ENDPOINTS.LAY_KHOA_HOC_THEO_DANH_MUC, {
      maDanhMuc,
      MaNhom: MA_NHOM,
    }),

  getDetail: (maKhoaHoc: string) => {
    const url = `${ENDPOINTS.LAY_THONG_TIN_KHOA_HOC}?maKhoaHoc=${maKhoaHoc}`;
    return fetcher<Course>(url);
  },

  getCategories: () => {
    const url = `${ENDPOINTS.LAY_DANH_MUC_KHOA_HOC}`;
    return fetcher<any[]>(url);
  },
};
import { ENDPOINTS, MA_NHOM } from "../constant/api";
import { Course } from "../types/course";
import { fetcher } from "./apiClients";

export const courseService = {
  getList: (tenKhoaHoc: string = "") => {
    const url = tenKhoaHoc
      ? `${ENDPOINTS.LAY_DANH_SACH_KHOA_HOC}&tenKhoaHoc=${encodeURIComponent(tenKhoaHoc)}`
      : ENDPOINTS.LAY_DANH_SACH_KHOA_HOC;
    return fetcher<Course[]>(url);
  },

  getDetail: (maKhoaHoc: string) => {
    const url = `${ENDPOINTS.LAY_THONG_TIN_KHOA_HOC}?maKhoaHoc=${maKhoaHoc}`;
    return fetcher<Course>(url);
  },

  getCategories: () => {
    const url = `${ENDPOINTS.LAY_DANH_MUC_KHOA_HOC}`
    return fetcher<any[]>(url);
  }
};
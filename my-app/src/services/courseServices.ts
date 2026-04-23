import { ENDPOINTS, MA_NHOM } from "../constant/api";
import { Course } from "../types/course";
import { fetcher } from "./apiClients";


export const courseService = {
  getList: (tenKhoaHoc: string = "") => {
    return fetcher<Course[]>(ENDPOINTS.LAY_DANH_SACH_KHOA_HOC, {
      MaNhom: MA_NHOM,
      ...(tenKhoaHoc && { tenKhoaHoc }) // Chỉ thêm tenKhoaHoc nếu nó có giá trị
    });
  },

  getCategories: () => {
    return fetcher(ENDPOINTS.LAY_DANH_MUC_KHOA_HOC);
  }
};
import { ENDPOINTS, MA_NHOM } from "../constant/api";
import { fetcher, poster } from "./apiClients";

export const userServices = {
  //   LẤY DANH SÁCH
  getUsers: (tuKhoa = "") => {
    const params: Record<string, string> = { MaNhom: MA_NHOM };
    if (tuKhoa) params.tuKhoa = tuKhoa;

    return fetcher(
      `https://elearningnew.cybersoft.edu.vn${ENDPOINTS.DANH_SACH_NGUOI_DUNG}`,
      params,
    );
  },

  //   LẤY LOẠI NGƯỜI DÙNG
  getUserTypes: () => {
    return fetcher(
      `https://elearningnew.cybersoft.edu.vn${ENDPOINTS.LAY_LOAI_NGUOI_DUNG}`,
    );
  },

  // THÊM NGƯỜI DÙNG
  addUser: (payload: any) => {
    const dataToSend = { ...payload, maNhom: MA_NHOM };
    return poster(
      `https://elearningnew.cybersoft.edu.vn${ENDPOINTS.THEM_NGUOI_DUNG}`,
      dataToSend,
      "POST",
    );
  },
};

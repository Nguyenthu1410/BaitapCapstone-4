import { ENDPOINTS, MA_NHOM } from "@/src/constant/api";
import { fetcher, poster } from "./apiClients";

export const userServices = {
  //   LẤY DANH SÁCH
  getListUser: async () => {
    const url = `${ENDPOINTS.DANH_SACH_NGUOI_DUNG}`
    
    const res = await fetch(url, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Lỗi không thể tải danh sách người dùng!");
    }
    
    return res.json();
  },

  //   LẤY LOẠI NGƯỜI DÙNG
  getUserTypes: () => {
    return fetcher(
      ENDPOINTS.LAY_LOAI_NGUOI_DUNG,
    );
  },

  // THÊM NGƯỜI DÙNG
  addUser: (payload: any) => {
    const dataToSend = { ...payload, maNhom: MA_NHOM };
    return poster(
      ENDPOINTS.THEM_NGUOI_DUNG,
      dataToSend,
      "POST",
    );
  },
};

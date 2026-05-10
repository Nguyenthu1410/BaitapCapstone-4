import { ENDPOINTS, MA_NHOM } from "../constant/api";
import { Course, PaginatedResponse } from "../types/course";
import { fetcher } from "./apiClients";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjIwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTg2MjQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzkwMDEwMDAwfQ.EeWR303-_B1UvS0JNqgB9-oekCYMonI_KPT2LceiOb8";

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
      maKhoaHoc: maKhoaHoc.trim(),
    });
  },

  getCategories: () => {
    const url = `${ENDPOINTS.LAY_DANH_MUC_KHOA_HOC}`;
    return fetcher<any[]>(url);
  },

  getCoursesPaginated: (
    page: number,
    pageSize: number,
    tenKhoaHoc: string = "",
  ) => {
    return fetcher<PaginatedResponse<Course>>(
      ENDPOINTS.LAY_DANH_SACH_KHOA_HOC_PHAN_TRANG,
      {
        page: page.toString(),
        pageSize: pageSize.toString(),
        MaNhom: MA_NHOM,
        ...(tenKhoaHoc.trim() ? { tenKhoaHoc: tenKhoaHoc.trim() } : {}),
      },
    );
  },

  dangKyKhoaHoc: async (maKhoaHoc: string) => {
    const userString = localStorage.getItem("userLogin");

    if (!userString) {
      throw new Error("Vui lòng đăng nhập để đăng ký khóa học!");
    }

    const user = JSON.parse(userString);

    const res = await fetch(ENDPOINTS.DANG_KY_KHOA_HOC, {
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taiKhoan: user.taiKhoan,
        maKhoaHoc: maKhoaHoc,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Đăng ký khóa học thất bại!");
    }

    return res.text();
  },

  // Thêm hàm huyGhiDanh vào object courseService
  huyGhiDanh: async (maKhoaHoc: string) => {
    const user = JSON.parse(localStorage.getItem("userLogin") || "{}");
    const res = await fetch(ENDPOINTS.HUY_GHI_DANH, {
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        maKhoaHoc: maKhoaHoc,
        taiKhoan: user.taiKhoan,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Hủy đăng ký thất bại!");
    }
    return res.text();
  },
};

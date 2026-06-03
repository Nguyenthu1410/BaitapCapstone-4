import { ENDPOINTS, MA_NHOM } from "../constant/api";
import { Course, CoursePayload, PaginatedResponse } from "../types/course";
import { fetcher } from "./apiClients";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjIwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTg2MjQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzkwMDEwMDAwfQ.EeWR303-_B1UvS0JNqgB9-oekCYMonI_KPT2LceiOb8";

export const courseService = {
  // LẤY DANH SÁCH KHÓA HỌC
  getList: (tenKhoaHoc: string = "") =>
    fetcher<Course[]>(ENDPOINTS.LAY_DANH_SACH_KHOA_HOC, {
      MaNhom: MA_NHOM,
      ...(tenKhoaHoc.trim() ? { tenKhoaHoc: tenKhoaHoc.trim() } : {}),
    }),
  
  // LẤY DANH SÁCH KHÓA HỌC THEO DANH MỤC
  getCoursesByCategory: (maDanhMuc: string) =>
    fetcher<Course[]>(ENDPOINTS.LAY_KHOA_HOC_THEO_DANH_MUC, {
      maDanhMuc,
      MaNhom: MA_NHOM,
    }),

  // LẤY THÔNG TIN KHÓA HỌC 
  getDetail: (maKhoaHoc: string) => {
    return fetcher<Course>(ENDPOINTS.LAY_THONG_TIN_KHOA_HOC, {
      maKhoaHoc: maKhoaHoc.trim(),
    });
  },

  // LẤY DANH MỤC KHÓA HỌC 
  getCategories: () => {
    const url = `${ENDPOINTS.LAY_DANH_MUC_KHOA_HOC}`;
    return fetcher<any[]>(url);
  },

  // LẤY DANH SÁCH KHÓA HỌC PHÂN TRANG
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

  // ĐĂNG KÝ KHÓA HỌC 
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

  // HỦY GHI DANH
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

  // THÊM KHÓA HỌC 
  themKhoaHoc: async (payload: CoursePayload) => {
    const userString = localStorage.getItem("userLogin");
    if (!userString) {
      throw new Error("Vui lòng đăng nhập bằng tài khoản Giáo Vụ!");
    }
    const user = JSON.parse(userString);

    const dataToSend = {
      ...payload,
      maNhom: "GP01",
      taiKhoanNguoiTao: user.taiKhoan,
      luotXem: payload.luotXem || 0,
      danhGia: payload.danhGia || 0,
      ngayTao: payload.ngayTao || new Date().toLocaleDateString("en-GB"),
    };

    const res = await fetch(ENDPOINTS.THEM_KHOA_HOC, {
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Thêm khóa học thất bại!");
    }

    return res.text();
  },

  // CẬP NHẬT KHÓA HỌC
  capNhatKhoaHoc: async (payload: CoursePayload) => {
    const userString = localStorage.getItem("userLogin");
    if (!userString) {
      throw new Error("Vui lòng đăng nhập bằng tài khoản Giáo Vụ!");
    }
    const user = JSON.parse(userString);

    const dataToSend = {
      ...payload,
      maNhom: "GP01",
      taiKhoanNguoiTao: user.taiKhoan,
      luotXem: payload.luotXem || 0,
      danhGia: payload.danhGia || 0,
      ngayTao: payload.ngayTao || new Date().toLocaleDateString("en-GB"),
    };

    const res = await fetch(ENDPOINTS.CAP_NHAT_KHOA_HOC, {
      method: "PUT",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Cập nhật khóa học thất bại!");
    }

    return res.text();
  },

  // CẬP NHẬT KHÓA HỌC DEMO
  capNhatKhoaHocDemo: async (payload: CoursePayload) => {
    const userString = localStorage.getItem("userLogin");
    if (!userString) throw new Error("Vui lòng đăng nhập!");
    const user = JSON.parse(userString);

    const dataToSend = {
      ...payload,
      maNhom: "GP01",
      taiKhoanNguoiTao: user.taiKhoan,
      luotXem: payload.luotXem || 0,
      danhGia: payload.danhGia || 0,
      ngayTao: payload.ngayTao || new Date().toLocaleDateString("en-GB"),
    };

    const res = await fetch(
      ENDPOINTS.CAP_NHAT_KHOA_HOC_DEMO,
      {
        method: "PUT",
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      },
    );

    if (!res.ok)
      throw new Error(
        (await res.text()) || "Cập nhật khóa học (demo) thất bại!",
      );
    return res.text();
  },

  // XỬ LÝ KHÓA HỌC VỚI HÌNH ẢNH 
  xuLyKhoaHocVoiAnh: async (
    payload: Partial<CoursePayload>,
    mode: "THEM" | "CAP_NHAT" | "CHI_DOI_ANH",
  ) => {
    const userString = localStorage.getItem("userLogin");
    if (!userString) throw new Error("Vui lòng đăng nhập!");
    const user = JSON.parse(userString);

    const formData = new FormData();
    let url = "";

    if (mode === "CHI_DOI_ANH") {
      formData.append("maKhoaHoc", payload.maKhoaHoc!);
      formData.append("hinhAnh", payload.hinhAnh as Blob);
      url = ENDPOINTS.UPLOAD_HINH_ANH_KHOA_HOC;
    } else {
      formData.append("maKhoaHoc", payload.maKhoaHoc!);
      formData.append("biDanh", payload.biDanh!);
      formData.append("tenKhoaHoc", payload.tenKhoaHoc!);
      formData.append("moTa", payload.moTa!);
      formData.append("maDanhMucKhoaHoc", payload.maDanhMucKhoaHoc!);
      formData.append("taiKhoanNguoiTao", user.taiKhoan);
      formData.append("maNhom", "GP01");
      formData.append("luotXem", payload.luotXem?.toString() || "0");
      formData.append("danhGia", payload.danhGia?.toString() || "0");
      formData.append(
        "ngayTao",
        payload.ngayTao || new Date().toLocaleDateString("en-GB"),
      );

      if (payload.hinhAnh) {
        formData.append("hinhAnh", payload.hinhAnh as Blob);
      }

      url =
        mode === "THEM"
          ? ENDPOINTS.THEM_KHOA_HOC_UPLOAD_HINH
          : ENDPOINTS.CAP_NHAT_KHOA_HOC_UPLOAD;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: formData,
    });

    if (!res.ok)
      throw new Error(
        (await res.text()) || "Thao tác dữ liệu hình ảnh thất bại!",
      );
    return res.text();
  },

  // XÓA KHÓA HỌC 
  xoaKhoaHoc: async (maKhoaHoc: string) => {
    const userString = localStorage.getItem("userLogin");
    if (!userString) throw new Error("Vui lòng đăng nhập!");
    const user = JSON.parse(userString);

    const url = `${ENDPOINTS.XOA_KHOA_HOC}?maKhoaHoc=${maKhoaHoc}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      if (errorText.startsWith("<")) {
        throw new Error(`Sai địa chỉ API! Link hiện tại đang là: ${url}`);
      }
      throw new Error(errorText || "Xóa khóa học thất bại!");
    }

    return res.text();
  },

};

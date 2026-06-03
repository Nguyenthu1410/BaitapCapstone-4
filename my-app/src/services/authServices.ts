import { ENDPOINTS, MA_NHOM } from "@/src/constant/api";
import { RegisterForm, SigninForm } from "@/src/types/course"; 

const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjIwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTg2MjQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzkwMDEwMDAwfQ.EeWR303-_B1UvS0JNqgB9-oekCYMonI_KPT2LceiOb8";

export const authServices = {
  // 1. Hàm đăng ký
  register: async (data: RegisterForm) => {
    const res = await fetch(ENDPOINTS.DANG_KY, {
      method: "POST", 
      headers: {
        "TokenCybersoft": TOKEN_CYBERSOFT, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        maNhom: MA_NHOM,
        // SỬA DÒNG DƯỚI ĐÂY: Ưu tiên lấy data từ form, nếu không có mới mặc định là HV
        maLoaiNguoiDung: data.maLoaiNguoiDung || "HV", 
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw { response: { data: errorData, status: res.status } };
    }
    return res.json();  },

  // 2. Hàm đăng nhập
  login: async (data: SigninForm) => {
    const res = await fetch(ENDPOINTS.DANG_NHAP, {
      method: "POST", 
      headers: {
        "TokenCybersoft": TOKEN_CYBERSOFT, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taiKhoan: data.taiKhoan,
        matKhau: data.matKhau
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw { response: { data: errorData, status: res.status } };
    }
    return res.json(); 
  },

  // 3. Hàm lấy thông tin chi tiết tài khoản
  getAccountInfo: async () => {
    const user = JSON.parse(localStorage.getItem("userLogin") || "{}");
    
    const res = await fetch(ENDPOINTS.THONG_TIN_TAI_KHOAN, {
      method: "POST", 
      headers: {
        "TokenCybersoft": TOKEN_CYBERSOFT,
        "Authorization": `Bearer ${user.accessToken}`, 
        "Content-Type": "application/json",
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw { response: { data: errorData, status: res.status } };
    }
    return res.json();
  },

  // 4. Hàm cập nhật thông tin người dùng
  updateUser: async (data: any) => {
    const user = JSON.parse(localStorage.getItem("userLogin") || "{}");
    
    const res = await fetch(ENDPOINTS.CAP_NHAT_NGUOI_DUNG, {
      method: "PUT", 
      headers: {
        "TokenCybersoft": TOKEN_CYBERSOFT,
        "Authorization": `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        maNhom: MA_NHOM
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw { response: { data: errorData, status: res.status } };
    }
    return res.json();
  }
};
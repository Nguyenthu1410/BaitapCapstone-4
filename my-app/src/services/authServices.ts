import { ENDPOINTS, MA_NHOM } from "../constant/api";
import { RegisterForm } from "../types/course";

export const authServices = {
  register: async (data: RegisterForm) => {
    const res = await fetch(ENDPOINTS.DANG_KY, {
      method: "POST", 
      headers: {
        "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4OCIsIkhldEhhblN0cmluZyI6IjIwLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTg2MjQwMDAwMCIsIm5iZiI6MTc2MDAyOTIwMCwiZXhwIjoxNzkwMDEwMDAwfQ.EeWR303-_B1UvS0JNqgB9-oekCYMonI_KPT2LceiOb8", 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        maNhom: MA_NHOM,
        maLoaiNguoiDung: "HV", 
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw {
        response: {
          data: errorData,
          status: res.status
        }
      };
    }

    return res.json();
  },
};
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authServices } from "@/src/services/authServices";
import { RegisterForm } from "@/src/types/course";

export const useRegister = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); 
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
    defaultValues: {
      maNhom: "GP01",
      maLoaiNguoiDung: "HV",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const payload = {
        ...data,
        maNhom: "GP01"
      };

      const result = await authServices.register(payload);
      console.log("Đăng ký thành công:", result);
      alert("Đăng ký thành công!");
      router.push("/signIn"); 
    } catch (error: any) {
      if (error.response) {
        const errorData = error.response.data;
        const status = error.response.status;
        console.error(`Lỗi ${status}:`, errorData);
        alert(
          `Đăng ký thất bại: ${errorData || "Vui lòng kiểm tra lại thông tin"}`
        );
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onSubmit,
  };
};
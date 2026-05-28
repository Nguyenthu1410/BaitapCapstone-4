import { useState, useEffect } from "react";
import { authServices } from "@/src/services/authServices";
import { courseService } from "@/src/services/courseServices"; // Bổ sung dòng import này

export const useProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  // 1. Lấy dữ liệu khi vào trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authServices.getAccountInfo();
        setUser(data);
        setFormData(data); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // 2. Xử lý khi bấm nút "Lưu thay đổi"
  const handleUpdate = async () => {
    try {
      const result = await authServices.updateUser({
        ...formData,
        maNhom: "GP01", // Nhóm mặc định
        maLoaiNguoiDung: user.maLoaiNguoiDung
      });
      
      setUser(result);
      setIsEdit(false);
      
      // Đồng bộ dữ liệu mới vào localStorage để Header cập nhật theo
      const currentUserLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
      localStorage.setItem("userLogin", JSON.stringify({ ...currentUserLogin, hoTen: result.hoTen, soDT: result.soDT }));
      window.dispatchEvent(new Event('storage')); 

      alert("Cập nhật thông tin thành công!");
    } catch (err) {
      alert("Lỗi khi cập nhật thông tin!");
    }
  };

  // 3. Xử lý khi bấm nút "Hủy" chỉnh sửa
  const handleCancel = () => {
    setIsEdit(false);
    setFormData(user); 
  };

  // 4. Xử lý khi bấm nút "Hủy đăng ký khóa học"
  const handleDeleteCourse = async (maKhoaHoc: string) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đăng ký khóa học này không?")) {
      try {
        // Gọi API hủy ghi danh
        await courseService.huyGhiDanh(maKhoaHoc);
        alert("Đã hủy đăng ký thành công!");
        
        // Tải lại dữ liệu Profile từ server để cập nhật lại danh sách khóa học (làm mất khóa học vừa hủy)
        const newData = await authServices.getAccountInfo();
        setUser(newData);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return {
    user,
    isEdit,
    setIsEdit,
    formData,
    setFormData,
    handleUpdate,
    handleCancel,
    handleDeleteCourse
  };
};
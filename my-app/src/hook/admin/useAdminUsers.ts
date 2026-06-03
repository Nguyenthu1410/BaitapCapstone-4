import { useState, useEffect, useCallback } from "react";
import { userServices } from "@/src/services/userServices";
import { message } from "antd";

export const useAdminUser = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [userTypes, setUserTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  // === HÀM LẤY DỮ LIỆU TỔNG HỢP ===
  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      // NẾU CÓ TỪ KHÓA TÌM KIẾM -> GỌI API TÌM KIẾM
      if (searchKeyword.trim() !== "") {
        const res: any = await userServices.searchUsers(searchKeyword);
        if (res) {
          setUsers(res); // API Tìm kiếm trả về thẳng 1 mảng
          setTotalCount(res.length); // Tổng số người = độ dài mảng tìm được
        }
      } 
      // NẾU KHÔNG CÓ TỪ KHÓA -> GỌI API PHÂN TRANG
      else {
        const res: any = await userServices.getListUserPagination(page, pageSize);
        if (res) {
          setUsers(res.items || []); // API Phân trang trả về object có items
          setTotalCount(res.totalCount || 0);
        }
      }
    } catch (error: any) {
      console.error("Lỗi fetch dữ liệu:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, searchKeyword]);

  const fetchUserTypes = async () => {
    try {
      const res: any = await userServices.getUserTypes();
      setUserTypes(res || []);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    fetchUserTypes();
  }, []);

  const handleAddUser = async (formValues: any) => {
    try {
      await userServices.addUser({ ...formValues, maNhom: "GP01" });
      message.success("Thêm người dùng thành công!");
      fetchUserData(); 
      return true;
    } catch (error: any) {
      message.error(error.message || "Thêm thất bại!");
      return false;
    }
  };

  const handleDeleteUser = async (taiKhoan: string) => {
    try {
      await userServices.deleteUser(taiKhoan);
      message.success("Xóa thành công!");
      fetchUserData(); 
    } catch (error: any) {
      message.error(error.message || "Xóa thất bại!");
    }
  };

  const handleUpdateUser = async (formValues: any) => {
    try {
      await userServices.updateUser({ ...formValues, maNhom: "GP01" });
      message.success("Cập nhật thành công!");
      fetchUserData(); 
      return true;
    } catch (error: any) {
      message.error(error.message || "Cập nhật thất bại!");
      return false;
    }
  };

  return {
    users,
    userTypes,
    isLoading,
    page,
    pageSize,
    totalCount,
    searchKeyword,
    setPage,
    setPageSize,
    setSearchKeyword,
    handleAddUser,
    handleDeleteUser,
    handleUpdateUser,
    refreshData: fetchUserData
  };
};
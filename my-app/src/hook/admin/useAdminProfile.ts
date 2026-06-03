import { useState, useEffect } from "react";
import { userServices } from "@/src/services/userServices";

export const useAdminProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await userServices.getAccountInfo();
        setProfile(res);
      } catch (error) {
        console.error("Lỗi lấy thông tin tài khoản admin:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
  };
};
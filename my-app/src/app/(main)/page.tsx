'use client'

import HomePage from "@/src/components/HomePage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const localUser = localStorage.getItem("userLogin");
    
    if (localUser && localUser !== "null" && localUser !== "undefined") {
      try {
        const userInfo = JSON.parse(localUser);
        
        if (userInfo?.maLoaiNguoiDung === "GV") {
          router.replace("/admin"); 
        }
      } catch (error) {
        console.error("Lỗi tự động điều hướng Admin:", error);
      }
    }
  }, [router]);
  return (
    <main className="min-h-screen bg-[#f4f7f9]">

      <div>
        <HomePage />
      </div>
    </main>
  );
}
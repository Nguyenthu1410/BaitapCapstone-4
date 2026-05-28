import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { courseService } from "../../services/courseServices";
import { PUBLIC_PATH } from "../../constant/path";
import { Course } from "../../types/course"; // Nhớ import đúng đường dẫn type

export const useCourseCard = (course: Course | undefined) => {
    const router = useRouter();
    const safeMaKhoaHoc = course?.maKhoaHoc?.trim();
    
    // State
    const [localStudents, setLocalStudents] = useState(0);
    const [isRegistering, setIsRegistering] = useState(false);

    // Đồng bộ số lượng học viên từ Props vào state
    useEffect(() => {
        if (course?.soLuongHocVien !== undefined) {
            setLocalStudents(course.soLuongHocVien);
        }
    }, [course]);

    // Logic đăng ký
    const handleRegister = async (e: React.MouseEvent) => {
        e.preventDefault(); 

        if (!safeMaKhoaHoc) {
            alert("Khóa học này đang bị lỗi dữ liệu (không có mã khóa học)!");
            return;
        }

        const isLogin = localStorage.getItem("userLogin");
        if (!isLogin) {
            alert("Bạn cần đăng nhập để đăng ký khóa học này!");
            router.push(PUBLIC_PATH.SIGN_IN);
            return;
        }

        try {
            setIsRegistering(true);
            const message = await courseService.dangKyKhoaHoc(safeMaKhoaHoc);
            alert(message); 
            
            // Tăng số lượng hiển thị trên card lên 1
            setLocalStudents(prev => prev + 1);

        } catch (error: any) {
            alert(`Thất bại: ${error.message}`);
        } finally {
            setIsRegistering(false);
        }
    };

    return { localStudents, isRegistering, handleRegister, safeMaKhoaHoc };
};
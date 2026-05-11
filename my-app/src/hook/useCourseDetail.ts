// import { useEffect, useState } from "react"
// import { Course } from "../types/course"
// import { courseService } from "../services/courseServices";


// export const useCourseDetail = (maKhoaHoc: string) => {
//     const [course, setCourse] = useState<Course | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
    
//     useEffect(() => {
//         const fetchDetail = async () => {
//             if (!maKhoaHoc) return;

//             try {
//                 setLoading(true);
//                 const data = await courseService.getDetail(maKhoaHoc);
//                 setCourse(data);
//             } catch (error) {
//                 setError('Không thể tải thông tin khóa học.');
//                 console.error(error);                
//             } finally {
//                 setLoading(false);
//             };
            
//         };
//     fetchDetail();  
//     }, [maKhoaHoc])

//     return {course, loading, error};
// }

import { useEffect, useState } from "react"
import { Course } from "../types/course"
import { courseService } from "../services/courseServices";
import { useRouter } from "next/navigation";
import { PUBLIC_PATH } from "../constant/path";

export const useCourseDetail = (maKhoaHoc: string) => {
    const router = useRouter();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // --- THÊM STATE QUẢN LÝ ĐĂNG KÝ VÀ HỌC VIÊN ---
    const [studentCount, setStudentCount] = useState(0);
    const [isRegistering, setIsRegistering] = useState(false);
    
    // 1. Fetch dữ liệu
    useEffect(() => {
        const fetchDetail = async () => {
            if (!maKhoaHoc) return;

            try {
                setLoading(true);
                const data = await courseService.getDetail(maKhoaHoc);
                setCourse(data);
                // Khởi tạo số lượng học viên từ data API trả về
                setStudentCount(data?.soLuongHocVien || 0);
            } catch (error) {
                setError('Không thể tải thông tin khóa học.');
                console.error(error);                
            } finally {
                setLoading(false);
            };
        };
        fetchDetail();  
    }, [maKhoaHoc]);

    // 2. Logic đăng ký khóa học
    const handleRegisterCourse = async () => {
        const isLogin = localStorage.getItem("userLogin");
        if (!isLogin) {
            alert("Bạn cần đăng nhập để đăng ký khóa học này!");
            router.push(PUBLIC_PATH.SIGN_IN);
            return;
        }

        try {
            setIsRegistering(true);
            const message = await courseService.dangKyKhoaHoc(maKhoaHoc);
            alert(message); 
            
            // Cập nhật số học viên ngay lập tức
            setStudentCount(prev => prev + 1);
            
        } catch (error: any) {
            alert(`Thất bại: ${error.message}`);
        } finally {
            setIsRegistering(false);
        }
    };

    // 3. Trả về cho giao diện sử dụng
    return { 
        course, loading, error, 
        studentCount, isRegistering, handleRegisterCourse 
    };
}
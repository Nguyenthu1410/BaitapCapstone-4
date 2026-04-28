import { useEffect, useState } from "react"
import { Course } from "../types/course"
import { courseService } from "../services/courseServices";


export const useCourseDetail = (maKhoaHoc: string) => {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchDetail = async () => {
            if (!maKhoaHoc) return;

            try {
                setLoading(true);
                const data = await courseService.getDetail(maKhoaHoc);
                setCourse(data);
            } catch (error) {
                setError('Không thể tải thông tin khóa học.');
                console.error(error);                
            } finally {
                setLoading(false);
            };
            
        };
    fetchDetail();  
    }, [maKhoaHoc])

    return {course, loading, error};
}
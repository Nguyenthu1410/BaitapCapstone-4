import { useState, useEffect, useMemo } from 'react';
import { courseService } from '@/src/services/courseServices';
import { Course, Category, CoursePayload } from '@/src/types/course';
import { message } from 'antd';

export const useAdminCourses = () => {
  // 1. CÁC STATE QUẢN LÝ DỮ LIỆU & BỘ LỌC
  const [searchText, setSearchText] = useState("");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. CÁC STATE QUẢN LÝ MODAL (THÊM & SỬA)
  // State Thêm khóa học
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State Chỉnh sửa khóa học
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // 3. FETCH DATA LẦN ĐẦU
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [coursesData, categoriesData] = await Promise.all([
          courseService.getList(),
          courseService.getCategories()
        ]);
        setAllCourses(coursesData);
        setCourses(coursesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khởi tạo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // 4. LỌC DỮ LIỆU KHI ĐỔI DANH MỤC
  useEffect(() => {
    const fetchFilterCourses = async () => {
      if (allCourses.length === 0 && !selectedCategory) return;
      
      setLoading(true);
      try {
        if (!selectedCategory) {
          setCourses(allCourses);
        } else {
          const data = await courseService.getCoursesByCategory(selectedCategory);
          setCourses(data);
        }
      } catch (error) {
        console.error("Lỗi gọi API lọc theo danh mục:", error);
        setCourses([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchFilterCourses();
  }, [selectedCategory, allCourses]);

  // 5. MEMO: TÌM KIẾM THEO TỪ KHÓA
  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.tenKhoaHoc.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [courses, searchText]);

  // 6. HÀM XỬ LÝ: THÊM KHÓA HỌC
  const handleAddCourse = async (values: CoursePayload) => {
    try {
      // Gọi API thêm khóa học
      await courseService.xuLyKhoaHocVoiAnh(values, 'THEM');
      
      // Thành công
      alert("Thêm khóa học thành công!"); // Hoặc message.success(...)
      return true;
    } catch (error: any) {
      // LỖI NẰM Ở ĐÂY: Hiển thị error.message thay vì tự viết câu báo lỗi
      alert(error.message); // Hoặc message.error(error.message)
      return false;
    }
  };

  // 7. HÀM XỬ LÝ: CHỈNH SỬA KHÓA HỌC
  const handleUpdateCourse = async (values: any) => {
    setIsUpdating(true);
    try {
      const payload = { ...editingCourse, ...values };
      await courseService.capNhatKhoaHoc(payload);
      
      message.success("Cập nhật khóa học thành công!");
      
      setIsEditModalOpen(false);
      setEditingCourse(null);
      const newData = await courseService.getList();
      setAllCourses(newData);
      setCourses(newData);
      
      return true;
    } catch (error: any) {
      message.error(error.message || "Có lỗi xảy ra khi cập nhật!");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  // 8. HÀM XÓA KHÓA HỌC
  const handleDeleteCourse = async (maKhoaHoc: string) => {
    try {
      await courseService.xoaKhoaHoc(maKhoaHoc);
      message.success("Xóa khóa học thành công!"); 
    } catch (error: any) {
      message.error(error.message); 
    }
  }

  // 9. EXPORT TẤT CẢ RA CHO UI SỬ DỤNG
    return {
    // Data & Filter
    searchText, setSearchText,
    categories,
    selectedCategory, setSelectedCategory,
    loading,
    filteredCourses,
    
    // Add Course
    isAddModalOpen, setIsAddModalOpen,
    isSubmitting, handleAddCourse,
    
    // Edit Course
    isEditModalOpen, setIsEditModalOpen,
    isUpdating, editingCourse, setEditingCourse, handleUpdateCourse,

    // Delete Course
    handleDeleteCourse,
  };
};
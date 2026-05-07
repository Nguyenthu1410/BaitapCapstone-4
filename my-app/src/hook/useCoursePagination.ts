// import { useState, useEffect, useCallback } from 'react';
// import { courseService } from '../services/courseServices';
// import { Course } from '../types/course';

// export const useCoursePagination = (initialPage: number = 1, initialItemsPerPage: number = 12) => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(initialPage);
//   const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Hàm gọi API
//   const fetchCourses = useCallback(async (page: number, limit: number) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await courseService.getCoursesPaginated(page, limit);
//       setCourses(response.items);
//       setTotalPages(response.totalPages);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Lỗi tải danh sách khóa học');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCourses(currentPage, itemsPerPage);
//   }, [currentPage, itemsPerPage, fetchCourses]);

//   const handlePageChange = useCallback((newPage: number) => {
//     setCurrentPage(newPage);
//   }, []);

//   const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
//     setItemsPerPage(newItemsPerPage);
//     setCurrentPage(1); 
//   }, []);

//   return {
//     courses,
//     currentPage,
//     itemsPerPage,
//     totalPages,
//     loading,
//     error,
//     handlePageChange,
//     handleItemsPerPageChange,
//   };
// };
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useCourseDetail } from '@/src/hook/clients/useCourseDetail';
import CourseDetail from '@/src/components/CourseDetail';


export default function CourseDetailPage() {
  const params = useParams();
  const maKhoaHoc = decodeURIComponent(params.maKhoaHoc as string).trim();
  
  const { course, loading, error } = useCourseDetail(maKhoaHoc);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error || !course) return (
    <div className="text-center py-20 text-red-500 font-medium">
      {error || "Không tìm thấy khóa học"}
    </div>
  );
  console.log("Data chi tiết khóa học:", course);
  return <CourseDetail course={course} />;
}
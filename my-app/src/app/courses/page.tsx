import React from 'react';
import CourseList from '@/src/components/CourseList';

export default function CoursePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Danh Sách Khóa Học</h1>
            <CourseList />
    </main>
  );
}
import CourseSection from "../components/CourseSection";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7f9]">
      {/* 1. Thanh Navbar luôn dính ở trên cùng */}
      {/* <Header /> */}

      {/* 2. Phần nội dung khóa học và banner */}
      <div className="py-4"> 
         <CourseSection />
      </div>
    </main>
  );
}
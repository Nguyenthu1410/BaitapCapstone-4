import CourseList from "../components/CourseList";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7f9]">

      <div className="py-4" >
         <CourseList />
      </div>
    </main>
  );
}
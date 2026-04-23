import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-blue-600">
          E-LEARNING
        </Link>
        <div className="hidden md:flex items-center space-x-8 font-semibold text-gray-600">
          <Link href="/courses" className="hover:text-blue-600 transition">Khóa học</Link>
          <Link href="#" className="hover:text-blue-600 transition">Sự kiện</Link>
          <Link href="#" className="hover:text-blue-600 transition">Về chúng tôi</Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-5 py-2.5 text-gray-700 font-bold hover:text-blue-600">Đăng nhập</button>
          <button className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100">Đăng ký</button>
        </div>
      </div>
    </nav>
  );
}
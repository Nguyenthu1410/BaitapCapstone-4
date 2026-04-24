"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCategories } from '../services/courseServices'
import { Course } from "../types/course";

export default function Navbar() {
  const [categories, setCategories] = useState<Course[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* 1. LOGO (Theo style CyberSoft) */}
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-[900] tracking-tighter text-blue-700 group-hover:text-blue-800 transition-colors">
                CYBER<span className="text-yellow-500">SOFT</span>
              </span>
            </Link>

            {/* 2. DANH MỤC (Dropdown với Icon Menu) */}
            <div className="hidden lg:block relative group">
              <button className="flex items-center gap-2 font-bold text-gray-800 hover:text-blue-600 transition-all py-2">
                <div className="flex flex-col gap-[3px] w-5">
                  <span className="h-[2px] w-full bg-current rounded-full"></span>
                  <span className="h-[2px] w-2/3 bg-current rounded-full"></span>
                  <span className="h-[2px] w-full bg-current rounded-full"></span>
                </div>
                <span className="uppercase text-sm tracking-wide">Danh mục</span>
              </button>
              
              {/* Dropdown Menu (Đổ dữ liệu từ API) */}
              <div className="absolute top-full -left-4 w-72 bg-white shadow-2xl border border-gray-100 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 overflow-hidden py-2">
                <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Khóa học theo chủ đề</div>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <Link 
                      key={cat.maDanhMuc} 
                      href={`/courses/category/${cat.maDanhMuc}`}
                      className="flex items-center px-5 py-3 hover:bg-blue-50 text-gray-700 font-semibold transition-colors border-l-4 border-transparent hover:border-blue-600"
                    >
                      {cat.tenDanhMuc}
                    </Link>
                  ))
                ) : (
                  <div className="px-5 py-3 text-gray-400 text-sm animate-pulse">Đang tải dữ liệu...</div>
                )}
              </div>
            </div>
          </div>

          {/* 3. THANH TÌM KIẾM (Chiếm diện tích lớn ở giữa) */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <input
              type="text"
              placeholder="Bạn muốn học gì hôm nay?"
              className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 pl-5 pr-14 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all outline-none text-sm text-gray-700"
            />
            <button className="absolute right-0 top-0 h-full px-5 text-gray-400 hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* 4. CỤM NÚT ĐĂNG NHẬP / ĐĂNG KÝ (Phía bên phải) */}
          <div className="flex items-center gap-2">
            <Link 
              href="/login" 
              className="hidden sm:flex items-center gap-2 font-bold text-gray-700 hover:text-blue-600 px-4 py-2.5 transition-colors text-sm uppercase"
            >
              Đăng nhập
            </Link>
            <Link 
              href="/register" 
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-[800] px-7 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm uppercase tracking-tight"
            >
              Đăng ký
            </Link>

            {/* Menu Mobile */}
            <button 
              className="lg:hidden p-2 text-gray-800 ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV (Drawer đơn giản) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-6 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Danh mục</p>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((cat) => (
                <Link key={cat.maDanhMuc} href={`/courses/category/${cat.maDanhMuc}`} className="text-gray-700 font-bold hover:text-blue-600 transition-colors">
                  {cat.tenDanhMuc}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-6 border-t flex flex-col gap-3">
            <Link href="/login" className="w-full text-center py-3 font-bold text-gray-700 border border-gray-200 rounded-lg">ĐĂNG NHẬP</Link>
            <Link href="/register" className="w-full text-center py-3 font-bold bg-yellow-400 text-blue-900 rounded-lg">ĐĂNG KÝ</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
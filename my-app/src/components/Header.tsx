"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { PUBLIC_PATH } from "@/src/constant/path";
import { useHeader } from "@/src/hook/clients/useHeader";

const Header: React.FC = () => {
  const {
    user,
    isMounted,
    isLoggingOut,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    handleLogout,
    currentKeyword,
    inputRef,
    handleAutoSearch,
    handleSearch,
    router,
  } = useHeader();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] font-sans transition-all duration-300 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-4 xl:gap-6 shrink-0">
            <Link href={PUBLIC_PATH.HOME} className="flex items-center group shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-baseline italic">
                <span className="text-3xl font-black text-[#1a73e8] group-hover:scale-105 transition-transform duration-300">E-</span>
                <span className="text-2xl font-extrabold tracking-widest text-slate-800 uppercase">Learning</span>
              </div>
              <div className="ml-1.5 h-2 w-2 rounded-full bg-orange-500 self-end mb-1.5 animate-pulse"></div>
            </Link>

            {/* THANH TÌM KIẾM */}
            <form onSubmit={handleSearch} className="hidden lg:flex relative group items-center">
              <Search className="absolute left-4 text-slate-400 group-focus-within:text-[#1a73e8] transition-colors z-10 pointer-events-none" size={16} />
              <input
                ref={inputRef}
                type="text"
                defaultValue={currentKeyword}
                onChange={(e) => handleAutoSearch(e.target.value)}
                placeholder="Tìm kiếm khóa học"
                className="w-12 xl:w-16 focus:w-48 xl:focus:w-64 hover:w-48 xl:hover:w-64 transition-all duration-400 ease-out bg-slate-100 border border-transparent focus:bg-white focus:border-blue-300 focus:shadow-[0_4px_20px_rgba(26,115,232,0.15)] rounded-full pl-10 focus:pl-11 hover:pl-11 pr-2 h-10 text-[13px] text-slate-700 outline-none placeholder-slate-400 select-text"
              />
              <button type="submit" className="hidden">Search</button>
            </form>
          </div>

          {/* NAVIGATION */}
          <div className="hidden lg:flex flex-1 justify-center transition-all duration-400">
            <div className="flex items-center space-x-4 xl:space-x-8 text-[12px] xl:text-[13px] font-bold text-slate-600 uppercase tracking-widest bg-white/50 px-2 rounded-full whitespace-nowrap">
              <Link href={PUBLIC_PATH.HOME} className="hover:text-[#1a73e8] transition-colors">Home</Link>
              <Link href={PUBLIC_PATH.COURSES} className="hover:text-[#1a73e8] transition-colors">Courses</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} className="hover:text-[#1a73e8] transition-colors">Mentors</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} className="hover:text-[#1a73e8] transition-colors">About Us</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} className="hover:text-[#1a73e8] transition-colors">Contact</Link>
            </div>
          </div>

          {/* AUTH BUTTONS & USER PROFILE */}
          <div className="flex items-center shrink-0">
            {!isMounted ? (
              <div className="hidden md:flex items-center gap-3 pr-4 animate-pulse">
                <div className="w-24 h-4 bg-slate-200 rounded-md"></div>
                <div className="w-9 h-9 bg-slate-200 rounded-full"></div>
              </div>
            ) : user ? (
              <div className="hidden md:flex items-center gap-3 pr-4 animate-in fade-in duration-500">
                <span className="text-slate-600 font-medium italic text-sm">
                  Xin chào, {user.hoTen}
                </span>
                <div 
                  onClick={() => router.push('/profile')}
                  className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-sm font-bold uppercase active:scale-95"
                  title="Xem trang cá nhân"
                >
                  {user.hoTen.charAt(0)}
                </div>
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut} 
                  className={`text-xs ml-1 font-medium transition-colors ${
                    isLoggingOut ? "text-slate-300 cursor-not-allowed" : "text-slate-400 hover:text-red-500"
                  }`}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 border-l border-slate-200 pl-4 xl:pl-6 animate-in fade-in duration-500">
                <Link href={PUBLIC_PATH.SIGN_IN} className="text-[12px] xl:text-[13px] font-bold text-slate-600 hover:text-[#1a73e8] px-2 xl:px-3 py-2 transition-colors whitespace-nowrap">
                  Đăng Nhập
                </Link>
                <Link href={PUBLIC_PATH.REGISTER} className="bg-[#1a73e8] text-white text-[12px] xl:text-[13px] px-4 xl:px-5 py-2.5 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 duration-200 whitespace-nowrap">
                  Đăng Ký
                </Link>
              </div>
            )}

            {isMounted && !user && (
              <div className="hidden md:flex lg:hidden items-center space-x-3 mr-4 animate-in fade-in duration-500">
                <Link href={PUBLIC_PATH.SIGN_IN} className="text-[13px] font-bold text-slate-600 hover:text-[#1a73e8] px-3 py-2 transition-colors whitespace-nowrap">
                  Đăng Nhập
                </Link>
                <Link href={PUBLIC_PATH.REGISTER} className="bg-[#1a73e8] text-white text-[13px] px-5 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all active:scale-95 whitespace-nowrap">
                  Đăng Ký
                </Link>
              </div>
            )}

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative active:scale-95"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-20 z-40 bg-slate-900/10 backdrop-blur-[2px] lg:hidden animate-in fade-in duration-200 select-none"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-50 lg:hidden flex flex-col gap-6 animate-in slide-in-from-top-4 fade-in duration-300 select-none">
            
            {isMounted && user && (
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl mb-2">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg uppercase shadow-sm">
                  {user.hoTen.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500 font-medium">Xin chào,</span>
                  <span className="font-bold text-slate-800">{user.hoTen}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSearch} className="flex lg:hidden items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:border-[#1a73e8] transition-all">
              <Search size={18} className="text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                defaultValue={currentKeyword}
                onChange={(e) => handleAutoSearch(e.target.value)}
                placeholder="Tìm khóa học..."
                className="bg-transparent outline-none w-full text-[15px] text-slate-700 select-text"
              />
            </form>

            <div className="grid grid-cols-2 gap-4">
              <Link href={PUBLIC_PATH.HOME} onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm text-center hover:bg-blue-50 hover:text-[#1a73e8] transition-colors active:scale-95">HOME</Link>
              <Link href={PUBLIC_PATH.COURSES} onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm text-center hover:bg-blue-50 hover:text-[#1a73e8] transition-colors active:scale-95">COURSES</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm text-center hover:bg-blue-50 hover:text-[#1a73e8] transition-colors active:scale-95">MENTORS</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm text-center hover:bg-blue-50 hover:text-[#1a73e8] transition-colors active:scale-95">ABOUT US</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} onClick={() => setIsMobileMenuOpen(false)} className="col-span-2 p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm text-center hover:bg-blue-50 hover:text-[#1a73e8] transition-colors active:scale-95">CONTACT US</Link>
            </div>

            <hr className="border-slate-100" />

            {!isMounted ? (
                <div className="flex flex-col gap-3 animate-pulse">
                  <div className="w-full h-12 bg-slate-200 rounded-xl"></div>
                  <div className="w-full h-12 bg-slate-200 rounded-xl"></div>
                </div>
            ) : user ? (
               <div className="flex flex-col gap-3">
                 <Link href='/profile' onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3.5 text-center font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors active:scale-[0.98]">
                   Trang Cá Nhân
                 </Link>
                 <button 
                   onClick={handleLogout} 
                   disabled={isLoggingOut}
                   className={`w-full py-3.5 text-center font-bold rounded-xl shadow-md transition-all active:scale-[0.98] ${
                     isLoggingOut ? "bg-red-300 text-white cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"
                   }`}
                 >
                   Đăng Xuất
                 </button>
               </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href={PUBLIC_PATH.SIGN_IN} onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3.5 text-center font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors active:scale-[0.98]">
                  Đăng Nhập
                </Link>
                <Link href={PUBLIC_PATH.REGISTER} onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3.5 text-center font-bold text-white bg-[#1a73e8] rounded-xl hover:bg-blue-700 shadow-md transition-all active:scale-[0.98]">
                  Đăng Ký Thành Viên
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      {/* HIỆU ỨNG LOADING ĐĂNG XUẤT */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md animate-in fade-in duration-300 select-none">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-slate-600 font-bold tracking-wider animate-pulse uppercase text-xs">
            Đang đăng xuất...
          </p>
        </div>
      )}
    </>
  );
};

export default Header;
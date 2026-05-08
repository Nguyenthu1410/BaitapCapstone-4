"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { PUBLIC_PATH } from "@/src/constant/path";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentKeyword = searchParams.get("keyword") || "";
  const keywordRef = React.useRef(currentKeyword);
  const debounceRef = React.useRef<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  
  // State quản lý Menu nổi trên Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigateWithKeyword = React.useCallback(
    (rawKeyword: string, method: "push" | "replace") => {
      const kw = rawKeyword.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (kw) {
        params.set("keyword", kw);
      } else {
        params.delete("keyword");
      }

      const query = params.toString();
      const targetPath = PUBLIC_PATH.COURSES;
      const nextUrl = query ? `${targetPath}?${query}` : targetPath;
      const currentQuery = searchParams.toString();
      const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;

      if (nextUrl === currentUrl) return;

      if (method === "replace") {
        router.replace(nextUrl);
        return;
      }
      router.push(nextUrl);
    },
    [pathname, router, searchParams],
  );

  const handleAutoSearch = React.useCallback(
    (nextKeyword: string) => {
      keywordRef.current = nextKeyword;
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(() => {
        navigateWithKeyword(nextKeyword, "replace");
      }, 300);
    },
    [navigateWithKeyword],
  );

  React.useEffect(() => {
    keywordRef.current = currentKeyword;
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.value = currentKeyword;
    }
  }, [currentKeyword]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigateWithKeyword(keywordRef.current, "push");
    setIsMobileMenuOpen(false); 
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* 1. LOGO + THANH TÌM KIẾM NGẮN */}
          <div className="flex items-center gap-4 xl:gap-6 flex-shrink-0">
            <Link href={PUBLIC_PATH.HOME} className="flex items-center group shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-baseline italic">
                <span className="text-3xl font-black text-[#1a73e8] group-hover:scale-105 transition-transform duration-300">E-</span>
                <span className="text-2xl font-extrabold tracking-widest text-slate-800 uppercase">Learning</span>
              </div>
              <div className="ml-1.5 h-2 w-2 rounded-full bg-orange-500 self-end mb-1.5 animate-pulse"></div>
            </Link>

            {/* Thanh Tìm Kiếm */}
            <form onSubmit={handleSearch} className="hidden lg:flex relative group items-center">
              <Search className="absolute left-4 text-slate-400 group-focus-within:text-[#1a73e8] transition-colors z-10 pointer-events-none" size={16} />
              <input
                ref={inputRef}
                type="text"
                defaultValue={currentKeyword}
                onChange={(e) => handleAutoSearch(e.target.value)}
                placeholder="Tìm kiếm khóa học"
                className="w-12 xl:w-16 focus:w-48 xl:focus:w-64 hover:w-48 xl:hover:w-64 transition-all duration-400 ease-out bg-slate-100 border border-transparent focus:bg-white focus:border-blue-300 focus:shadow-[0_4px_20px_rgba(26,115,232,0.15)] rounded-full pl-10 focus:pl-11 hover:pl-11 pr-2 h-10 text-[13px] text-slate-700 outline-none placeholder-slate-400"
              />
              <button type="submit" className="hidden">Search</button>
            </form>
          </div>

          {/* 2. NAVIGATION */}
          <div className="hidden lg:flex flex-1 justify-center transition-all duration-400">
            <div className="flex items-center space-x-4 xl:space-x-8 text-[12px] xl:text-[13px] font-bold text-slate-600 uppercase tracking-widest bg-white/50 px-2 rounded-full whitespace-nowrap">
              <Link href={PUBLIC_PATH.HOME} className="hover:text-[#1a73e8] transition-colors">Home</Link>
              <Link href={PUBLIC_PATH.COURSES} className="hover:text-[#1a73e8] transition-colors">Courses</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} className="hover:text-[#1a73e8] transition-colors">Mentors</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} className="hover:text-[#1a73e8] transition-colors">About Us</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} className="hover:text-[#1a73e8] transition-colors">Contact</Link>
            </div>
          </div>

          {/* 3. AUTH BUTTONS */}
          <div className="flex items-center shrink-0">
            
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 border-l border-slate-200 pl-4 xl:pl-6">
              <Link href={PUBLIC_PATH.SIGN_IN} className="text-[12px] xl:text-[13px] font-bold text-slate-600 hover:text-[#1a73e8] px-2 xl:px-3 py-2 transition-colors whitespace-nowrap">
                Đăng Nhập
              </Link>
              <Link href={PUBLIC_PATH.REGISTER} className="bg-[#1a73e8] text-white text-[12px] xl:text-[13px] px-4 xl:px-5 py-2.5 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 duration-200 whitespace-nowrap">
                Đăng Ký
              </Link>
            </div>

            <div className="hidden md:flex lg:hidden items-center space-x-3 mr-4">
              <Link href={PUBLIC_PATH.SIGN_IN} className="text-[13px] font-bold text-slate-600 hover:text-[#1a73e8] px-3 py-2 transition-colors whitespace-nowrap">
                Đăng Nhập
              </Link>
              <Link href={PUBLIC_PATH.REGISTER} className="bg-[#1a73e8] text-white text-[13px] px-5 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all whitespace-nowrap">
                Đăng Ký
              </Link>
            </div>

            {/* Nút Toggle Menu */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-20 z-40 bg-slate-900/10 backdrop-blur-[2px] lg:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-50 lg:hidden flex flex-col gap-6 animate-in slide-in-from-top-4 fade-in duration-300">
            
            {/* Search Mobile */}
            <form onSubmit={handleSearch} className="flex lg:hidden items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:border-[#1a73e8] transition-all">
              <Search size={18} className="text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                defaultValue={currentKeyword}
                onChange={(e) => handleAutoSearch(e.target.value)}
                placeholder="Tìm khóa học..."
                className="bg-transparent outline-none w-full text-[15px] text-slate-700"
              />
            </form>

            <div className="grid grid-cols-2 gap-4">
              <Link href={PUBLIC_PATH.HOME} onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm text-center hover:bg-blue-50 hover:text-[#1a73e8] transition-colors">HOME</Link>
              <Link href={PUBLIC_PATH.COURSES} onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm text-center hover:bg-blue-50 hover:text-[#1a73e8] transition-colors">COURSES</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm text-center hover:bg-blue-50 hover:text-[#1a73e8] transition-colors">MENTORS</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm text-center hover:bg-blue-50 hover:text-[#1a73e8] transition-colors">ABOUT US</Link>
              <Link href={PUBLIC_PATH.COMING_SOON} onClick={() => setIsMobileMenuOpen(false)} className="col-span-2 p-3 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm text-center hover:bg-blue-50 hover:text-[#1a73e8] transition-colors">CONTACT US</Link>
            </div>

            <hr className="border-slate-100" />

            <div className="flex flex-col gap-3">
              <Link href={PUBLIC_PATH.SIGN_IN} onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3.5 text-center font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                Đăng Nhập
              </Link>
              <Link href={PUBLIC_PATH.REGISTER} onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3.5 text-center font-bold text-white bg-[#1a73e8] rounded-xl hover:bg-blue-700 shadow-md transition-all">
                Đăng Ký Thành Viên
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
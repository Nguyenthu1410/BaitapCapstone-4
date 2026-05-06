"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Phone, Mail } from "lucide-react";
import { PUBLIC_PATH } from "@/src/constant/path";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentKeyword = searchParams.get("keyword") || "";
  const keywordRef = React.useRef(currentKeyword);
  const debounceRef = React.useRef<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
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

      // SỬA DÒNG NÀY: Thay "/" bằng PUBLIC_PATH.COURSES
      const targetPath = PUBLIC_PATH.COURSES;

      const nextUrl = query ? `${targetPath}?${query}` : targetPath;
      const currentQuery = searchParams.toString();
      const currentUrl = currentQuery
        ? `${pathname}?${currentQuery}`
        : pathname;

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

  React.useEffect(
    () => () => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
    },
    [],
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    navigateWithKeyword(keywordRef.current, "push");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm font-sans transition-all">
      {/* -- TOP BAR -- */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center text-[12px] text-gray-600">
        <div className="flex items-center space-x-6">
          {/* SEARCH BOX */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50 focus-within:ring-1 focus-within:ring-blue-400 transition"
          >
            <input
              ref={inputRef}
              type="text"
              defaultValue={currentKeyword}
              onChange={(e) => handleAutoSearch(e.target.value)}
              placeholder="Bạn tìm gì?"
              className="px-4 py-1.5 outline-none w-36 bg-transparent italic"
            />
            <button
              type="submit"
              className="bg-[#1a73e8] text-white px-4 py-1.5 font-bold hover:bg-blue-700 transition"
              aria-label="Tìm kiếm"
            >
              <Search />
            </button>
          </form>

          {/* CONTACT INFO */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="flex items-center gap-1 hover:text-blue-600 cursor-default">
              <Phone size={13} className="text-[#1a73e8]" /> Tư vấn:{" "}
              <strong className="text-black ml-0.5">0974 114 905</strong>
            </span>
            <span className="flex items-center gap-1 hover:text-blue-600 cursor-default">
              <Mail size={13} className="text-[#1a73e8]" />{" "}
              training@elearning.vn
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100"></div>

      {/* -- MAIN NAVIGATION -- */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* LOGO TEXT E-LEARNING */}
        <Link
          href={PUBLIC_PATH.HOME}
          className="flex items-center group cursor-pointer select-none"
        >
          <div className="flex items-baseline italic">
            <span className="text-3xl font-black tracking-tighter text-[#1a73e8] group-hover:scale-105 transition-transform">
              E-
            </span>
            <span className="text-2xl font-extrabold tracking-[0.15em] bg-linear-to-r from-[#1a73e8] to-blue-400 bg-clip-text text-transparent uppercase">
              Learning
            </span>
          </div>
          <div className="ml-1 h-2 w-2 rounded-full bg-orange-500 self-end mb-1.5 animate-pulse"></div>
        </Link>

        {/* MENU LINK */}
        <ul className="hidden lg:flex items-center space-x-6 text-[14px] font-bold text-gray-700 uppercase tracking-tight">
          <li>
            <Link
              href={PUBLIC_PATH.HOME}
              className="flex items-center gap-1.5 hover:text-[#1a73e8] transition-colors"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              href={PUBLIC_PATH.COURSES}
              className="flex items-center gap-1.5 hover:text-[#1a73e8] transition-colors"
            >
              COURSES
            </Link>
          </li>
          <li>
            <Link
              href={PUBLIC_PATH.COMING_SOON}
              className="hover:text-[#1a73e8] transition-colors"
            >
              MENTORS
            </Link>
          </li>
          <li>
            <Link
              href={PUBLIC_PATH.COMING_SOON}
              className="flex items-center gap-1.5 hover:text-[#1a73e8] transition-colors"
            >
              ABOUT US
            </Link>
          </li>
          <li>
            <Link
              href={PUBLIC_PATH.COMING_SOON}
              className="flex items-center gap-1.5 hover:text-[#1a73e8] transition-colors group relative py-2"
            >
              CONTACT US
            </Link>
          </li>
        </ul>

        {/* AUTH BUTTON */}
        <div className="flex items-center space-x-2">
          <Link
            href={PUBLIC_PATH.REGISTER}
            className="flex items-center gap-1.5 bg-[#1a73e8] text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:shadow-md transition-all active:scale-95"
          >
            Đăng Ký
          </Link>
          <Link
            href={PUBLIC_PATH.SIGN_IN}
            className="flex items-center gap-1.5 bg-[#1a73e8] text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:shadow-md transition-all active:scale-95"
          >
            Đăng Nhập
          </Link>
        </div>

        {/* CART */}
        {/* <div className="relative group cursor-pointer p-2 hover:bg-orange-50 rounded-full transition-all">
           <ShoppingCart size={26} className="text-[#f39c12]" />
           <span className="absolute top-0 right-0 bg-[#333] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
             0
           </span>
         </div> */}
      </nav>
    </header>
  );
};

export default Header;

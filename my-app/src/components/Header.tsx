 'use client';

//  import * as React from 'react';
//  import Link from 'next/link';
//  import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//   import { Search, Phone, Mail } from 'lucide-react';
//  import { PUBLIC_PATH } from '@/src/constant/path';
//  const Header: React.FC = () => {
//    const router = useRouter();
//    const pathname = usePathname();
//    const searchParams = useSearchParams();
//    const currentKeyword = searchParams.get('keyword') || '';
//    const keywordRef = React.useRef(currentKeyword);
//    const debounceRef = React.useRef<number | null>(null);
//    const inputRef = React.useRef<HTMLInputElement | null>(null);

//    const navigateWithKeyword = React.useCallback(
//      (rawKeyword: string, method: 'push' | 'replace') => {
//        const kw = rawKeyword.trim();
//        const params = new URLSearchParams(searchParams.toString());

//        if (kw) {
//          params.set('keyword', kw);
//        } else {
//          params.delete('keyword');
//        }

//        const query = params.toString();
//        const targetPath = '/';
//        const nextUrl = query ? `${targetPath}?${query}` : targetPath;
//        const currentQuery = searchParams.toString();
//        const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;

//        if (nextUrl === currentUrl) return;

//        if (method === 'replace') {
//          router.replace(nextUrl);
//          return;
//        }

//        router.push(nextUrl);
//      },
//      [pathname, router, searchParams]
//    );

//    const handleAutoSearch = React.useCallback(
//      (nextKeyword: string) => {
//        keywordRef.current = nextKeyword;

//        if (debounceRef.current !== null) {
//          window.clearTimeout(debounceRef.current);
//        }

//        debounceRef.current = window.setTimeout(() => {
//          navigateWithKeyword(nextKeyword, 'replace');
//        }, 300);
//      },
//      [navigateWithKeyword]
//    );

//    React.useEffect(() => {
//      keywordRef.current = currentKeyword;
//      if (inputRef.current && document.activeElement !== inputRef.current) {
//        inputRef.current.value = currentKeyword;
//      }
//    }, [currentKeyword]);

//    React.useEffect(
//      () => () => {
//        if (debounceRef.current !== null) {
//          window.clearTimeout(debounceRef.current);
//        }
//      },
//      []
//    );

//    const handleSearch = (e: React.FormEvent) => {
//      e.preventDefault();
//      if (debounceRef.current !== null) {
//        window.clearTimeout(debounceRef.current);
//        debounceRef.current = null;
//      }
//      navigateWithKeyword(keywordRef.current, 'push');
//    };

//    return (
//       <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm font-sans transition-all">

//         {/* -- TOP BAR -- */}
//         <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center text-[12px] text-gray-600">
//           <div className="flex items-center space-x-6">
//             {/* SEARCH BOX */}
//             <form
//               onSubmit={handleSearch}
//               className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50 focus-within:ring-1 focus-within:ring-blue-400 transition"
//             >
//               <input
//                 ref={inputRef}
//                 type="text"
//                 defaultValue={currentKeyword}
//                 onChange={(e) => handleAutoSearch(e.target.value)}
//                 placeholder="Bạn tìm gì?"
//                 className="px-4 py-1.5 outline-none w-36 bg-transparent italic"
//               />
//               <button
//                 type="submit"
//                 className="bg-[#1a73e8] text-white px-4 py-1.5 font-bold hover:bg-blue-700 transition"
//                 aria-label="Tìm kiếm"
//               >
//                 <Search />
//               </button>
//             </form>

//             {/* CONTACT INFO */}
//             <div className="hidden md:flex items-center space-x-4">
//               <span className="flex items-center gap-1 hover:text-blue-600 cursor-default">
//                 <Phone size={13} className="text-[#1a73e8]" /> Tư vấn: <strong className="text-black ml-0.5">0974 114 905</strong>
//               </span>
//               <span className="flex items-center gap-1 hover:text-blue-600 cursor-default">
//                 <Mail size={13} className="text-[#1a73e8]" /> training@elearning.vn
//               </span>
//             </div>
//           </div>

//           {/* AUTH BUTTON */}
//           <div className="flex items-center space-x-2">
//             <button
//               type="button"
//               className="flex items-center gap-1.5 bg-[#1a73e8] text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:shadow-md transition-all active:scale-95"
//             >
//               Đăng Ký
//             </button>
//             <button
//               type="button"
//               className="flex items-center gap-1.5 bg-[#1a73e8] text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:shadow-md transition-all active:scale-95"
//             >
//               Đăng Nhập
//             </button>
//           </div>
//         </div>

//         <div className="border-b border-gray-100"></div>

//         {/* -- MAIN NAVIGATION -- */}
//         <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

//           {/* LOGO TEXT E-LEARNING */}
//           <Link href={PUBLIC_PATH.HOME} className="flex items-center group cursor-pointer select-none">
//             <div className="flex items-baseline italic">
//               <span className="text-3xl font-black tracking-tighter text-[#1a73e8] group-hover:scale-105 transition-transform">E-</span>
//               <span className="text-2xl font-extrabold tracking-[0.15em] bg-linear-to-r from-[#1a73e8] to-blue-400 bg-clip-text text-transparent uppercase">
//                 Learning
//               </span>
//             </div>
//             <div className="ml-1 h-2 w-2 rounded-full bg-orange-500 self-end mb-1.5 animate-pulse"></div>
//           </Link>

//           {/* MENU LINK */}
//           <ul className="hidden lg:flex items-center space-x-6 text-[14px] font-bold text-gray-700 uppercase tracking-tight">
//             <li>
//               <Link href={PUBLIC_PATH.HOME} className="flex items-center gap-1.5 hover:text-[#1a73e8] transition-colors">
//                 HOME
//               </Link>
//             </li>
//             <li>
//               <Link href={PUBLIC_PATH.COURSES} className="flex items-center gap-1.5 hover:text-[#1a73e8] transition-colors">
//                 COURSE
//               </Link>
//             </li>
//             <li>
//               <Link href={PUBLIC_PATH.MENTORS} className="hover:text-[#1a73e8] transition-colors">
//                 MENTORS
//               </Link>
//             </li>
//             <li>
//               <Link href={PUBLIC_PATH.ABOUT_US} className="flex items-center gap-1.5 hover:text-[#1a73e8] transition-colors">
//                 ABOUT US
//               </Link>
//             </li>
//             <li>
//               <Link href={PUBLIC_PATH.CONTACT_US} className="flex items-center gap-1.5 hover:text-[#1a73e8] transition-colors group relative py-2">
//                 CONTACT US 
//               </Link>
//             </li>
//           </ul>

//           {/* CART */}
//           {/* <div className="relative group cursor-pointer p-2 hover:bg-orange-50 rounded-full transition-all">
//             <ShoppingCart size={26} className="text-[#f39c12]" />
//             <span className="absolute top-0 right-0 bg-[#333] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
//               0
//             </span>
//           </div> */}
//         </nav>
//       </header>
//    );
//  };


//  export default Header;

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Search } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();

  // Đã Việt hóa toàn bộ menu
  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Khóa học', path: '/courses' }, // Đường dẫn lát mình sẽ tạo
    { name: 'Giảng viên', path: '/mentors' },
    { name: 'Về chúng tôi', path: '/about' },
    { name: 'Liên hệ', path: '/contact' },
  ];

  return (
    <header className="w-full bg-[#f4f7f5] px-6 py-6 md:px-12 flex items-center justify-between font-sans">
      
      {/* 1. Logo Left */}
      <Link href="/" className="flex items-center gap-2 text-[#1a1a1a] transition-transform hover:scale-105">
        <GraduationCap size={36} strokeWidth={2.5} />
        <span className="text-2xl font-black tracking-tight">NextLearn</span>
      </Link>

      {/* 2. Navigation Center */}
      <nav className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.name}
              href={link.path}
              className={`text-base font-semibold transition-colors relative ${
                isActive ? 'text-[#1a1a1a]' : 'text-gray-500 hover:text-[#1a1a1a]'
              }`}
            >
              {link.name}
              {/* Hiệu ứng gạch chân cho menu đang active */}
              {isActive && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#1a1a1a]"></span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 3. Actions Right (Đăng nhập + Đăng ký) */}
      <div className="flex items-center gap-3">
        {/* Nút Đăng nhập: Viền xanh, chữ xanh, hover vào sẽ đổi thành nền xanh chữ trắng */}
        <button className="hidden md:block px-6 py-2 border-2 border-[#1a73e8] text-[#1a73e8] font-bold rounded-full hover:bg-[#1a73e8] hover:text-white transition-all active:scale-95 whitespace-nowrap">
          Đăng nhập
        </button>
        
        {/* Nút Đăng ký: Nền xanh, chữ trắng, hover vào sẽ có màu xanh đậm hơn */}
        <button className="hidden md:block px-6 py-2 bg-[#1a73e8] border-2 border-[#1a73e8] text-white font-bold rounded-full hover:bg-blue-700 hover:border-blue-700 transition-all active:scale-95 shadow-sm whitespace-nowrap">
          Đăng ký
        </button>
      </div>  
    </header>
  );
};

export default Header;
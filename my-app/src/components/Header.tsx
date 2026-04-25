import React from 'react';
import { Search, Phone, Mail, User, Key, Home, Star, Globe, Book, BarChart3, UserSquare2, ShoppingCart, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm font-sans transition-all">
      
      {/* -- TOP BAR -- */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center text-[12px] text-gray-600">
        <div className="flex items-center space-x-6">
          {/* SEARCH BOX */}
          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50 focus-within:ring-1 focus-within:ring-blue-400 transition">
            <input 
              type="text" 
              placeholder="Bạn tìm gì?" 
              className="px-4 py-1.5 outline-none w-36 bg-transparent italic"
            />
            <button className="bg-[#1a73e8] text-white px-4 py-1.5 font-bold hover:bg-blue-700 transition">
              <Search />
            </button>
          </div>
          
          {/* CONTACT INFO */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="flex items-center gap-1 hover:text-blue-600 cursor-default">
              <Phone size={13} className="text-[#1a73e8]" /> Tư vấn: <strong className="text-black ml-0.5">0974 114 905</strong>
            </span>
            <span className="flex items-center gap-1 hover:text-blue-600 cursor-default">
              <Mail size={13} className="text-[#1a73e8]" /> training@elearning.vn
            </span>
          </div>
        </div>

        {/* AUTH BUTTON */}
        <div className="flex items-center space-x-2">
          <button className="flex items-center gap-1.5 bg-[#1a73e8] text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:shadow-md transition-all active:scale-95">
            Đăng Ký
          </button>
          <button className="flex items-center gap-1.5 bg-[#1a73e8] text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:shadow-md transition-all active:scale-95">
            Đăng Nhập
          </button>
        </div>
      </div>

      <div className="border-b border-gray-100"></div>

      {/* -- MAIN NAVIGATION -- */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO TEXT E-LEARNING */}
        <div className="flex items-center group cursor-pointer select-none">
          <div className="flex items-baseline italic">
            <span className="text-3xl font-black tracking-tighter text-[#1a73e8] group-hover:scale-105 transition-transform">E-</span>
            <span className="text-2xl font-extrabold tracking-[0.15em] bg-gradient-to-r from-[#1a73e8] to-blue-400 bg-clip-text text-transparent uppercase">
              Learning
            </span>
          </div>
          <div className="ml-1 h-2 w-2 rounded-full bg-orange-500 self-end mb-1.5 animate-pulse"></div>
        </div>

        {/* MENU LINK */}
        <ul className="hidden lg:flex items-center space-x-6 text-[14px] font-bold text-gray-700 uppercase tracking-tight">
          <li className="flex items-center gap-1.5 cursor-pointer hover:text-[#1a73e8] transition-colors">
            <Home size={16} /> Trang chủ
          </li>
          <li className="flex items-center gap-1.5 cursor-pointer hover:text-[#1a73e8] transition-colors">
            <Star size={16} /> KH mới
          </li>
          <li className="cursor-pointer hover:text-[#1a73e8] transition-colors">KH tặng kèm</li>
          <li className="flex items-center gap-1.5 cursor-pointer hover:text-[#1a73e8] transition-colors">
            <Globe size={16} /> Lộ trình
          </li>
          <li className="flex items-center gap-1.5 cursor-pointer hover:text-[#1a73e8] transition-colors group relative py-2">
            <Book size={16} /> Tài liệu <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
          </li>
          <li className="flex items-center gap-1.5 cursor-pointer hover:text-[#1a73e8] transition-colors">
            <BarChart3 size={16} /> CTV
          </li>
          <li className="flex items-center gap-1.5 cursor-pointer hover:text-[#1a73e8] transition-colors">
            <UserSquare2 size={16} /> ELEARINING
          </li>
        </ul>

        {/* CART */}
        <div className="relative group cursor-pointer p-2 hover:bg-orange-50 rounded-full transition-all">
          <ShoppingCart size={26} className="text-[#f39c12]" />
          <span className="absolute top-0 right-0 bg-[#333] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
            0
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
'use client'

import React from 'react';
import { 
  FacebookFilled, 
  InstagramOutlined, 
  YoutubeFilled, 
  TwitterOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';

const Footer = () => {
  const titleClass = "text-lg font-bold text-white mb-6 uppercase tracking-wider";
  const linkClass = "text-gray-400 hover:text-orange-500 transition-colors duration-300 block mb-3 text-sm";
  const iconClass = "text-xl text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer";

  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <a href="/" className="text-3xl font-black text-white flex items-center gap-2 mb-6">
              <span className="text-orange-500">MOVIE</span>STARS
            </a>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Nền tảng đặt vé xem phim trực tuyến hàng đầu Việt Nam. Mang đến cho bạn trải nghiệm điện ảnh tuyệt vời nhất với hàng ngàn bộ phim hot và rạp chiếu trên toàn quốc.
            </p>

            <div className="flex items-center gap-5">
              <FacebookFilled className={iconClass} />
              <InstagramOutlined className={iconClass} />
              <YoutubeFilled className={iconClass} />
              <TwitterOutlined className={iconClass} />
            </div>
          </div>

          <div>
            <h3 className={titleClass}>Khám Phá</h3>
            <ul>
              <li><a href="#" className={linkClass}>Phim Đang Chiếu</a></li>
              <li><a href="#" className={linkClass}>Phim Sắp Chiếu</a></li>
              <li><a href="#" className={linkClass}>Rạp Toàn Quốc</a></li>
              <li><a href="#" className={linkClass}>Khuyến Mãi Hot</a></li>
              <li><a href="#" className={linkClass}>Bảng Xếp Hạng</a></li>
            </ul>
          </div>

          <div>
            <h3 className={titleClass}>Hỗ Trợ</h3>
            <ul>
              <li><a href="#" className={linkClass}>FAQ - Câu Hỏi Thường Gặp</a></li>
              <li><a href="#" className={linkClass}>Chính Sách Thanh Toán</a></li>
              <li><a href="#" className={linkClass}>Điều Khoản Sử dụng</a></li>
              <li><a href="#" className={linkClass}>Chính Sách Bảo Mật</a></li>
              <li><a href="#" className={linkClass}>Khiếu Nại & Góp Ý</a></li>
            </ul>
          </div>

          <div>
            <h3 className={titleClass}>Liên Hệ</h3>
            <ul className="text-sm text-gray-400 space-y-4">
              <li className="flex items-start gap-3">
                <EnvironmentOutlined className="text-lg text-orange-500 mt-1" />
                <span>123 Đường ABC, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneOutlined className="text-lg text-orange-500" />
                <span>1900 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <MailOutlined className="text-lg text-orange-500" />
                <span>support@moviestars.vn</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Phần dưới: Dòng bản quyền */}
      <div className="bg-slate-900 border-t border-gray-800 py-6 mt-10">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} MOVIESTARS. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
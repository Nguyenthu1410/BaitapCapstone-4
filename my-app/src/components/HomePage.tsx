"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { PUBLIC_PATH } from "../constant/path";
import { useRouter } from "next/navigation";
import { useCourseList } from "../hook/useCourseList";

export default function HomePage() {
  const categoryVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const router = useRouter();
  const { categories } = useCourseList();
  const trendingCategories = categories?.slice(0, 6) || [];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans overflow-hidden relative">
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 hidden md:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 hidden md:block"
      />

      {/* SECTION 1: HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-28 pb-20 flex flex-col items-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 font-medium text-sm mb-8 border border-blue-200 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-ping"></span>
            Nền tảng học tập trực tuyến hàng đầu
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 mb-6"
          >
            Khám Phá Tri Thức <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Từ Các Chuyên Gia
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-lg md:text-xl text-slate-600 mb-10"
          >
            Nâng tầm kỹ năng của bạn với hơn{" "}
            <span className="font-bold text-blue-600">213K</span> khóa học video
            trực tuyến chất lượng cao được cập nhật mỗi tháng.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
          >
            <Link
              href={PUBLIC_PATH.COURSES}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300"
            >
              Khám phá khóa học 🚀
            </Link>
            <div className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all duration-300 cursor-pointer">
              Tham gia cộng đồng
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: STATS BANNER */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-[2rem] p-10 md:p-14 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-10 relative z-10">
            Phát triển kỹ năng với hơn{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 text-5xl">
              200+
            </span>{" "}
            khóa học <br className="hidden md:block" /> từ các trường đại học &
            tổ chức danh tiếng.
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-white/50 relative z-10">
            {["Harvard", "Stanford", "MIT", "Oxford"].map((uni, i) => (
              <motion.div
                key={uni}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="font-black text-2xl tracking-widest uppercase hover:text-white transition-colors cursor-default"
              >
                {uni}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: TRENDING COURSES */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col md:flex-row justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Khóa Học{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Nổi Bật
              </span>
            </h2>
            <p className="text-slate-500 mt-4 text-lg">
              Những khóa học được đăng ký nhiều nhất tuần qua.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Backend 54",
              maKhoaHoc: "123456736",
              image:
                "https://elearningnew.cybersoft.edu.vn/hinhanh/backend-54.jpg",
            },
            {
              title: "Test FrontEnd",
              maKhoaHoc: "1234567890123",
              image:
                "https://elearningnew.cybersoft.edu.vn/hinhanh/test-frontend.png",
            },
            {
              title: "Fullstack Web Development",
              maKhoaHoc: "13485",
              image:
                "https://elearningnew.cybersoft.edu.vn/hinhanh/fullstack-web-development_gp01.jpg",
            },
          ].map((course, idx) => (
            <motion.div
              variants={fadeUp}
              key={idx}
              className="bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)] hover:-translate-y-2 transition-all duration-300 border border-slate-100 group cursor-pointer"
            >
              <Link
                href={`/courseDetail/${course.maKhoaHoc}`}
                className="block h-48 rounded-2xl mb-6 relative overflow-hidden bg-slate-100"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </Link>

              <div className="px-2">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {course.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg">
                    24 Bài giảng
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg">
                    8 Giảng viên
                  </span>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center text-amber-400">
                    ★★★★★{" "}
                    <span className="text-slate-400 text-sm ml-2">(2,367)</span>
                  </div>

                  <Link
                    href={`/courseDetail/${course.maKhoaHoc}`}
                    className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 4: CATEGORIES */}
      <section className="py-24 relative z-10 bg-white/50 backdrop-blur-xl border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold mb-12 text-slate-900"
          >
            Danh Mục Thịnh Hành
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {/* RENDER DATA TỪ API */}
            {trendingCategories.map((cat, i) => (
              <motion.div
                variants={categoryVariants}
                key={i}
                className="h-full"
              >
                <div
                  onClick={() =>
                    router.push(`/courses?category=${cat.maDanhMuc}`)
                  }
                  className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full block relative z-50"
                >
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-slate-700 text-center">
                    {cat.tenDanhMuc}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: CTA / NEWSLETTER */}
      <section className="py-24 relative z-10 max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl shadow-indigo-500/20 relative overflow-hidden"
        >
          <div className="absolute top-[-50%] left-[-10%] w-[300px] h-[300px] border-[40px] border-white/10 rounded-full"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[400px] h-[400px] border-[40px] border-white/10 rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Bạn đã sẵn sàng để bắt đầu?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Đăng ký ngay hôm nay để nhận thông báo về các khóa học mới nhất và
              những ưu đãi độc quyền dành riêng cho bạn.
            </p>
            <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-1 px-6 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30 shadow-inner"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
              >
                Đăng ký ngay
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { PUBLIC_PATH } from '@/src/constant/path';

const ComingSoonPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-[#f4f7f9]">
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <h1 className="text-2xl font-black text-slate-800 uppercase">Nội dung đang cập nhật</h1>
        <p className="mt-3 text-sm text-gray-500">
          Mục này sẽ sớm được hoàn thiện. Bạn có thể quay lại trang chủ để tiếp tục xem khóa học.
        </p>
        <Link
          href={PUBLIC_PATH.COURSES}
          className="mt-6 inline-flex rounded-full bg-[#1a73e8] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          Quay về trang chủ
        </Link>
      </div>
    </section>
  );
};

export default ComingSoonPage;

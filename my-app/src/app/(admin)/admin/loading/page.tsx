"use client";

import React from "react";
import { Spin } from "antd";

export default function AdminLoading() {
  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-xl">
      <Spin size="large" className="scale-125" />
      
      <p className="text-gray-400 text-sm font-semibold tracking-wide animate-pulse mt-2">
        Đang tải dữ liệu hệ thống, vui lòng đợi...
      </p>
    </div>
  );
}
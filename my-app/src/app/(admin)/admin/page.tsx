"use client";

import React from "react";
import { Progress, Table, Button } from "antd";
import { 
  ShoppingCart, 
  Users, 
  BookOpen, 
  CircleDollarSign,
  Edit,
  Eye,
  Trash2
} from "lucide-react";

export default function DashboardPage() {
  // Cột cho bảng Members (Hiện tại data = 0 nên sẽ hiển thị "No Data" rất gọn gàng)
  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    { title: "Công ty", dataIndex: "company", key: "company" },
    { title: "Quốc gia", dataIndex: "country", key: "country" },
    {
      title: "Hành động",
      key: "actions",
      render: () => (
        <div className="flex gap-2">
          <Edit size={16} className="text-blue-500 cursor-pointer" />
          <Eye size={16} className="text-gray-500 cursor-pointer" />
          <Trash2 size={16} className="text-red-500 cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6 bg-[#f5f7fa] min-h-full">
      
      {/* HÀNG 1: 4 THẺ THỐNG KÊ (Set = 0) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Thẻ Sales */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Doanh số</p>
            <h3 className="text-2xl font-bold text-blue-500">0</h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <ShoppingCart size={24} className="text-blue-500" />
          </div>
        </div>

        {/* Thẻ Users */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Người dùng</p>
            <h3 className="text-2xl font-bold text-purple-500">0</h3>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <Users size={24} className="text-purple-500" />
          </div>
        </div>

        {/* Thẻ Courses (Thay cho Products) */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Khóa học</p>
            <h3 className="text-2xl font-bold text-yellow-500">0</h3>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <BookOpen size={24} className="text-yellow-500" />
          </div>
        </div>

        {/* Thẻ Revenue */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Doanh thu</p>
            <h3 className="text-2xl font-bold text-pink-500">$0</h3>
          </div>
          <div className="bg-pink-50 p-3 rounded-lg">
            <CircleDollarSign size={24} className="text-pink-500" />
          </div>
        </div>
      </div>

      {/* HÀNG 2: MỤC TIÊU & BẢNG THÀNH VIÊN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Goal Overview (Chiếm 1 cột) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Goal Overview</h3>
          <div className="flex-1 flex justify-center items-center">
            <Progress 
              type="dashboard" 
              percent={0} 
              strokeColor="#3b82f6" 
              size={180}
            />
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-4 mt-6">
            <div className="text-center">
              <h4 className="text-lg font-bold text-gray-800">0</h4>
              <p className="text-xs text-gray-400 uppercase">Hoàn thành</p>
            </div>
            <div className="text-center border-l border-gray-100 pl-8">
              <h4 className="text-lg font-bold text-gray-800">0</h4>
              <p className="text-xs text-gray-400 uppercase">Đang tiến hành</p>
            </div>
          </div>
        </div>

        {/* Members Table (Chiếm 2 cột) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Thành viên</h3>
              <p className="text-sm text-gray-400">Danh sách học viên mới</p>
            </div>
            <div className="flex gap-2">
              <Button type="primary" className="bg-blue-600">Edit</Button>
              <Button>Filter</Button>
            </div>
          </div>
          {/* Truyền mảng rỗng [] vào data để hiển thị trống */}
          <Table 
            columns={columns} 
            dataSource={[]} 
            pagination={false} 
            className="border border-gray-100 rounded-lg overflow-hidden"
          />
        </div>
      </div>

      {/* HÀNG 3: ĐƠN HÀNG, THU NHẬP & BIỂU ĐỒ NGƯỜI DÙNG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cột 1: Gồm 2 thẻ Orders và Earnings xếp chồng lên nhau */}
        <div className="flex flex-col gap-6">
          {/* Thẻ Orders */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">Đơn hàng</h3>
            <p className="text-sm text-gray-400 mb-4">Tháng này</p>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold">0</h2>
              <span className="bg-red-100 text-red-500 px-2 py-1 rounded text-xs font-bold">0%</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Đã đạt</span>
              <span>Mục tiêu: 2200</span>
            </div>
            <Progress percent={0} showInfo={false} strokeColor="#10b981" />
          </div>

          {/* Thẻ Earnings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Thu nhập</h3>
              <p className="text-sm text-gray-400 mb-4">Tháng này</p>
              <h2 className="text-2xl font-bold mb-2">$0</h2>
              <p className="text-xs text-gray-400">0% so với tháng trước</p>
            </div>
            <Progress type="circle" percent={0} size={80} strokeColor="#06b6d4" />
          </div>
        </div>

        {/* Cột 2 & 3: Biểu đồ Users */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Người dùng</h3>
              <p className="text-sm text-gray-400">Khách hàng mới tháng này</p>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">0</h2>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-bold">0%</span>
            </div>
          </div>
          
          {/* Vẽ các cột biểu đồ giả (dạng mờ) để giữ khung giao diện */}
          <div className="flex-1 flex items-end justify-between gap-2 mt-4 pt-4 border-t border-gray-50">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div 
                key={item} 
                className="w-full bg-blue-50 rounded-t-md relative group hover:bg-blue-100 transition-colors"
                style={{ height: '5%' }} // Mức 0% nên chỉ để một vệt mờ 5% cho có khung
              >
                 <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">0</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
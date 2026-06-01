"use client";

import React from "react";
import { Progress, Table, Button, Tag, Avatar } from "antd";
import {
  ShoppingCart,
  Users,
  BookOpen,
  Edit,
  Eye,
  Trash2,
  Clock,
} from "lucide-react";
import { useDashboardAdmin } from "@/src/hook/admin/useDashboardAdmin";

export default function DashboardPage() {
  const { stats, loading } = useDashboardAdmin();

  const columns = [
    {
      title: "Học viên",
      dataIndex: "user",
      key: "user",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={
              record.avatar ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=" + record.name
            }
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 text-sm">
              {record.name}
            </span>
            <span className="text-gray-500 text-xs">{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Khóa học",
      dataIndex: "course",
      key: "course",
      render: (course: string) => (
        <span className="text-gray-600 font-medium">
          {course || "Chưa đăng ký"}
        </span>
      ),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (date: string) => <span className="text-gray-500">{date}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={status === "active" ? "success" : "default"}
          className="rounded-full px-3 font-medium"
        >
          {status === "active" ? "Đang học" : "Chờ duyệt"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      align: "right" as const,
      render: () => (
        <div className="flex gap-3 justify-end">
          <Edit
            size={16}
            className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
          />
          <Eye
            size={16}
            className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
          />
          <Trash2
            size={16}
            className="text-red-500 cursor-pointer hover:text-red-700 transition"
          />
        </div>
      ),
    },
  ];

  const recentUsersData = [
    {
      key: "1",
      name: "Ngọc Anh Thư",
      email: "thu@gmail.com",
      course: "React Next.js",
      joinDate: "28/05/2026",
      status: "active",
    },
    {
      key: "2",
      name: "Thanh Thảo",
      email: "thao@gmail.com",
      course: "NodeJS Backend",
      joinDate: "27/05/2026",
      status: "pending",
    },
    {
      key: "3",
      name: "Trần Văn A",
      email: "tranvana@gmail.com",
      course: "Thiết kế UI/UX",
      joinDate: "25/05/2026",
      status: "active",
    },
    {
      key: "4",
      name: "Lê Hoàng B",
      email: "hoangb@gmail.com",
      course: "Fullstack Developer",
      joinDate: "24/05/2026",
      status: "active",
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6 bg-[#f5f7fa] min-h-full">
      {/* HÀNG 1: 4 THẺ THỐNG KÊ GẮN API THỰC */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Thẻ 1: Tổng học viên */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Tổng học viên
            </p>
            <h3 className="text-2xl font-bold text-blue-600">
              {loading ? "..." : stats.tongHocVien}
            </h3>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <Users size={24} className="text-blue-600" />
          </div>
        </div>

        {/* Thẻ 2: Lượt đăng ký mới */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Lượt đăng ký mới
            </p>
            <h3 className="text-2xl font-bold text-green-600">
              {stats.luotDangKyMoi}
            </h3>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <ShoppingCart size={24} className="text-green-600" />
          </div>
        </div>

        {/* Thẻ 3: Khóa học hiện có */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Khóa học hiện có
            </p>
            <h3 className="text-2xl font-bold text-yellow-600">
              {loading ? "..." : stats.khoaHocHienCo}
            </h3>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <BookOpen size={24} className="text-yellow-600" />
          </div>
        </div>

        {/* Thẻ 4: Yêu cầu chờ duyệt */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">
              Yêu cầu chờ duyệt
            </p>
            <h3 className="text-2xl font-bold text-amber-600">
              {stats.yeuCauChoDuyet}
            </h3>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg">
            <Clock size={24} className="text-amber-600" />
          </div>
        </div>
      </div>

      {/* HÀNG 2: MỤC TIÊU & BẢNG THÀNH VIÊN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goal Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Goal Overview
          </h3>
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

        {/* Members Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Học viên mới</h3>
              <p className="text-sm text-gray-400">
                Danh sách học viên vừa đăng ký tham gia
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="primary" className="bg-blue-600">
                Quản lý
              </Button>
              <Button>Bộ lọc</Button>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={recentUsersData}
            pagination={{ pageSize: 4, hideOnSinglePage: true }}
            className="border border-gray-100 rounded-lg overflow-hidden [&_.ant-table-thead_th]:bg-gray-50 [&_.ant-table-thead_th]:text-gray-500 [&_.ant-table-thead_th]:font-semibold [&_.ant-table-thead_th]:text-xs [&_.ant-table-thead_th]:uppercase"
          />
        </div>
      </div>

      {/* HÀNG 3: ĐƠN HÀNG, THU NHẬP & BIỂU ĐỒ NGƯỜI DÙNG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột 1: Thẻ Orders và Earnings */}
        <div className="flex flex-col gap-6">
          {/* Thẻ Lượt xem toàn hệ thống */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">
              Tương tác hệ thống
            </h3>
            <p className="text-sm text-gray-400 mb-4">Tổng lượt xem khóa học</p>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-blue-600">
                {loading ? "..." : stats.tongLuotXem.toLocaleString()}
              </h2>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                <Eye size={12} /> Views
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Độ sôi động</span>
              <span>Rất tốt</span>
            </div>
            <Progress
              percent={100}
              showInfo={false}
              strokeColor="#3b82f6"
              status="active"
            />
          </div>

          {/* Thẻ Phân bố người dùng (Tỉ lệ Học viên) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Phân bố</h3>
              <p className="text-sm text-gray-400 mb-4">Học viên / Hệ thống</p>
              <h2 className="text-2xl font-bold mb-1">
                {loading ? "..." : stats.tongHocVien}{" "}
                <span className="text-sm text-gray-500 font-normal">HV</span>
              </h2>
              <p className="text-xs text-gray-400">
                {loading ? "..." : stats.tongGiaoVu} Quản trị viên (GV)
              </p>
            </div>

            {/* Biểu đồ tròn tính tỉ lệ phần trăm Học viên */}
            <Progress
              type="circle"
              percent={
                stats.tongHocVien + stats.tongGiaoVu === 0
                  ? 0
                  : Math.round(
                      (stats.tongHocVien /
                        (stats.tongHocVien + stats.tongGiaoVu)) *
                        100,
                    )
              }
              size={80}
              strokeColor="#8b5cf6"
              format={(percent) => (
                <span className="text-sm font-bold text-gray-700">
                  {percent}%
                </span>
              )}
            />
          </div>
        </div>

        {/* Biểu đồ Users */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Người dùng</h3>
              <p className="text-sm text-gray-400">Khách hàng mới tháng này</p>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">0</h2>
              <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-bold">
                0%
              </span>
            </div>
          </div>

          {/* THÊM NGƯỜI DÙNG */}
          <div className="flex-1 flex flex-col items-center justify-center mt-2 pt-8 border-t border-gray-50 pb-4">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>

            <h3 className="text-base font-medium text-gray-700">
              Chưa có người dùng mới
            </h3>
            <p className="text-sm text-gray-400 mt-1 text-center max-w-sm">
              Biểu đồ thống kê sẽ xuất hiện tại đây khi có thành viên mới đăng
              ký trong tháng này.
            </p>

            <button className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
              Thêm người dùng thủ công
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Table, Input, Button, Tag, Space } from "antd";
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";

export default function UserManagement() {
  const columns = [
    { title: "Tài khoản", dataIndex: "taiKhoan", key: "taiKhoan" },
    { title: "Họ tên", dataIndex: "hoTen", key: "hoTen" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "soDt", key: "soDt" },
    { 
      title: "Loại người dùng", 
      dataIndex: "maLoaiNguoiDung", 
      key: "maLoaiNguoiDung",
      render: (text: string) => (
        <Tag color={text === "GV" ? "volcano" : "green"}>
          {text === "GV" ? "Giáo vụ" : "Học viên"}
        </Tag>
      )
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<Edit size={16} className="text-blue-500" />} />
          <Button type="text" icon={<Trash2 size={16} className="text-red-500" />} />
        </Space>
      ),
    },
  ];

  const data = [
    { key: "1", taiKhoan: "admin123", hoTen: "Nguyễn Thu", email: "thu@gmail.com", soDt: "0901234567", maLoaiNguoiDung: "GV" },
    { key: "2", taiKhoan: "student01", hoTen: "Trần Văn A", email: "vana@gmail.com", soDt: "0908888999", maLoaiNguoiDung: "HV" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Quản lý người dùng</h2>
        <Button 
          type="primary" 
          icon={<UserPlus size={18} />} 
          className="flex items-center gap-2 h-10 bg-blue-600"
        >
          Thêm người dùng
        </Button>
      </div>

      <div className="mb-6 max-w-md">
        <Input 
          prefix={<Search size={18} className="text-gray-400 mr-2" />} 
          placeholder="Tìm kiếm người dùng..." 
          className="h-10 rounded-md"
        />
      </div>

      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
}
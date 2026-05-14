"use client";

import React from "react";
import { Table, Tag, Space, Button, Input } from "antd";
import { Edit3, Trash2, UserPlus, Search } from "lucide-react";

export default function AdminUsersPage() {
  const columns = [
    { title: 'Tài khoản', dataIndex: 'username', key: 'username', className: 'font-medium' },
    { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { 
      title: 'Vai trò', 
      dataIndex: 'role', 
      key: 'role', 
      render: (role: string) => (
        <Tag color={role === 'GV' ? 'blue' : 'green'} className="rounded-full px-3">
          {role === 'GV' ? 'Giáo vụ' : 'Học viên'}
        </Tag>
      )
    },
    { 
      title: 'Thao tác', 
      key: 'action', 
      render: () => (
        <Space size="small">
          <Button type="text" className="text-blue-500 hover:bg-blue-50 rounded-lg p-2"><Edit3 size={16} /></Button>
          <Button type="text" className="text-red-500 hover:bg-red-50 rounded-lg p-2"><Trash2 size={16} /></Button>
        </Space>
      )
    },
  ];

  const data = [
    { key: '1', username: 'nguyenthu1410', fullName: 'Ngọc Anh Thư', email: 'thu@gmail.com', phone: '0901234567', role: 'GV' },
    { key: '2', username: 'van_a_99', fullName: 'Nguyễn Văn A', email: 'vana@gmail.com', phone: '0988777666', role: 'HV' },
    { key: '3', username: 'thi_b_2k', fullName: 'Lê Thị B', email: 'thib@gmail.com', phone: '0912333444', role: 'HV' },
  ];

  return (
    <div className="p-8">
      {/* Tiêu đề và nút thêm */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Quản lý người dùng</h1>
        <Button 
          type="primary" 
          icon={<UserPlus size={18} />} 
          className="bg-blue-600 hover:bg-blue-700 h-11 px-6 rounded-xl flex items-center gap-2 shadow-md shadow-blue-100 border-none transition-all"
        >
            Thêm người dùng
        </Button>
      </div>

      {/* Thanh tìm kiếm nội dung */}
      <div className="mb-8 max-w-md">
        <Input 
          placeholder="Tìm kiếm tài khoản hoặc họ tên..." 
          prefix={<Search size={18} className="text-gray-400 mr-2" />}
          className="h-11 rounded-xl border-gray-200 shadow-sm focus:border-blue-400"
        />
      </div>

      {/* Bảng dữ liệu Ant Design */}
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={{ pageSize: 5 }}
        className="border border-gray-50 rounded-xl overflow-hidden"
      />
    </div>
  );
}
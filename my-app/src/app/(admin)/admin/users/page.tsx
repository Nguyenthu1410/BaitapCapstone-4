"use client";

import React, { useState } from "react";
import { Table, Button, Input, Tag, Space, Avatar, Tooltip } from "antd";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  UserCog, 
  Mail,
  ShieldAlert
} from "lucide-react";

// Dữ liệu mẫu (Mock Data)
const mockUsers = [
  {
    key: "1",
    name: "Nguyễn Anh Thư",
    email: "anhthu@example.com",
    role: "Quản trị viên",
    status: "active",
    avatar: "T",
  },
  {
    key: "2",
    name: "Trần Văn A",
    email: "tranvana@example.com",
    role: "Học viên",
    status: "active",
    avatar: "A",
  },
  {
    key: "3",
    name: "Lê Thị B",
    email: "lethib@example.com",
    role: "Giảng viên",
    status: "inactive",
    avatar: "B",
  },
  {
    key: "4",
    name: "Phạm Văn C",
    email: "phamvanc@example.com",
    role: "Học viên",
    status: "active",
    avatar: "C",
  },
];

export default function UserManagementPage() {
  const [searchText, setSearchText] = useState("");

  // Định nghĩa các cột cho bảng
  const columns = [
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="bg-blue-500 text-white font-semibold">
            {record.avatar}
          </Avatar>
          <div>
            <div className="font-semibold text-gray-800">{text}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <Mail size={12} />
              {record.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        let color = "blue";
        if (role === "Quản trị viên") color = "volcano";
        if (role === "Giảng viên") color = "purple";
        return (
          <Tag color={color} className="rounded-md px-2 py-1 border-transparent font-medium">
            {role}
          </Tag>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag 
          color={status === "active" ? "success" : "error"}
          className="rounded-full px-3"
        >
          {status === "active" ? "Hoạt động" : "Đã khóa"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: () => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<Edit size={18} className="text-blue-500" />} 
              className="hover:bg-blue-50 flex items-center justify-center"
            />
          </Tooltip>
          <Tooltip title="Phân quyền">
            <Button 
              type="text" 
              icon={<ShieldAlert size={18} className="text-orange-500" />} 
              className="hover:bg-orange-50 flex items-center justify-center"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button 
              type="text" 
              danger 
              icon={<Trash2 size={18} />} 
              className="hover:bg-red-50 flex items-center justify-center"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6 bg-[#f5f7fa] min-h-full">
      {/* Tiêu đề trang */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <UserCog size={24} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 m-0">Quản lý người dùng</h1>
          <p className="text-gray-500 text-sm mt-1">Xem, thêm, sửa, xóa thông tin và phân quyền người dùng.</p>
        </div>
      </div>

      {/* Khu vực bảng dữ liệu */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Thanh công cụ (Toolbar) */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Input
            placeholder="Tìm kiếm theo tên, email..."
            prefix={<Search size={16} className="text-gray-400" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:max-w-xs rounded-lg hover:border-blue-400 focus:border-blue-500"
            size="large"
          />
          <Button 
            type="primary" 
            size="large"
            icon={<Plus size={18} />} 
            className="bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center w-full sm:w-auto"
          >
            Thêm người dùng
          </Button>
        </div>

        {/* Bảng (Table) */}
        <div className="p-5">
          <Table 
            columns={columns} 
            dataSource={mockUsers} 
            pagination={{ 
              pageSize: 5,
              showSizeChanger: true,
              showTotal: (total) => `Tổng số ${total} người dùng`
            }} 
            className="border border-gray-100 rounded-lg overflow-hidden [&_.ant-table-thead_th]:bg-gray-50 [&_.ant-table-thead_th]:text-gray-600 [&_.ant-table-thead_th]:font-semibold"
          />
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Table, Button, Input, Tag, Space, Image, Tooltip, Badge } from "antd";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  BookOpen, 
  Layers,
  Users,
  Eye,
  MoreVertical
} from "lucide-react";

// Dữ liệu mẫu (Mock Data)
const mockCourses = [
  {
    key: "1",
    name: "Lập trình React Next.js cơ bản",
    image: "https://picsum.photos/id/1/200/120",
    category: "Front-end",
    instructor: "Nguyễn Anh Thư",
    students: 120,
    price: "1.200.000đ",
    status: "published",
  },
  {
    key: "2",
    name: "Thiết kế UI/UX chuyên sâu",
    image: "https://picsum.photos/id/2/200/120",
    category: "Design",
    instructor: "Trần Văn A",
    students: 85,
    price: "850.000đ",
    status: "draft",
  },
  {
    key: "3",
    name: "Node.js & MongoDB - Backend Master",
    image: "https://picsum.photos/id/3/200/120",
    category: "Back-end",
    instructor: "Lê Thị B",
    students: 210,
    price: "1.500.000đ",
    status: "published",
  },
];

export default function CourseManagementPage() {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "Khóa học",
      dataIndex: "name",
      key: "name",
      width: 400,
      render: (text: string, record: any) => (
        <div className="flex gap-4 items-start">
          <Image
            src={record.image}
            alt={text}
            width={100}
            className="rounded-lg object-cover border border-gray-100"
            fallback="https://placehold.co/100x60?text=No+Image"
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-800 text-[15px] leading-tight">{text}</span>
            <div className="flex items-center gap-2 mt-1">
              <Tag className="m-0 text-[11px] font-medium border-none bg-gray-100 text-gray-600">
                {record.category}
              </Tag>
              <span className="text-gray-400 text-xs">|</span>
              <span className="text-xs text-gray-500">GV: {record.instructor}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Học viên",
      dataIndex: "students",
      key: "students",
      align: 'center' as const,
      render: (count: number) => (
        <div className="flex items-center justify-center gap-1.5 text-gray-600">
          <Users size={14} />
          <span className="font-medium">{count}</span>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: string) => <span className="font-semibold text-blue-600">{price}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge 
          status={status === "published" ? "success" : "default"} 
          text={status === "published" ? "Đang bán" : "Bản nháp"} 
          className="font-medium"
        />
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      align: 'right' as const,
      render: () => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button type="text" icon={<Eye size={18} className="text-gray-400" />} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button type="text" icon={<Edit size={18} className="text-blue-500" />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button type="text" danger icon={<Trash2 size={18} />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6 bg-[#f5f7fa] min-h-full">
      {/* Tiêu đề & Nút thêm mới */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2.5 rounded-xl shadow-sm">
            <BookOpen size={24} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 m-0">Quản lý khóa học</h1>
            <p className="text-gray-500 text-sm">Quản lý nội dung, học viên và doanh thu khóa học.</p>
          </div>
        </div>
        <Button 
          type="primary" 
          size="large" 
          icon={<Plus size={18} />}
          className="bg-blue-600 hover:bg-blue-700 h-11 px-6 rounded-xl font-semibold shadow-md flex items-center"
        >
          Tạo khóa học mới
        </Button>
      </div>

      {/* Thẻ chứa bảng dữ liệu */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Bộ lọc & Tìm kiếm */}
        <div className="p-5 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Input
              placeholder="Tìm tên khóa học..."
              prefix={<Search size={18} className="text-gray-400 mr-2" />}
              className="w-full sm:w-80 h-10 rounded-xl bg-gray-50 border-none focus:bg-white focus:ring-1 focus:ring-blue-100 transition-all"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button icon={<Layers size={18} />} className="h-10 rounded-xl flex items-center gap-2 border-gray-200 text-gray-600">
              Bộ lọc
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            Hiển thị 1 - 10 trong tổng số {mockCourses.length} khóa học
          </div>
        </div>

        {/* Bảng */}
        <div className="p-2">
          <Table 
            columns={columns} 
            dataSource={mockCourses} 
            pagination={{
              pageSize: 5,
              position: ['bottomCenter'],
              className: "py-4"
            }}
            className="[&_.ant-table-thead_th]:bg-transparent [&_.ant-table-thead_th]:text-gray-400 [&_.ant-table-thead_th]:font-normal [&_.ant-table-thead_th]:text-xs [&_.ant-table-thead_th]:uppercase [&_.ant-table-thead_th]:tracking-wider"
          />
        </div>
      </div>
    </div>
  );
}
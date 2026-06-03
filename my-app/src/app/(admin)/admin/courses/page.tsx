"use client";

import React from "react";
import { Table, Button, Input, Tag, Space, Image, Tooltip, Select, Modal } from "antd";
import { Search, Plus, Edit, Trash2, BookOpen, Users } from "lucide-react";
import { Course } from "@/src/types/course";
import { useAdminCourses } from "@/src/hook/admin/useAdminCourse";
import AddCourseModal from "./components/AddCourseModal";
import EditCourseModal from "./components/EditCourseModal";

export default function CourseManagementPage() {
  const {
    searchText, setSearchText, categories, selectedCategory, setSelectedCategory, loading, filteredCourses,
    isAddModalOpen, setIsAddModalOpen, isSubmitting, handleAddCourse,
    isEditModalOpen, setIsEditModalOpen, isUpdating, editingCourse, setEditingCourse, handleUpdateCourse, 
    handleDeleteCourse,
  } = useAdminCourses();

// CẤU HÌNH CÁC CỘT CỦA BẢNG
  const columns = [
    {
      title: "Khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      width: 400,
      render: (text: string, record: Course) => (
        <div className="flex gap-4 items-start">
          <Image
            src={record.hinhAnh} alt={text} width={100}
            className="rounded-lg object-cover border border-gray-100"
            fallback="https://placehold.co/100x60?text=No+Image"
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-800 text-[15px] leading-tight">{text}</span>
            <div className="flex items-center gap-2 mt-1">
              <Tag className="m-0 text-[11px] font-medium border-none bg-gray-100 text-gray-600">
                {record.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "Khác"}
              </Tag>
              <span className="text-gray-400 text-xs">|</span>
              <span className="text-xs text-gray-500">GV: {record.nguoiTao?.hoTen || "Ẩn danh"}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Học viên",
      dataIndex: "soLuongHocVien",
      key: "soLuongHocVien",
      align: "center" as const,
      render: (count: number) => (
        <div className="flex items-center justify-center gap-1.5 text-gray-600">
          <Users size={14} />
          <span className="font-medium">{count || 0}</span>
        </div>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "luotXem",
      key: "luotXem",
      render: (views: string | number) => <span className="font-semibold text-blue-600">{views || 0}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      render: (date: string) => <span className="font-medium text-gray-500">{date}</span>,
    },
    {
      title: "Hành động",
      key: "actions",
      align: "right" as const,
      render: (text: string, record: Course) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<Edit size={18} className="text-blue-500" />}
              onClick={() => {
                setEditingCourse(record);
                setIsEditModalOpen(true);
              }}
            />
          </Tooltip>

          <Tooltip title="Xóa">
            <Button 
              type="text" 
              danger 
              icon={<Trash2 size={18} />} 
              onClick={() => {
                // Hiển thị hộp thoại cảnh báo trước khi xóa
                Modal.confirm({
                  title: 'Xác nhận xóa khóa học',
                  content: `Bạn có chắc chắn muốn xóa khóa học "${record.tenKhoaHoc}" không? Hành động này không thể hoàn tác.`,
                  okText: 'Đồng ý xóa',
                  okType: 'danger',
                  cancelText: 'Hủy',
                  onOk: async () => {
                    await handleDeleteCourse(record.maKhoaHoc);
                  }
                });
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

 // GIAO DIỆN CHÍNH
  return (
    <div className="p-6 flex flex-col gap-6 bg-[#f5f7fa] min-h-full">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2.5 rounded-xl shadow-sm">
            <BookOpen size={24} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 m-0">Quản lý khóa học</h1>
            <p className="text-gray-500 text-sm">Quản lý nội dung, danh sách và theo dõi khóa học.</p>
          </div>
        </div>
        <Button
          type="primary" size="large" icon={<Plus size={18} />}
          className="bg-blue-600 hover:bg-blue-700 h-11 px-6 rounded-xl font-semibold shadow-md flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          Thêm khóa học
        </Button>
      </div>

      {/* FILTER & BẢNG DỮ LIỆU */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Input
              placeholder="Tìm tên khóa học..."
              prefix={<Search size={18} className="text-gray-400 mr-2" />}
              className="w-full sm:w-80 h-10 rounded-xl bg-gray-50 border-none focus:bg-white focus:ring-1 focus:ring-blue-100 transition-all"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Select
              placeholder="Lọc theo danh mục"
              allowClear
              className="w-full sm:w-56 h-10 rounded-xl [&_.ant-select-selector]:bg-gray-50! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:rounded-xl! [&_.ant-select-selector]:h-10! [&_.ant-select-selection-item]:leading-10! [&_.ant-select-selection-placeholder]:leading-10!"
              value={selectedCategory || "all"}
              onChange={(value) => setSelectedCategory(value === "all" ? null : value)}
              options={[{ value: "all", label: "Tất cả danh mục" }, ...categories.map((cat) => ({ value: String(cat.maDanhMuc), label: cat.tenDanhMuc }))]}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            Tổng cộng: <strong className="text-gray-800">{filteredCourses.length}</strong> khóa học
          </div>
        </div>

        <div className="p-2">
          <Table
            columns={columns}
            dataSource={filteredCourses}
            rowKey="maKhoaHoc"
            loading={loading}
            pagination={{ pageSize: 6, placement: ["bottomCenter"], className: "py-4", showSizeChanger: false }}
            className="[&_.ant-table-thead_th]:bg-transparent [&_.ant-table-thead_th]:text-gray-400 [&_.ant-table-thead_th]:font-normal [&_.ant-table-thead_th]:text-xs [&_.ant-table-thead_th]:uppercase [&_.ant-table-thead_th]:tracking-wider"
          />
        </div>
      </div>

      {/* NHÚNG 2 COMPONENT MODAL VÀO ĐÂY BẰNG PROPS */}
      <AddCourseModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        isSubmitting={isSubmitting} 
        onAdd={handleAddCourse} 
        categories={categories} 
      />

      <EditCourseModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCourse(null);
        }} 
        isUpdating={isUpdating} 
        onEdit={handleUpdateCourse} 
        categories={categories} 
        editingCourse={editingCourse} 
      />
    </div>
  );
}
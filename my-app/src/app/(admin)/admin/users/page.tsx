"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, Input, Tag, Space, Avatar, Tooltip, Popconfirm, Select } from "antd";
import { Search, Plus, Edit, Trash2, UserCog, Mail, ShieldAlert, Filter } from "lucide-react";
import AddUserModal from "./components/AddUserModal"; 
import EditUserModal from "./components/EditUserModal"; 
import { useAdminUser } from "@/src/hook/admin/useAdminUsers";

export default function UserManagementPage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  const [inputValue, setInputValue] = useState("");
  
  // STATE MỚI: Dành cho bộ lọc danh mục (Tất cả / Học viên / Giáo vụ)
  const [roleFilter, setRoleFilter] = useState("ALL");
  
  const { 
    users, 
    userTypes, 
    isLoading, 
    page,
    pageSize,
    totalCount,
    setPage,
    setPageSize,
    setSearchKeyword,
    handleAddUser, 
    handleDeleteUser, 
    handleUpdateUser 
  } = useAdminUser(); 

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchKeyword(inputValue);
      setPage(1); 
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, setSearchKeyword, setPage]);

  // LOGIC LỌC DANH MỤC: Chặn dữ liệu trước khi đưa vào bảng
  const displayUsers = users.filter((user) => {
    if (roleFilter === "ALL") return true; // Nếu chọn "Tất cả" thì giữ nguyên
    return user.maLoaiNguoiDung === roleFilter; // Nếu chọn HV/GV thì chỉ lấy đúng loại đó
  });

  const columns = [
    {
      title: "Người dùng",
      key: "user",
      render: (text: string, record: any) => {
        const initial = record.hoTen ? record.hoTen.charAt(0).toUpperCase() : "U";
        return (
          <div className="flex items-center gap-3">
            <Avatar className="bg-blue-500 text-white font-semibold">
              {initial}
            </Avatar>
            <div>
              <div className="font-semibold text-gray-800">{record.hoTen}</div>
              <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                <Mail size={12} />
                {record.email}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text: string) => <span className="font-medium text-gray-600">{text}</span>
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT", 
      key: "soDT",
    },
    {
      title: "Vai trò",
      dataIndex: "maLoaiNguoiDung",
      key: "role",
      render: (role: string) => {
        const isGV = role === "GV";
        return (
          <Tag color={isGV ? "volcano" : "blue"} className="rounded-md px-2 py-1 border-transparent font-medium">
            {isGV ? "Giáo vụ" : "Học viên"}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      align: "right" as const,
      render: (text: string, record: any) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<Edit size={18} className="text-blue-500" />} 
              className="hover:bg-blue-50 flex items-center justify-center"
              onClick={() => {
                setEditingUser(record); 
                setIsEditModalVisible(true); 
              }}
            />
          </Tooltip>

          <Tooltip title="Ghi danh khóa học">
            <Button type="text" icon={<ShieldAlert size={18} className="text-orange-500" />} className="hover:bg-orange-50 flex items-center justify-center"/>
          </Tooltip>
          
          <Popconfirm
            title="Xóa tài khoản này?"
            description={`Bạn có chắc muốn xóa tài khoản "${record.taiKhoan}" không?`}
            onConfirm={() => handleDeleteUser(record.taiKhoan)} 
            okText="Xóa luôn"
            cancelText="Hủy"
            okButtonProps={{ danger: true }} 
          >
            <Tooltip title="Xóa">
              <Button type="text" danger icon={<Trash2 size={18} />} className="hover:bg-red-50 flex items-center justify-center"/>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6 bg-[#f5f7fa] min-h-full">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <UserCog size={24} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 m-0">Quản lý người dùng</h1>
          <p className="text-gray-500 text-sm mt-1">Xem, thêm, sửa, xóa thông tin và phân quyền người dùng.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 flex-1">
            {/* 1. Ô TÌM KIẾM */}
            <Input
              placeholder="Gõ tên hoặc tài khoản để tìm ngay..."
              prefix={<Search size={16} className="text-gray-400" />}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              allowClear
              size="large"
              className="w-full sm:max-w-xs hover:border-blue-400 focus:border-blue-500 rounded-lg"
            />

            {/* 2. BỘ LỌC DANH MỤC (HV/GV) */}
            <Select
              size="large"
              value={roleFilter}
              onChange={(value) => setRoleFilter(value)}
              className="w-full sm:w-48"
              options={[
                { value: "ALL", label: <span className="flex items-center gap-2"><Filter size={16}/> Tất cả vai trò</span> },
                { value: "HV", label: "Chỉ Học viên" },
                { value: "GV", label: "Chỉ Giáo vụ" },
              ]}
            />
          </div>

          {/* 3. NÚT THÊM NGƯỜI DÙNG */}
          <Button 
            type="primary" 
            size="large"
            icon={<Plus size={18} />} 
            className="bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center w-full sm:w-auto"
            onClick={() => setIsAddModalVisible(true)}
          >
            Thêm người dùng
          </Button>
        </div>

        <div className="p-5">
          <Table 
            columns={columns} 
            dataSource={displayUsers} // ĐÃ THAY BẰNG DỮ LIỆU ĐÃ LỌC
            loading={isLoading} 
            rowKey="taiKhoan" 
            pagination={{ 
              current: page,
              pageSize: pageSize,
              total: totalCount,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
              onChange: (current, size) => {
                setPage(current);
                setPageSize(size);
              },
              showTotal: (total) => `Tổng số ${total} kết quả`
            }} 
            className="border border-gray-100 rounded-lg overflow-hidden [&_.ant-table-thead_th]:bg-gray-50 [&_.ant-table-thead_th]:text-gray-600 [&_.ant-table-thead_th]:font-semibold"
          />
        </div>
      </div>

      <AddUserModal 
        isOpen={isAddModalVisible} 
        onClose={() => setIsAddModalVisible(false)}
        isSubmitting={isLoading}
        onAdd={handleAddUser}
        userTypes={userTypes}
      />

      <EditUserModal
        isOpen={isEditModalVisible}
        onClose={() => {
          setIsEditModalVisible(false);
          setEditingUser(null);
        }}
        isSubmitting={isLoading}
        onUpdate={handleUpdateUser}
        userTypes={userTypes}
        editingUser={editingUser}
      />
    </div>
  );
}
"use client";

import React, { useEffect } from "react";
import { Modal, Select, Button, Alert, Table, Space, Tooltip, Divider } from "antd";
import { Users, Check, X, Trash2, Clock, UserCheck } from "lucide-react";
import { EnrollUserModalProps } from "@/src/types/course";
import { useAdminUser } from "@/src/hook/admin/useAdminUsers"; // Import đúng hook admin user đã gộp

export default function EnrollUserModal({ isOpen, onClose, course }: EnrollUserModalProps) {
  const {
    unregisteredUsers,
    pendingStudents,
    approvedStudents,
    selectedUser,
    setSelectedUser,
    loadingModal,
    submittingModal,
    fetchAllStudentData,
    handleEnrollUser,
    handleApprove,
    handleRejectOrDelete
  } = useAdminUser();

  useEffect(() => {
    if (isOpen && course?.maKhoaHoc) {
      setSelectedUser(null);
      fetchAllStudentData(course.maKhoaHoc);
    }
  }, [isOpen, course?.maKhoaHoc, fetchAllStudentData, setSelectedUser]);

  const pendingColumns = [
    { 
      title: "Tài khoản", 
      dataIndex: "taiKhoan", 
      key: "taiKhoan", 
      className: "font-medium text-slate-700" 
    },
    { 
      title: "Họ và tên", 
      dataIndex: "hoTen", 
      key: "hoTen" 
    },
    {
      title: "Hành động",
      key: "action",
      width: 110,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Phê duyệt ghi danh">
            <Button
              type="primary"
              shape="circle"
              icon={<Check size={14} />}
              className="bg-green-500 hover:bg-green-600 border-transparent flex items-center justify-center"
              onClick={() => handleApprove(course!.maKhoaHoc, record.taiKhoan)}
            />
          </Tooltip>
          <Tooltip title="Từ chối duyệt">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<X size={14} />}
              className="flex items-center justify-center"
              onClick={() => handleRejectOrDelete(course!.maKhoaHoc, record.taiKhoan, `Đã từ chối học viên [${record.taiKhoan}]!`)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const approvedColumns = [
    { 
      title: "Tài khoản", 
      dataIndex: "taiKhoan", 
      key: "taiKhoan", 
      className: "font-medium text-slate-700" 
    },
    { 
      title: "Họ và tên", 
      dataIndex: "hoTen", 
      key: "hoTen" 
    },
    {
      title: "Hành động",
      key: "action",
      width: 80,
      render: (_: any, record: any) => (
        <Tooltip title="Xóa học viên khỏi khóa học">
          <Button
            type="text"
            danger
            shape="circle"
            icon={<Trash2 size={14} />}
            className="hover:bg-red-50 flex items-center justify-center"
            onClick={() => handleRejectOrDelete(course!.maKhoaHoc, record.taiKhoan, `Đã xóa học viên [${record.taiKhoan}] khỏi lớp!`)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-gray-800 font-bold text-lg border-b border-gray-100 pb-3">
          <Users size={20} className="text-blue-500" />
          <span>Quản lý học viên khóa học</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} className="rounded-lg">Đóng</Button>
      ]}
      width={750}
    >
      <div className="my-4 flex flex-col gap-4 font-sans">
        <Alert
          message={
            <div className="text-sm text-slate-700">
              Khóa học đang chọn: <strong className="text-orange-600 font-bold">{course?.tenKhoaHoc}</strong>
            </div>
          }
          type="info"
          showIcon
        />

        {/* KHU VỰC KHUNG: NGƯỜI DÙNG MỚI & CHỜ XÉT DUYỆT */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">
              Chọn người dùng để ghi danh trực tiếp:
            </label>
            <div className="flex gap-2 w-full">
              <Select
                showSearch
                size="large"
                loading={loadingModal}
                placeholder="Tìm kiếm theo Tên hoặc Tài khoản người dùng..."
                optionFilterProp="label"
                value={selectedUser}
                onChange={(value) => setSelectedUser(value)}
                className="flex-1"
                options={unregisteredUsers?.map((user) => ({
                  value: user.taiKhoan,
                  label: `${user.hoTen} (${user.taiKhoan})`,
                })) || []}
              />
              <Button
                type="primary"
                size="large"
                loading={submittingModal}
                disabled={!selectedUser}
                onClick={() => handleEnrollUser(course!.maKhoaHoc)}
                className="bg-blue-600 hover:bg-blue-700 border-transparent rounded-lg font-semibold px-5 flex items-center justify-center"
              >
                Ghi danh
              </Button>
            </div>
          </div>

          <Divider className="my-1 border-gray-200" />

          {/* HIỂN THỊ DANH SÁCH CHỜ XÉT DUYỆT NGAY TẠI ĐÂY */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-600 font-bold text-sm">
              <Clock size={16} />
              <span>Danh sách học viên chờ xét duyệt ({pendingStudents?.length || 0})</span>
            </div>
            <Table
              dataSource={pendingStudents}
              columns={pendingColumns}
              rowKey="taiKhoan"
              loading={loadingModal}
              pagination={false}
              size="small"
              locale={{ emptyText: "Không có học viên nào đang chờ duyệt" }}
            />
          </div>
        </div>

        {/* KHU VỰC: DANH SÁCH HỌC VIÊN ĐÃ XÉT DUYỆT (ĐÃ THAM GIA) */}
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-2 text-green-600 font-bold text-sm">
            <UserCheck size={16} />
            <span>Danh sách học viên đã tham gia lớp ({approvedStudents?.length || 0})</span>
          </div>
          <Table
            dataSource={approvedStudents}
            columns={approvedColumns}
            rowKey="taiKhoan"
            loading={loadingModal}
            pagination={{ pageSize: 5 }}
            size="small"
            locale={{ emptyText: "Chưa có học viên nào tham gia khóa học" }}
          />
        </div>
      </div>
    </Modal>
  );
}
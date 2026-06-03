"use client";

import React, { useState, useEffect } from "react";
import { Modal, Select, Button, message, Alert } from "antd";
import { Users } from "lucide-react";
import { userServices } from "@/src/services/userServices";
import { EnrollUserModalProps } from "@/src/types/course";

export default function EnrollUserModal({ isOpen, onClose, course }: EnrollUserModalProps) {
  const [unregisteredUsers, setUnregisteredUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && course?.maKhoaHoc) {
      const fetchUnenrolledUsers = async () => {
        setLoading(true);
        setSelectedUser(null); 
        try {
          const res: any = await userServices.getUnenrolledUsers(course.maKhoaHoc);
          setUnregisteredUsers(res || []);
        } catch (error) {
          console.error("Lỗi tải danh sách người dùng chưa ghi danh:", error);
          message.error("Không thể tải danh sách người dùng!");
        } 
        finally {
          setLoading(false);
        }
      };
      fetchUnenrolledUsers();
    }
  }, [isOpen, course]);

  const handleEnrollUser = async () => {
    const maKhoaHoc = course?.maKhoaHoc;
    const taiKhoan = selectedUser;

    if (!taiKhoan || !maKhoaHoc) {
      message.warning("Vui lòng chọn một người dùng từ danh sách!");
      return;
    }
    
    setSubmitting(true);
    try {
      await userServices.enrollCourse(maKhoaHoc, taiKhoan);
      message.success(`Thêm thành công học viên [${taiKhoan}] vào khóa học!`);
      onClose(); 
    } catch (error: any) {
      message.error(error.message || "Ghi danh thất bại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-gray-800 font-bold text-lg border-b border-gray-100 pb-3">
          <Users size={20} className="text-blue-500" />
          <span>Thêm người dùng vào khóa học</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose} className="rounded-lg">
          Hủy bỏ
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleEnrollUser}
          className="bg-blue-600 hover:bg-blue-700 border-transparent rounded-lg font-semibold"
        >
          Xác nhận Thêm học viên
        </Button>,
      ]}
      className="rounded-xl overflow-hidden"
    >
      <div className="my-5 flex flex-col gap-4 font-sans">
        <Alert
          message={
            <div className="text-sm text-slate-700">
              Đang thêm học viên mới vào khóa:{" "}
              <strong className="text-orange-600 font-bold">{course?.tenKhoaHoc}</strong>
            </div>
          }
          type="warning"
          showIcon
          className="rounded-lg bg-orange-50 border-orange-100"
        />

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Chọn người dùng muốn chỉ định vào học:
          </label>
          <Select
            showSearch
            size="large"
            loading={loading}
            placeholder="Tìm kiếm theo Tên hoặc Tài khoản người dùng..."
            optionFilterProp="label"
            value={selectedUser}
            onChange={(value) => setSelectedUser(value)}
            className="w-full"
            options={unregisteredUsers.map((user) => ({
              value: user.taiKhoan,
              label: `${user.hoTen} (${user.taiKhoan})`, 
            }))}
          />
        </div>
      </div>
    </Modal>
  );
}
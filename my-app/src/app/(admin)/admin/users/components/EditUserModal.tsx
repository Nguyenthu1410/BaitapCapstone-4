import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

export default function EditUserModal({
  isOpen,
  onClose,
  isSubmitting,
  onUpdate,
  userTypes,
  editingUser,
}: any) {
  const [form] = Form.useForm();

  // MẸO: Mỗi khi mở Modal hoặc đổi người cần sửa, điền dữ liệu vào Form
  useEffect(() => {
    if (editingUser && isOpen) {
      form.setFieldsValue(editingUser);
    }
  }, [editingUser, isOpen, form]);

  const onFinish = async (values: any) => {
    const success = await onUpdate(values);
    if (success) onClose();
  };

  return (
    <Modal
      title={<h2 className="text-xl font-bold">Chỉnh sửa người dùng</h2>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnHidden // Tự xóa dữ liệu cũ khi đóng để không bị lộn sang người sau
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item name="taiKhoan" label="Tài khoản">
            <Input disabled className="bg-gray-100" />
            {/* Tài khoản là mã định danh, thường không cho sửa */}
          </Form.Item>

          <Form.Item
            name="matKhau"
            label="Mật khẩu"
            rules={[{ required: true, message: "Nhập MK cũ hoặc mới" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu..." />
          </Form.Item>

          <Form.Item name="hoTen" label="Họ tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="soDT"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="maLoaiNguoiDung"
            label="Loại người dùng"
            rules={[{ required: true }]}
          >
            <Select
              options={userTypes.map((t: any) => ({
                value: t.maLoaiNguoiDung,
                label: t.tenLoaiNguoiDung,
              }))}
            />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>Hủy</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className="bg-blue-600"
          >
            Lưu thay đổi
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

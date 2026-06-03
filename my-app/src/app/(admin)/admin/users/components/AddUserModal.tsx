import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { AddUserModalProps, UserPayload, UserTypeOption } from "@/src/types/course";


export default function AddUserModal({
  isOpen,
  onClose,
  isSubmitting,
  onAdd,
  userTypes,
}: AddUserModalProps) {
  const [form] = Form.useForm();

  const handleFinish = async (values: Omit<UserPayload, "maNhom">) => {
    const isSuccess = await onAdd(values);
    if (isSuccess) {
      form.resetFields(); 
    }
  };

  return (
    <Modal
      title={<h2 className="text-xl font-bold mb-4">Thêm người dùng mới</h2>}
      open={isOpen}
      onCancel={() => {
        onClose();
        form.resetFields(); 
      }}
      footer={null}
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          
          <Form.Item
            name="taiKhoan"
            label="Tài khoản"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
          >
            <Input placeholder="Nhập tên tài khoản..." size="large" />
          </Form.Item>

          <Form.Item
            name="matKhau"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu..." size="large" />
          </Form.Item>

          <Form.Item
            name="hoTen"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ và tên..." size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { 
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                message: "Email chưa đúng định dạng! (Ví dụ: admin@gmail.com)" 
              }
            ]}
          >
            <Input placeholder="Ví dụ: abc@gmail.com" size="large" />
          </Form.Item>

          <Form.Item
            name="soDT"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input placeholder="Nhập số điện thoại..." size="large" />
          </Form.Item>

          <Form.Item
            name="maLoaiNguoiDung"
            label="Loại người dùng"
            rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
          >
            <Select
              size="large"
              placeholder="Chọn chức vụ"
              options={userTypes.map((type) => ({
                value: type.maLoaiNguoiDung,
                label: type.tenLoaiNguoiDung,
              }))}
            />
          </Form.Item>

        </div>

        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
          <Button 
            size="large" 
            onClick={() => {
              onClose();
              form.resetFields();
            }}
          >
            Hủy
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="bg-blue-600"
            loading={isSubmitting}
          >
            Lưu Người Dùng
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
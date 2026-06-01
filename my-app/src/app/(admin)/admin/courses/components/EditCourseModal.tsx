import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { Category, EditCourseModalProps, CoursePayload } from "@/src/types/course";

export default function EditCourseModal({
  isOpen,
  onClose,
  isUpdating,
  onEdit,
  categories,
  editingCourse,
}: EditCourseModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingCourse && isOpen) {
      form.setFieldsValue({
        maKhoaHoc: editingCourse.maKhoaHoc,
        biDanh: editingCourse.biDanh,
        tenKhoaHoc: editingCourse.tenKhoaHoc,
        maDanhMucKhoaHoc: editingCourse.danhMucKhoaHoc?.maDanhMucKhoaHoc,
        hinhAnh: editingCourse.hinhAnh,
        moTa: editingCourse.moTa,
      });
    }
  }, [editingCourse, isOpen, form]);

  const handleFinish = async (values: CoursePayload) => {
    const isSuccess = await onEdit(values);
    if (isSuccess) {
      form.resetFields();
    }
  };

  return (
    <Modal
      title={<h2 className="text-xl font-bold mb-4">Chỉnh sửa khóa học</h2>}
      open={isOpen}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      footer={null}
      width={700}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div className="grid grid-cols-2 gap-x-4">
          <Form.Item name="maKhoaHoc" label="Mã khóa học">
            <Input
              size="large"
              disabled
              className="bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </Form.Item>
          <Form.Item
            name="biDanh"
            label="Bí danh"
            rules={[{ required: true, message: "Nhập bí danh!" }]}
          >
            <Input placeholder="VD: react-01" size="large" />
          </Form.Item>
          <Form.Item
            name="tenKhoaHoc"
            label="Tên khóa học"
            className="col-span-2"
            rules={[{ required: true, message: "Nhập tên KH!" }]}
          >
            <Input placeholder="Nhập tên khóa học..." size="large" />
          </Form.Item>
          <Form.Item
            name="maDanhMucKhoaHoc"
            label="Danh mục"
            rules={[{ required: true, message: "Chọn danh mục!" }]}
          >
            <Select
              size="large"
              placeholder="Chọn danh mục"
              options={categories.map((cat: Category) => ({
                value: String(cat.maDanhMuc),
                label: cat.tenDanhMuc,
              }))}
            />
          </Form.Item>
          
          <Form.Item
            name="hinhAnh"
            label="Hình ảnh"
            valuePropName="file"
            getValueFromEvent={(e: any) => e.target.files?.[0]}
          >
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer outline-none"
            />
          </Form.Item>

          <Form.Item
            name="moTa"
            label="Mô tả chi tiết"
            className="col-span-2"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} placeholder="Mô tả khóa học..." />
          </Form.Item>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button size="large" onClick={onClose}>
            Hủy
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="bg-blue-600"
            loading={isUpdating}
          >
            Lưu Thay Đổi
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
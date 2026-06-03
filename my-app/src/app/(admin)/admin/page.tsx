"use client";

import React from "react";
import { Card, Table, Button, Space, Tooltip, Progress, Tag, Avatar } from "antd";
import { BookOpen, Users, Clock, Eye, Check, X, GraduationCap, TrendingUp } from "lucide-react";
import { useDashboardAdmin } from "@/src/hook/admin/useDashboardAdmin";
import { FaUserClock } from "react-icons/fa";

export default function AdminDashboard() {
  const {
    stats,
    loading,
    pendingStudents,
    actionLoading,
    handleApproveRegistration,
    handleRejectRegistration,
    handleApproveAllInCourse,
    handleRejectAllInCourse
  } = useDashboardAdmin();

  const [isClient, setIsClient] = React.useState(false);

  const getRandomColor = (name: string) => {
    const colors = ["#1890ff", "#2f54eb", "#722ed1", "#13c2c2", "#52c41a", "#fa8c16", "#f5222d"];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const studentColumns = [
    {
      title: "Thông tin Học viên",
      key: "student",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2 max-w-full">
          <Avatar 
            style={{ backgroundColor: getRandomColor(record.hoTen) }}
            size="small"
            className="font-bold flex-shrink-0"
          >
            {record.hoTen ? record.hoTen.charAt(0).toUpperCase() : "U"}
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-slate-700 text-xs truncate">{record.hoTen}</span>
            <span className="text-[10px] text-slate-400 font-mono truncate">@{record.taiKhoan}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      render: (text: string) => (
        <div className="max-w-[120px] truncate">
          <Tooltip title={text} placement="topLeft">
            <Tag color="blue" className="border-none rounded px-1.5 py-0.5 text-[10px] font-medium m-0">
              {text}
            </Tag>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Duyệt",
      key: "action",
      width: 75,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space size={4}>
          <Button
            type="primary"
            shape="circle"
            size="small"
            icon={<Check size={11} />}
            loading={actionLoading === record.taiKhoan}
            className="bg-emerald-500 hover:bg-emerald-600 border-transparent flex items-center justify-center shadow-none w-6 h-6 min-w-6"
            onClick={() => handleApproveRegistration(record.maKhoaHoc, record.taiKhoan)}
          />
          <Button
            type="primary"
            danger
            shape="circle"
            size="small"
            icon={<X size={11} />}
            loading={actionLoading === record.taiKhoan}
            className="bg-rose-500 hover:bg-rose-600 border-transparent flex items-center justify-center shadow-none w-6 h-6 min-w-6"
            onClick={() => handleRejectRegistration(record.maKhoaHoc, record.taiKhoan)}
          />
        </Space>
      ),
    },
  ];

  const getPendingCoursesData = () => {
    const courseMap: Record<string, { key: string; maKhoaHoc: string; tenKhoaHoc: string; soLuongChoDuyet: number }> = {};
    if (Array.isArray(pendingStudents)) {
      pendingStudents.forEach((item) => {
        if (!courseMap[item.maKhoaHoc]) {
          courseMap[item.maKhoaHoc] = {
            key: item.maKhoaHoc,
            maKhoaHoc: item.maKhoaHoc,
            tenKhoaHoc: item.tenKhoaHoc || "Khóa học",
            soLuongChoDuyet: 0,
          };
        }
        courseMap[item.maKhoaHoc].soLuongChoDuyet += 1;
      });
    }
    return Object.values(courseMap);
  };

  const courseColumns = [
    {
      title: "Mã Lớp",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      width: "15%",
      className: "font-mono text-slate-400 font-bold truncate",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      width: "40%",
      className: "font-semibold text-slate-700",
      ellipsis: true,
      render: (text: string) => (
        <Tooltip title={text} placement="topLeft">
          <span className="truncate block cursor-pointer">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Đang đợi",
      dataIndex: "soLuongChoDuyet",
      key: "soLuongChoDuyet",
      width: "15%",
      align: "center" as const,
      render: (count: number) => (
        <span className="bg-amber-50 text-amber-600 font-bold px-2.5 py-1 rounded-full text-xs border border-amber-100 whitespace-nowrap">
          {count} HV
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "courseAction",
      width: "30%",
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space size="small" className="flex justify-center">
          <Tooltip>
            <Button
              type="primary"
              icon={<Check size={14} />}
              loading={actionLoading === `course-approve-${record.maKhoaHoc}`}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 border-transparent rounded-lg font-semibold flex items-center justify-center gap-1 shadow-sm px-3 py-1.5 text-xs h-8"
              onClick={() => handleApproveAllInCourse(record.maKhoaHoc)}
            >
            </Button>
          </Tooltip>
          
          <Tooltip>
            <Button
              type="primary"
              danger
              icon={<X size={14} />}
              loading={actionLoading === `course-reject-${record.maKhoaHoc}`}
              className="bg-rose-500 hover:bg-rose-600 border-transparent rounded-lg flex items-center justify-center shadow-sm w-8 h-8 min-w-8"
              onClick={() => handleRejectAllInCourse(record.maKhoaHoc)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full max-w-full min-h-screen bg-slate-50/50 p-4 md:p-6 flex flex-col gap-6 overflow-hidden box-border">
      
      {/* HEADER SECTION  */}
      <div className="w-full bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2 m-0">
            Tổng quan hệ thống <TrendingUp className="text-blue-500" size={20} />
          </h1>
          <p className="text-xs text-slate-400 m-0">Thống kê chỉ số thời gian thực và điều phối dữ liệu lớp học.</p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50/80 px-4 py-2 rounded-xl border border-slate-100 self-stretch sm:self-auto justify-between">
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Phiên làm việc Giáo vụ
            </span>
            <span className="text-xs font-bold text-slate-600 mt-0.5">
              {isClient 
                ? new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                : "Đang tải thời gian..."
              }
            </span>
          </div>
          
          <div className="w-[1px] h-8 bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg text-xs font-semibold border border-emerald-100 animate-pulse">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            Hệ thống ổn định
          </div>
        </div>
      </div>

      {/* 4 Ô CARDS CHỈ SỐ */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <Card className="border border-slate-100 shadow-sm rounded-xl bg-white w-full" loading={loading} styles={{ body: { padding: "16px" } }}>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">Khóa học hiện có</span>
              <h3 className="text-3xl font-bold text-slate-800 m-0 leading-none pt-1">
                {stats.khoaHocHienCo}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl flex-shrink-0 ml-2"><BookOpen size={18} /></div>
          </div>
        </Card>

        {/* Card 2 */}
        <Card className="border border-slate-100 shadow-sm rounded-xl bg-white w-full" loading={loading} styles={{ body: { padding: "16px" } }}>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">Tổng số học viên</span>
              <h3 className="text-3xl font-bold text-slate-800 m-0 leading-none pt-1">
                {stats.tongHocVien}
              </h3>
            </div>
            <div className="p-3 bg-green-50 text-green-500 rounded-xl flex-shrink-0 ml-2"><Users size={18} /></div>
          </div>
        </Card>

        {/* Card 3 */}
        <Card className="border border-slate-100 shadow-sm rounded-xl bg-white w-full" loading={loading} styles={{ body: { padding: "16px" } }}>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">Yêu cầu chờ duyệt</span>
              <h3 className="text-3xl font-bold text-amber-500 m-0 leading-none pt-1">
                {stats.yeuCauChoDuyet}
              </h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0 ml-2"><Clock size={18} /></div>
          </div>
        </Card>

        {/* Card 4 */}
        <Card className="border border-slate-100 shadow-sm rounded-xl bg-white w-full" loading={loading} styles={{ body: { padding: "16px" } }}>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">Lượt xem khóa học</span>
              <h3 className="text-3xl font-bold text-indigo-500 m-0 leading-none pt-1">
                {stats.tongLuotXem}
              </h3>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl flex-shrink-0 ml-2"><Eye size={18} /></div>
          </div>
        </Card>
      </div>

      {/* KHU VỰC BẢNG DỮ LIỆU */}
      <div className="w-full flex flex-col lg:flex-row gap-6 max-w-full overflow-hidden">
        
        {/* KHỐI BÊN TRÁI: TIẾN ĐỘ & BẢNG KHÓA HỌC */}
        <div className="w-full lg:w-[60%] flex flex-col gap-6 overflow-hidden">
          
          <Card title={<span className="font-bold text-slate-800 text-sm">Cơ cấu vai trò nhân sự</span>} className="border border-slate-100 shadow-sm rounded-xl bg-white w-full">
            <div className="flex flex-col gap-4 py-1">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-500">Học viên hệ thống (HV)</span>
                  <span className="font-bold text-green-600">{stats.tongHocVien}</span>
                </div>
                <Progress percent={85} strokeColor="#22c55e" size={6} showInfo={false} />
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-500">Giáo vụ Ban Quản trị (GV)</span>
                  <span className="font-bold text-blue-600">{stats.tongGiaoVu}</span>
                </div>
                <Progress percent={15} strokeColor="#3b82f6" size={6} showInfo={false} />
              </div>
            </div>
          </Card>

          <Card
            title={
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <GraduationCap size={16} className="text-blue-500" />
                <span>Khóa học có yêu cầu ghi danh</span>
              </div>
            }
            className="border border-slate-100 shadow-sm rounded-xl bg-white w-full overflow-hidden"
          >
            <div className="w-full">
              <Table
                dataSource={getPendingCoursesData()}
                columns={courseColumns}
                loading={loading}
                pagination={{ pageSize: 3 }}
                className="w-full"
                locale={{ emptyText: "Không có lớp chờ xét duyệt" }}
              />
            </div>
          </Card>
        </div>

        {/* KHỐI BÊN PHẢI: CHI TIẾT YÊU CẦU ĐĂNG KÝ LẺ */}
        <div className="w-full lg:w-[40%] overflow-hidden">
          <Card
            title={
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <FaUserClock size={16} className="text-amber-500" />
                <span>Yêu cầu đăng ký lẻ ({pendingStudents.length})</span>
              </div>
            }
            className="border border-slate-100 shadow-sm rounded-xl bg-white w-full h-full overflow-hidden"
          >
            <div className="w-full">
              <Table
                dataSource={pendingStudents}
                columns={studentColumns}
                rowKey={(record) => `${record.taiKhoan}-${record.maKhoaHoc}`}
                loading={loading}
                pagination={{ pageSize: 5, size: "small" }}
                size="small"
                className="w-full"
                locale={{ emptyText: "Không có yêu cầu đăng ký mới" }}
              />
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
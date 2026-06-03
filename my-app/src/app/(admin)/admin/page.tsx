// "use client";

// import React from "react";
// import { Card, Table, Button, Space, Tooltip, Progress, Row, Col, Tag } from "antd";
// import { BookOpen, Users, Clock, Eye, Check, X, GraduationCap } from "lucide-react";
// import { useDashboardAdmin } from "@/src/hook/admin/useDashboardAdmin";
// import { FaUserClock } from "react-icons/fa";

// export default function AdminDashboard() {
//   const {
//     stats,
//     loading,
//     pendingStudents,
//     actionLoading,
//     handleApproveRegistration,
//     handleRejectRegistration,
//   } = useDashboardAdmin();

//   const studentColumns = [
//     {
//       title: "Học viên",
//       key: "student",
//       render: (_: any, record: any) => (
//         <div className="flex flex-col">
//           <span className="font-semibold text-slate-800 text-sm">{record.hoTen}</span>
//           <span className="text-xs text-slate-400">Tài khoản: {record.taiKhoan}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Khóa học đăng ký",
//       dataIndex: "tenKhoaHoc",
//       key: "tenKhoaHoc",
//       className: "text-xs font-medium text-blue-600 max-w-[180px] truncate",
//     },
//     {
//       title: "Thao tác",
//       key: "action",
//       width: 90,
//       align: "center" as const,
//       render: (_: any, record: any) => (
//         <Space size="small">
//           <Tooltip title="Duyệt vào lớp">
//             <Button
//               type="primary"
//               shape="circle"
//               size="small"
//               icon={<Check size={12} />}
//               loading={actionLoading === record.taiKhoan}
//               className="bg-green-500 hover:bg-green-600 border-transparent flex items-center justify-center"
//               onClick={() => handleApproveRegistration(record.maKhoaHoc, record.taiKhoan)}
//             />
//           </Tooltip>
//           <Tooltip title="Từ chối duyệt">
//             <Button
//               type="primary"
//               danger
//               shape="circle"
//               size="small"
//               icon={<X size={12} />}
//               loading={actionLoading === record.taiKhoan}
//               className="flex items-center justify-center"
//               onClick={() => handleRejectRegistration(record.maKhoaHoc, record.taiKhoan)}
//             />
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   // LOGIC XỬ LÝ: Gom nhóm dữ liệu từ pendingStudents để tạo danh sách Khóa học có yêu cầu chờ duyệt
//   const getPendingCoursesData = () => {
//     const courseMap: Record<string, { key: string; maKhoaHoc: string; tenKhoaHoc: string; soLuongChoDuyet: number }> = {};
    
//     if (Array.isArray(pendingStudents)) {
//       pendingStudents.forEach((item) => {
//         if (!courseMap[item.maKhoaHoc]) {
//           courseMap[item.maKhoaHoc] = {
//             key: item.maKhoaHoc,
//             maKhoaHoc: item.maKhoaHoc,
//             tenKhoaHoc: item.tenKhoaHoc || "Khóa học chưa rõ tên",
//             soLuongChoDuyet: 0,
//           };
//         }
//         courseMap[item.maKhoaHoc].soLuongChoDuyet += 1;
//       });
//     }
//     return Object.values(courseMap);
//   };

//   // 2. Cấu hình cột cho bảng mới bổ sung: "Khóa học chờ xét duyệt" (Ô bên trái dưới)
//   const courseColumns = [
//     {
//       title: "Mã KH",
//       dataIndex: "maKhoaHoc",
//       key: "maKhoaHoc",
//       width: 120,
//       className: "text-xs font-mono text-slate-500",
//     },
//     {
//       title: "Tên khóa học cần duyệt",
//       dataIndex: "tenKhoaHoc",
//       key: "tenKhoaHoc",
//       className: "font-semibold text-slate-700 text-sm",
//     },
//     {
//       title: "Số học viên đang đợi",
//       dataIndex: "soLuongChoDuyet",
//       key: "soLuongChoDuyet",
//       width: 160,
//       align: "center" as const,
//       render: (count: number) => (
//         <Tag color="orange" className="font-bold px-2.5 py-0.5 rounded-full">
//           {count} học viên
//         </Tag>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6 font-sans max-w-[1600px] mx-auto flex flex-col gap-6">
//       <div>
//         <h1 className="text-2xl font-bold text-slate-800">Tổng quan hệ thống</h1>
//         <p className="text-sm text-slate-500">Thống kê hoạt động và quản lý xét duyệt Elearning.</p>
//       </div>

//       {/* CARDS THỐNG KÊ */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         <Card className="shadow-sm border-slate-100 rounded-xl" loading={loading}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Khóa học hiện có</p>
//               <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.khoaHocHienCo}</h3>
//             </div>
//             <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><BookOpen size={20} /></div>
//           </div>
//         </Card>

//         <Card className="shadow-sm border-slate-100 rounded-xl" loading={loading}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng số học viên</p>
//               <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.tongHocVien}</h3>
//             </div>
//             <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Users size={20} /></div>
//           </div>
//         </Card>

//         <Card className="shadow-sm border-slate-100 rounded-xl" loading={loading}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Yêu cầu chờ duyệt</p>
//               <h3 className="text-2xl font-bold text-amber-600 mt-1">{stats.yeuCauChoDuyet}</h3>
//             </div>
//             <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock size={20} /></div>
//           </div>
//         </Card>

//         <Card className="shadow-sm border-slate-100 rounded-xl" loading={loading}>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lượt xem khóa học</p>
//               <h3 className="text-2xl font-bold text-indigo-600 mt-1">{stats.tongLuotXem}</h3>
//             </div>
//             <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Eye size={20} /></div>
//           </div>
//         </Card>
//       </div>

//       {/* CHIA BỐ CỤC LAYOUT 2 BÊN */}
//       <Row gutter={[20, 20]}>
        
//         {/* CỘT BÊN TRÁI (RỘNG 15/24): GỒM THỐNG KÊ VÀ TABLE KHÓA HỌC CHỜ XÉT DUYỆT */}
//         <Col xs={24} lg={14} className="flex flex-col gap-6">
//           {/* Thống kê vai trò */}
//           <Card 
//             title={<span className="font-bold text-slate-800">Thống kê vai trò người dùng</span>}
//             className="shadow-sm border-slate-100 rounded-xl"
//             loading={loading}
//           >
//             <div className="py-2 flex flex-col gap-4">
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-slate-600 font-medium">Học viên (HV)</span>
//                   <span className="font-bold text-slate-800">{stats.tongHocVien} người</span>
//                 </div>
//                 <Progress percent={85} strokeColor="#22c55e" showInfo={false} />
//               </div>
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-slate-600 font-medium">Giáo vụ / Admin (GV)</span>
//                   <span className="font-bold text-slate-800">{stats.tongGiaoVu} người</span>
//                 </div>
//                 <Progress percent={15} strokeColor="#3b82f6" showInfo={false} />
//               </div>
//             </div>
//           </Card>

//           {/* TABLE MỚI: DANH SÁCH KHÓA HỌC CÓ YÊU CẦU CHỜ XÉT DUYỆT */}
//           <Card
//             title={
//               <div className="flex items-center gap-2 text-slate-800 font-bold text-sm py-0.5">
//                 <GraduationCap size={18} className="text-blue-500" />
//                 <span>Danh sách khóa học chờ xét duyệt ghi danh</span>
//               </div>
//             }
//             className="shadow-sm border-slate-100 rounded-xl"
//           >
//             <Table
//               dataSource={getPendingCoursesData()}
//               columns={courseColumns}
//               loading={loading}
//               pagination={false}
//               size="middle"
//               locale={{ emptyText: "Không có khóa học nào đang đợi xét duyệt" }}
//             />
//           </Card>
//         </Col>

//         {/* CỘT BÊN PHẢI (RỘNG 10/24): CHI TIẾT TỪNG HỌC VIÊN CHỜ DUYỆT */}
//         <Col xs={24} lg={10}>
//           <Card
//             title={
//               <div className="flex items-center gap-2 text-slate-800 font-bold text-sm py-0.5">
//                 <FaUserClock size={16} className="text-amber-500" />
//                 <span>Yêu cầu đăng ký mới ({pendingStudents.length})</span>
//               </div>
//             }
//             className="shadow-sm border-slate-100 rounded-xl h-full"
//           >
//             <Table
//               dataSource={pendingStudents}
//               columns={studentColumns}
//               rowKey={(record) => `${record.taiKhoan}-${record.maKhoaHoc}`}
//               loading={loading}
//               pagination={{ pageSize: 5 }}
//               size="small"
//               locale={{ emptyText: "Không có yêu cầu đăng ký mới nào" }}
//             />
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

"use client";

import React from "react";
import { Card, Table, Button, Space, Tooltip, Progress, Row, Col, Tag } from "antd";
import { BookOpen, Users, Clock, Eye, Check, X,  GraduationCap } from "lucide-react";
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

  // 1. Cấu hình cột cho bảng: "Yêu cầu đăng ký mới" (Từng học viên cụ thể ở bên phải)
  const studentColumns = [
    {
      title: "Học viên",
      key: "student",
      render: (_: any, record: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800 text-sm">{record.hoTen}</span>
          <span className="text-xs text-slate-400">Tài khoản: {record.taiKhoan}</span>
        </div>
      ),
    },
    {
      title: "Khóa học đăng ký",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      className: "text-xs font-medium text-blue-600 max-w-[180px] truncate",
    },
    {
      title: "Thao tác",
      key: "action",
      width: 90,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Duyệt vào lớp">
            <Button
              type="primary"
              shape="circle"
              size="small"
              icon={<Check size={12} />}
              loading={actionLoading === record.taiKhoan}
              className="bg-green-500 hover:bg-green-600 border-transparent flex items-center justify-center"
              onClick={() => handleApproveRegistration(record.maKhoaHoc, record.taiKhoan)}
            />
          </Tooltip>
          <Tooltip title="Từ chối duyệt">
            <Button
              type="primary"
              danger
              shape="circle"
              size="small"
              icon={<X size={12} />}
              loading={actionLoading === record.taiKhoan}
              className="flex items-center justify-center"
              onClick={() => handleRejectRegistration(record.maKhoaHoc, record.taiKhoan)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // LOGIC XỬ LÝ: Gom nhóm dữ liệu từ pendingStudents để tạo mảng Khóa học chờ duyệt
  const getPendingCoursesData = () => {
    const courseMap: Record<string, { key: string; maKhoaHoc: string; tenKhoaHoc: string; soLuongChoDuyet: number }> = {};
    
    if (Array.isArray(pendingStudents)) {
      pendingStudents.forEach((item) => {
        if (!courseMap[item.maKhoaHoc]) {
          courseMap[item.maKhoaHoc] = {
            key: item.maKhoaHoc,
            maKhoaHoc: item.maKhoaHoc,
            tenKhoaHoc: item.tenKhoaHoc || "Khóa học chưa rõ tên",
            soLuongChoDuyet: 0,
          };
        }
        courseMap[item.maKhoaHoc].soLuongChoDuyet += 1;
      });
    }
    return Object.values(courseMap);
  };

  // 2. Cấu hình cột cho bảng: "Khóa học chờ xét duyệt" (Có thêm nút Duyệt/Hủy hàng loạt)
  const courseColumns = [
    {
      title: "Mã KH",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      width: 100,
      className: "text-xs font-mono text-slate-500",
    },
    {
      title: "Tên khóa học cần duyệt",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      className: "font-semibold text-slate-700 text-sm",
    },
    {
      title: "Trạng thái chờ",
      dataIndex: "soLuongChoDuyet",
      key: "soLuongChoDuyet",
      width: 130,
      align: "center" as const,
      render: (count: number) => (
        <Tag color="orange" className="font-bold px-2.5 py-0.5 rounded-full">
          {count} học viên
        </Tag>
      ),
    },
    {
      title: "Thao tác lớp",
      key: "courseAction",
      width: 110,
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip>
            <Button
              type="primary"
              size="small"
              icon={<Check size={12} />}
              loading={actionLoading === `course-approve-${record.maKhoaHoc}`}
              className="bg-emerald-600 hover:bg-emerald-700 border-transparent rounded-md font-medium text-xs flex items-center justify-center gap-1"
              onClick={() => handleApproveAllInCourse(record.maKhoaHoc)}
            >
            </Button>
          </Tooltip>
          <Tooltip>
            <Button
              type="primary"
              danger
              size="small"
              icon={<X size={12} />}
              loading={actionLoading === `course-reject-${record.maKhoaHoc}`}
              className="flex items-center justify-center rounded-md"
              onClick={() => handleRejectAllInCourse(record.maKhoaHoc)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 font-sans max-w-[1600px] mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tổng quan hệ thống</h1>
        <p className="text-sm text-slate-500">Thống kê hoạt động và quản lý xét duyệt Elearning.</p>
      </div>

      {/* CARDS THỐNG KÊ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="shadow-sm border-slate-100 rounded-xl" loading={loading}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Khóa học hiện có</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.khoaHocHienCo}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><BookOpen size={20} /></div>
          </div>
        </Card>

        <Card className="shadow-sm border-slate-100 rounded-xl" loading={loading}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng số học viên</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.tongHocVien}</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Users size={20} /></div>
          </div>
        </Card>

        <Card className="shadow-sm border-slate-100 rounded-xl" loading={loading}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Yêu cầu chờ duyệt</p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">{stats.yeuCauChoDuyet}</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock size={20} /></div>
          </div>
        </Card>

        <Card className="shadow-sm border-slate-100 rounded-xl" loading={loading}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lượt xem khóa học</p>
              <h3 className="text-2xl font-bold text-indigo-600 mt-1">{stats.tongLuotXem}</h3>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Eye size={20} /></div>
          </div>
        </Card>
      </div>

      {/* CHIA BỐ CỤC LAYOUT 2 BÊN */}
      <Row gutter={[20, 20]}>
        
        {/* CỘT BÊN TRÁI: GỒM THỐNG KÊ VÀ BẢNG KHÓA HỌC CHỜ DUYỆT */}
        <Col xs={24} lg={14} className="flex flex-col gap-6">
          <Card 
            title={<span className="font-bold text-slate-800">Thống kê vai trò người dùng</span>}
            className="shadow-sm border-slate-100 rounded-xl"
            loading={loading}
          >
            <div className="py-2 flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">Học viên (HV)</span>
                  <span className="font-bold text-slate-800">{stats.tongHocVien} người</span>
                </div>
                <Progress percent={85} strokeColor="#22c55e" showInfo={false} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">Giáo vụ / Admin (GV)</span>
                  <span className="font-bold text-slate-800">{stats.tongGiaoVu} người</span>
                </div>
                <Progress percent={15} strokeColor="#3b82f6" showInfo={false} />
              </div>
            </div>
          </Card>

          {/* TABLE KHÓA HỌC CHỜ XÉT DUYỆT CÓ NÚT HÀNH ĐỘNG HÀNG LOẠT */}
          <Card
            title={
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm py-0.5">
                <GraduationCap size={18} className="text-blue-500" />
                <span>Danh sách khóa học chờ xét duyệt ghi danh</span>
              </div>
            }
            className="shadow-sm border-slate-100 rounded-xl"
          >
            <Table
              dataSource={getPendingCoursesData()}
              columns={courseColumns}
              loading={loading}
              pagination={{ pageSize: 3, size: "small" }}
              size="middle"
              locale={{ emptyText: "Không có khóa học nào đang đợi xét duyệt" }}
            />
          </Card>
        </Col>

        {/* CỘT BÊN PHẢI: CHI TIẾT TỪNG YÊU CẦU ĐĂNG KÝ HỌC VIÊN LẺ */}
        <Col xs={24} lg={10}>
          <Card
            title={
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm py-0.5">
                <FaUserClock size={16} className="text-amber-500" />
                <span>Yêu cầu đăng ký mới ({pendingStudents.length})</span>
              </div>
            }
            className="shadow-sm border-slate-100 rounded-xl h-full"
          >
            <Table
              dataSource={pendingStudents}
              columns={studentColumns}
              rowKey={(record) => `${record.taiKhoan}-${record.maKhoaHoc}`}
              loading={loading}
              pagination={{ pageSize: 5, size: "small" }}
              size="small"
              locale={{ emptyText: "Không có yêu cầu đăng ký mới nào" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
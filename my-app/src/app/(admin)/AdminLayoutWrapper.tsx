// "use client";

// import React, { useState } from "react";
// import { Layout, Menu, Avatar, Dropdown, Badge, Input } from "antd";
// import { LogOut, ChevronDown, Bell, Search, Users } from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";
// import { ADMIN_MENU_ITEMS } from "@/src/constant/path";
// const { Header, Sider, Content } = Layout;

// export default function AdminLayoutWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [collapsed, setCollapsed] = useState(false);

//   const showRoleOnly = true;
//   const notificationCount = 0;
//   const avatarText = showRoleOnly ? "Q" : "T";

//   const router = useRouter();
//   const pathname = usePathname();

//   const menuItems = ADMIN_MENU_ITEMS.map((item) => ({
//     ...item,
//     icon: React.createElement(item.icon, { size: 18 }),
//   }));

//   return (
//     <Layout className="min-h-screen flex-row" hasSider>
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//         theme="dark"
//         width={260}
//         style={{ backgroundColor: "#001529" }}
//       >
//         <div className="h-16 flex items-center px-6 mb-4 mt-2">
//           <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 shrink-0 shadow-lg">
//             <span className="text-white font-bold italic text-lg">E</span>
//           </div>
//           {!collapsed && (
//             <span className="text-white font-bold text-lg tracking-wider whitespace-nowrap uppercase">
//               E-Learning
//             </span>
//           )}
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[pathname]}
//           onClick={({ key }) => router.push(key)}
//           items={menuItems}
//         />
//       </Sider>

//       <Layout className="bg-[#f5f7fa]">
//         <Header className="bg-white px-6 flex items-center shadow-sm h-16 leading-none border-b border-gray-100">
//           {/* KHU VỰC THANH TÌM KIẾM */}
//           <div className="hidden md:flex flex-1 max-w-md">
//             <Input
//               size="large"
//               placeholder="Tìm kiếm khóa học, người dùng..."
//               prefix={<Search size={16} className="text-gray-400 mr-2" />}
//               className="rounded-full bg-gray-50 border-transparent hover:bg-white hover:border-blue-400 focus-within:bg-white focus-within:border-blue-500 transition-all shadow-none"
//             />
//           </div>

//           {/* KHU VỰC AVATAR VÀ THÔNG BÁO */}
//           <div className="flex items-center gap-6 h-full justify-end ml-auto">
//             <div className="flex items-center cursor-pointer group px-1">
//               <Badge count={notificationCount} size="small" showZero={false}>
//                 <Bell
//                   size={20}
//                   className="text-gray-500 group-hover:text-blue-500 transition-colors"
//                 />
//               </Badge>
//             </div>

//             <Dropdown
//               menu={{
//                 items: [
//                   { key: "1", label: "Hồ sơ", icon: <Users size={14} /> },
//                   {
//                     key: "2",
//                     label: "Đăng xuất",
//                     icon: <LogOut size={14} />,
//                     danger: true,
//                   },
//                 ],
//               }}
//               placement="bottomRight"
//             >
//               <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-all h-10 shrink-0 border border-transparent hover:border-gray-100">
//                 <Avatar
//                   size={32}
//                   className="bg-blue-600 shrink-0 flex items-center justify-center text-white font-semibold text-[14px]"
//                 >
//                   {avatarText}
//                 </Avatar>

//                 <div className="hidden sm:block whitespace-nowrap">
//                   {showRoleOnly ? (
//                     <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wide">
//                       Quản trị viên
//                     </span>
//                   ) : (
//                     <span className="text-[14px] font-bold text-gray-800">
//                       Anh Thư
//                     </span>
//                   )}
//                 </div>

//                 <ChevronDown size={14} className="text-gray-400 shrink-0" />
//               </div>
//             </Dropdown>
//           </div>
//         </Header>

//         <Content className="m-6">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-112px)] overflow-hidden">
//             {children}
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Dropdown, Badge, Input } from "antd";
import { LogOut, ChevronDown, Bell, Search, Users } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { ADMIN_MENU_ITEMS } from "@/src/constant/path";

const { Header, Sider, Content } = Layout;

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  
  // State lưu thông tin user đăng nhập
  const [user, setUser] = useState<any>(null);

  const router = useRouter();
  const pathname = usePathname();

  // 1. Lấy thông tin user từ localStorage khi load trang
  useEffect(() => {
    const userString = localStorage.getItem("userLogin");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  // 2. Xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("userLogin"); // Xóa dữ liệu phiên đăng nhập
    router.push("/signIn"); // Đẩy người dùng về trang đăng nhập
  };

  // 3. Bắt sự kiện click vào Dropdown Avatar
  const handleMenuClick = (e: any) => {
    if (e.key === "logout") {
      handleLogout();
    }
  };

  // Map các icon từ ADMIN_MENU_ITEMS
  const menuItems = ADMIN_MENU_ITEMS.map((item) => ({
    ...item,
    icon: React.createElement(item.icon, { size: 18 }),
  }));

  // 4. Các biến hiển thị linh động
  const notificationCount = 0;
  const userName = user?.hoTen || "Quản trị viên"; // Hiển thị tên thật từ API
  const avatarText = userName.charAt(0).toUpperCase(); // Lấy chữ cái đầu của tên làm Avatar
  const roleName = user?.maLoaiNguoiDung === "GV" ? "Giáo Vụ" : "Quản trị viên";

  return (
    <Layout className="min-h-screen flex-row" hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        width={260}
        style={{ backgroundColor: "#001529" }}
      >
        <div className="h-16 flex items-center px-6 mb-4 mt-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 shrink-0 shadow-lg">
            <span className="text-white font-bold italic text-lg">E</span>
          </div>
          {!collapsed && (
            <span className="text-white font-bold text-lg tracking-wider whitespace-nowrap uppercase">
              E-Learning
            </span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          onClick={({ key }) => router.push(key)}
          items={menuItems}
        />
      </Sider>

      <Layout className="bg-[#f5f7fa]">
        <Header className="bg-white px-6 flex items-center shadow-sm h-16 leading-none border-b border-gray-100">
          
          {/* KHU VỰC THANH TÌM KIẾM */}
          <div className="hidden md:flex flex-1 max-w-md">
            <Input
              size="large"
              placeholder="Tìm kiếm khóa học, người dùng..."
              prefix={<Search size={16} className="text-gray-400 mr-2" />}
              className="rounded-full bg-gray-50 border-transparent hover:bg-white hover:border-blue-400 focus-within:bg-white focus-within:border-blue-500 transition-all shadow-none"
            />
          </div>

          {/* KHU VỰC AVATAR VÀ THÔNG BÁO */}
          <div className="flex items-center gap-6 h-full justify-end ml-auto">
            <div className="flex items-center cursor-pointer group px-1">
              <Badge count={notificationCount} size="small" showZero={false}>
                <Bell
                  size={20}
                  className="text-gray-500 group-hover:text-blue-500 transition-colors"
                />
              </Badge>
            </div>

            <Dropdown
              menu={{
                items: [
                  { key: "profile", label: "Hồ sơ", icon: <Users size={14} /> },
                  {
                    key: "logout",
                    label: "Đăng xuất",
                    icon: <LogOut size={14} />,
                    danger: true,
                  },
                ],
                onClick: handleMenuClick, // Gắn sự kiện click vào dropdown
              }}
              placement="bottomRight"
            >
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-all h-10 shrink-0 border border-transparent hover:border-gray-100">
                <Avatar
                  size={32}
                  className="bg-blue-600 shrink-0 flex items-center justify-center text-white font-semibold text-[14px]"
                >
                  {avatarText}
                </Avatar>

                {/* Khối hiển thị Tên và Chức vụ */}
                <div className="hidden sm:flex flex-col justify-center">
                  <span className="text-[14px] font-bold text-gray-800 leading-tight">
                    {userName}
                  </span>
                  <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide leading-tight mt-0.5">
                    {roleName}
                  </span>
                </div>

                <ChevronDown size={14} className="text-gray-400 shrink-0 ml-1" />
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="m-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-112px)] overflow-hidden">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
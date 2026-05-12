"use client";

import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Input } from "antd";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Search
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { html } from "framer-motion/client";

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { key: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { key: "/admin/users", icon: <Users size={18} />, label: "Quản lý người dùng" },
    { key: "/admin/courses", icon: <BookOpen size={18} />, label: "Quản lý khóa học" },
    { key: "/admin/settings", icon: <Settings size={18} />, label: "Cài đặt" },
  ];

  return (
    <html>
      <body>
        <Layout className="min-h-screen">
      {/* SIDEBAR: Màu tối (Dark Theme) giống mẫu */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        width={260}
        className="shadow-xl"
        style={{ backgroundColor: "#001529" }} // Màu xanh đen chuẩn Admin
      >
        <div className="h-16 flex items-center px-6 mb-4 mt-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 shrink-0">
            <span className="text-white font-bold italic text-lg">E</span>
          </div>
          {!collapsed && (
            <span className="text-white font-bold text-lg tracking-wider">
              E-LEARNING
            </span>
          )}
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          onClick={({ key }) => router.push(key)}
          items={menuItems}
          className="admin-sidebar-menu"
        />
      </Sider>

      <Layout className="bg-[#f5f7fa]">
        {/* HEADER: Màu trắng, có Breadcrumb và Profile */}
        <Header className="bg-white px-6 flex items-center justify-between shadow-sm h-16">
          <div className="flex items-center gap-8">
            <Breadcrumb 
              items={[
                { title: <Link href="/admin" className="text-gray-400">Home</Link> },
                { title: <span className="font-medium text-gray-800">Dashboard</span> }
              ]} 
            />
          </div>
          
          <div className="flex items-center gap-5">
            {/* Thanh tìm kiếm nhỏ trên header */}
            <Input 
              prefix={<Search size={16} className="text-gray-400" />} 
              placeholder="Tìm kiếm..." 
              className="w-48 bg-gray-50 border-none rounded-full hidden md:flex"
            />
            
            <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-all">
                <Bell size={20} className="text-gray-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>

            <Dropdown
              menu={{
                items: [
                  { key: "1", label: "Hồ sơ cá nhân", icon: <Users size={14} /> },
                  { key: "2", label: "Đăng xuất", icon: <LogOut size={14} />, danger: true },
                ],
              }}
              placement="bottomRight"
            >
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 pr-2 rounded-lg transition-all border border-transparent hover:border-gray-200">
                <Avatar 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=NgocAnhThu" 
                    className="border border-blue-100"
                />
                <div className="hidden sm:block text-left leading-tight">
                    <p className="text-sm font-bold text-gray-700 m-0">Anh Thư</p>
                    <p className="text-[10px] text-gray-400 m-0 text-center">Quản trị viên</p>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* CONTENT: Vùng nội dung màu trắng bo góc trên nền xám */}
        <Content className="m-6 p-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-128px)] overflow-hidden">
             {children}
          </div>
        </Content>
      </Layout>
    </Layout>
      </body>
    </html>
  );
}
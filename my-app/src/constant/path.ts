import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
} from "lucide-react";

export const PUBLIC_PATH = {
  HOME: '/',
  COURSES: '/courses',
  MENTORS: '/mentors',
  ABOUT_US: '/about-us',
  CONTACT_US: '/contact-us',
  COMING_SOON: '/comingSoonPage',
  REGISTER: '/register',
  SIGN_IN: '/signIn',
  PROFILE: '/profile',
};

export const ADMIN_MENU_ITEMS = [
  { key: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { key: "/admin/users", icon: Users, label: "Quản lý người dùng" },
  { key: "/admin/courses", icon: BookOpen, label: "Quản lý khóa học" },
  { key: "/comingSoonPage", icon: Settings, label: "Cài đặt" },
];
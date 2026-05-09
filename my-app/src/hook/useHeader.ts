import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PUBLIC_PATH } from "@/src/constant/path";

export const useHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Các state quản lý UI và User
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Các state/ref phục vụ cho tính năng tìm kiếm
  const currentKeyword = searchParams.get("keyword") || "";
  const keywordRef = useRef(currentKeyword);
  const debounceRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 1. Logic kiểm tra đăng nhập
  useEffect(() => {
    const checkLogin = () => {
      const storedUser = localStorage.getItem("userLogin");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkLogin();
    setIsMounted(true);

    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // 2. Logic đăng xuất
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("userLogin");
      setUser(null);
      setIsLoggingOut(false);
      router.push(PUBLIC_PATH.HOME);
      setIsMobileMenuOpen(false);
    }, 800);
  };

  // 3. Logic điều hướng khi tìm kiếm
  const navigateWithKeyword = useCallback(
    (rawKeyword: string, method: "push" | "replace") => {
      const kw = rawKeyword.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (kw) {
        params.set("keyword", kw);
      } else {
        params.delete("keyword");
      }

      const query = params.toString();
      const targetPath = PUBLIC_PATH.COURSES;
      const nextUrl = query ? `${targetPath}?${query}` : targetPath;
      const currentQuery = searchParams.toString();
      const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;

      if (nextUrl === currentUrl) return;

      if (method === "replace") {
        router.replace(nextUrl);
        return;
      }
      router.push(nextUrl);
    },
    [pathname, router, searchParams]
  );

  // 4. Logic tự động tìm kiếm (debounce)
  const handleAutoSearch = useCallback(
    (nextKeyword: string) => {
      keywordRef.current = nextKeyword;
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(() => {
        navigateWithKeyword(nextKeyword, "replace");
      }, 300);
    },
    [navigateWithKeyword]
  );

  // 5. Cập nhật thanh tìm kiếm khi URL thay đổi
  useEffect(() => {
    keywordRef.current = currentKeyword;
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.value = currentKeyword;
    }
  }, [currentKeyword]);

  // 6. Xử lý khi nhấn nút Submit (Enter)
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigateWithKeyword(keywordRef.current, "push");
    setIsMobileMenuOpen(false);
  };

  // Trả về những data và function mà giao diện Header cần dùng
  return {
    user,
    isMounted,
    isLoggingOut,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    handleLogout,
    currentKeyword,
    inputRef,
    handleAutoSearch,
    handleSearch,
    router,
  };
};
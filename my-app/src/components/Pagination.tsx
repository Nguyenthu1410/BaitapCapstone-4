"use client";

import * as React from "react";
import { PaginationProps } from "../types/course";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const generatePagination = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Nếu đang ở các trang đầu
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    // Nếu đang ở các trang cuối
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Nếu đang ở khúc giữa
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = generatePagination();

  return (
    <div className="flex w-max items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm border border-gray-100">
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 text-sm font-medium text-gray-400 hover:text-gray-700 disabled:pointer-events-none disabled:opacity-50"
      >
        Previous
      </button>

      {/* Các số trang */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }

          const isCurrentPage = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                isCurrentPage
                  ? "border border-indigo-500 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 disabled:pointer-events-none disabled:opacity-50"
      >
        Next
      </button>

      {/* Dropdown chọn số item mỗi trang */}
      <div className="ml-4 flex items-center">
        <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="cursor-pointer rounded-md border border-indigo-300 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 outline-none hover:border-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            {/* Sửa lại các option ở đây */}
            <option value={12}>12 / page</option>
            <option value={24}>24 / page</option>
            <option value={36}>36 / page</option>
            <option value={48}>48 / page</option>
          </select>
      </div>
    </div>
  );
};

export default Pagination;

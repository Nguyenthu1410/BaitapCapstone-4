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

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

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
      {/* BUTTON PREVIOUS */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 text-sm font-medium text-gray-400 hover:text-gray-700 disabled:pointer-events-none disabled:opacity-50"
      >
        Previous
      </button>

      {/* SỐ TRANG */}
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

      {/* BUTTON NEXT */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 disabled:pointer-events-none disabled:opacity-50"
      >
        Next
      </button>

      {/* DROPDOWN */}
      <div className="ml-4 flex items-center">
        <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="cursor-pointer rounded-md border border-indigo-300 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 outline-none hover:border-indigo-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={30}>30 / page</option>
            <option value={40}>40 / page</option>
          </select>
      </div>
    </div>
  );
};

export default Pagination;

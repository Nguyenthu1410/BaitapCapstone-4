export interface Course {
    maKhoaHoc: string;
    tenKhoaHoc: string;
    biDanh: string;
    moTa: string;
    luotXem: string;
    hinhAnh: string;
    maNhom: string;
    ngayTao: string;
    soLuongHocVien: number;
    nguoiTao: {
        taiKhoan: string;
        hoTen: string;
    };
    danhMucKhoaHoc: {
        maDanhMucKhoaHoc: string;
        tenDanhMucKhoaHoc: string;

    };
}

export interface Category {
    maDanhMuc: string | number,
    tenDanhMuc: string,
    courses: Course[],

}

export interface CourseCardProps {
    course: Course;
}

export interface Props {
  course: Course;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void; // <--- KIỂM TRA DÒNG NÀY CÓ CHƯA
}
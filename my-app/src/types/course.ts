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
  onItemsPerPageChange: (items: number) => void;
}

export interface PaginatedResponse<T> {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: T[]; 
}

export interface RegisterForm {
  taiKhoan: string,
  matKhau: string,
  hoTen: string,
  soDT: string,
  maLoaiNguoiDung: 'HV',
  maNhom: string,
  email: string
}

export interface SigninForm {
  taiKhoan: string;
  matKhau: string;
}

export interface UserProfile {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  accessToken: string;
}

export interface CoursePayload {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  maDanhMucKhoaHoc: string;
  hinhAnh?: File | string;
  luotXem?: number | string;
  danhGia?: number | string;
  ngayTao?: string;
  maNhom?: string;
  taiKhoanNguoiTao?: string;
}

export interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUpdating: boolean;
  onEdit: (values: CoursePayload) => Promise<boolean>; 
  categories: Category[];
  editingCourse: Course | null;
}

export interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubmitting: boolean;
  onAdd: (values: CoursePayload) => Promise<boolean>;
  categories: Category[];
}

export type UploadMode = 'THEM' | 'CAP_NHAT' | 'CHI_DOI_ANH';
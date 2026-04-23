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
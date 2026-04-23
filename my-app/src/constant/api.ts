export const BASE_URL = 'https://elearningnew.cybersoft.edu.vn/api';

export const MA_NHOM = 'GP01';

export const ENDPOINTS = {
    LAY_DANH_SACH_KHOA_HOC: `${BASE_URL}/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom={MaNhom}`,

    TIM_KIEM_KHOA_HỌC: `${BASE_URL}/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc={tenKhoaHoc}&MaNhom={MaNhom}`,

    LAY_DANH_MUC_KHOA_HOC: `${BASE_URL}/QuanLyKhoaHoc/LayDanhMucKhoaHoc`,

    LAY_THONG_TIN_KHOA_HOC: `${BASE_URL}/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc={MaKhoaHoc}`
}

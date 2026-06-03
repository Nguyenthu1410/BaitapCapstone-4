import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authServices } from '@/src/services/authServices';
import { PUBLIC_PATH } from '@/src/constant/path';

export const useSignIn = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(''); 
    try {
      const result = await authServices.login(formData);

      localStorage.setItem('userLogin', JSON.stringify(result));
      window.dispatchEvent(new Event('storage'));

      alert('Đăng nhập thành công!');
      if (result.maLoaiNguoiDung === 'GV') {
        router.push('/admin/users'); 
      } else {
        router.push(PUBLIC_PATH.HOME); 
      }
      
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status; 
        const errorMessage = error.response.data; 
        setErrorMsg(`Lỗi ${statusCode}: ${errorMessage}`);
      } else {
        setErrorMsg('Lỗi kết nối đến máy chủ!');
      }
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Tính năng khôi phục mật khẩu tự động đang được bảo trì.\nVui lòng liên hệ Hotline: 0961.05.10.14 hoặc Email: info@cybersoft.edu.vn để được Admin cấp lại mật khẩu!");
    setIsForgotPasswordOpen(false);
    setForgotEmail('');
  };

  return {
    formData,
    errorMsg,
    isForgotPasswordOpen,
    forgotEmail,
    setIsForgotPasswordOpen,
    setForgotEmail,
    handleChange,
    handleSubmit,
    handleForgotPasswordSubmit,
  };
};
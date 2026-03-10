import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '@/entities/user/model/authSlice';
import { ModalApproveAction } from '@/shared/ui/ModalApproveAction/ModalApproveAction';
import { UserBar } from '@/shared/ui/UserBar/UserBar';
import css from './UserNav.module.css';
import { useLang } from '@/app/providers/LanguageProvider/LanguageProvider';
import { translations } from '@/shared/config/i18n/translations';

export const UserNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lang } = useLang()
  const t = translations[lang]

  const handleConfirmLogout = () => {
    dispatch(logOut()); 
    setIsModalOpen(false);
    navigate('/'); 
  };
  
  return (
    <div className={css.userNav}>
      <button onClick={() => setIsModalOpen(true)} className={css.logoutBtn}>
        {t.logOut}
      </button>
       <UserBar />

      {isModalOpen && (
        <ModalApproveAction 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleConfirmLogout} 
        />
      )}
    </div>
  );
};
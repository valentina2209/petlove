import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '@/entities/user/model/authSlice';
import { ModalApproveAction } from '@/shared/ui/ModalApproveAction/ModalApproveAction';
import { UserBar } from '@/shared/ui/UserBar/UserBar';
import css from './UserNav.module.css';

export const UserNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    dispatch(logOut()); // Очищаємо Redux та localStorage
    setIsModalOpen(false);
    navigate('/'); // Редирект на головну
  };
  
  return (
    <div className={css.userNav}>
      <button onClick={() => setIsModalOpen(true)} className={css.logoutBtn}>
        Log out
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
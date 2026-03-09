import { useGetCurrentUserQuery } from "@/entities/user/api/userApi";
import { UserBlock } from "@/widgets/UserCard/ui/UserBlock/UserBlock";
import { PetsBlock } from "@/widgets/UserCard/ui/PetsBlock/PetsBlock";
import { MyNotices } from "@/widgets/MyNotices/ui/MyNotices";

import css from "./ProfilePage.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/entities/user/model/authSlice";
import { ModalApproveAction } from "@/shared/ui/ModalApproveAction/ModalApproveAction";

const ProfilePage = () => {
  const { data: user, isLoading, isError } = useGetCurrentUserQuery();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelOpenModal = () => {
    dispatch(logOut())
    setIsModalOpen(false)
    navigate("/")
  }

  if (isLoading) return <div className={css.loader}>Loading...</div>;
  if (isError || !user) return <div className={css.error}>Error loading profile</div>;

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.contentWrapper}>
          
          {/* Ліва колонка: Інфо про юзера та тварини */}
          <div className={css.leftColumn}>
            <div className={css.userCard}>
              <UserBlock />
              <PetsBlock pets={user.pets || []} />
              <button
                className={css.logoutBtn}
                onClick={() => setIsModalOpen(true)}
              >
                Log out
              </button>
            </div>
          </div>

          {/* Права колонка: Таби з оголошеннями */}
          <div className={css.rightColumn}>
            <MyNotices 
              favorites={user.noticesFavorites || []} 
              viewed={user.noticesViewed || []} 
            />
          </div>

          {isModalOpen && (
            <ModalApproveAction
              onClose={() => setIsModalOpen(false)}
              onConfirm={handelOpenModal}
            />
          )}
          
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
import { NavLink, useLocation } from 'react-router-dom';
import css from './UserBar.module.css';
import { useGetCurrentUserQuery } from '@/entities/user/api/userApi';

export const UserBar = () => {
  const { data: user } = useGetCurrentUserQuery();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/" || pathname === "/home";

  return (
    <NavLink to="/profile" className={css.userBar}>
      <div className={css.avatarWrapper}>
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className={css.avatar} />
        ) : (
          <svg className={css.icon}><use href="/public/sprite.svg#userDefault"></use></svg>
        )}
      </div>
      <span className={`${css.userName} ${isHomePage ? css.userWhite : css.userBlack}`}>
        {user?.name || 'User'}
      </span>

      
    </NavLink>
  );
}
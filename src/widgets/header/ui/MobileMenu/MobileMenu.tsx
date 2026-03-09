import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "@/shared/config/navigation";
import { AuthNav } from "../AuthNav/AuthNav";
import { UserNav } from "../UserNav/UserNav";
import sprite from "@/shared/assets/sprite.svg";
import css from "./MobileMenu.module.css";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { LangSwitcher } from "@/features/LangSwitcher/LangSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  isHomePage: boolean;
}

export const MobileMenu = ({ isOpen, onClose, isLoggedIn, isHomePage }: MobileMenuProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={`${css.menuContent} ${isHomePage ? css.whiteBg : css.yellowBg}`}
        onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose} aria-label="Close menu">
          <svg className={`${css.closeIcon} ${isHomePage ? css.closeBlack : css.closeWhite}`}>
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>

        <nav className={css.nav}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${css.navLink} ${isActive ? css.active : ""}`
              }
              onClick={onClose}
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
        
        <div className={css.actions}>
        <LangSwitcher isMobileMenu={true} />
        <ThemeSwitcher isMobileMenu={true} />
       </div>
        
      
        <div className={css.authBlock}>
          <div className={css.forceShowAuth}>
            {isLoggedIn ? <UserNav /> : <AuthNav />}
          </div>
        </div>
      </div>
    </div>,
    document.body 
  );
};
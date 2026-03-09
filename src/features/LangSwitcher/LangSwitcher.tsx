import { useLang } from "@/app/providers/LanguageProvider/LanguageProvider";
import css from "./LangSwitcher.module.css";
import { useLocation } from "react-router-dom";

export const LangSwitcher = ({ isMobileMenu = false }) => {
  const { lang, toggleLang } = useLang();
  const { pathname } = useLocation();
  
  const isHomePage = pathname === "/" || pathname === "/home";
  
  const textColorClass = isMobileMenu ? css.textBlack : (isHomePage ? css.textWhite : css.textBlack);

  return (
    <button className={css.langBtn} onClick={toggleLang}>
      {lang === 'en' ? (
        <div className={css.langWrapper}>
          {/* SVG Британії тут */}
          <svg className={css.flagIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="18" height="18">
            <clipPath id="s">
              <path d="M0,0 v30 h60 v-30 z"/>
            </clipPath>
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#s)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </svg>
          <span className={`${css.text} ${textColorClass}`}>EN</span>
        </div>
      ) : (
        <div className={css.langWrapper}>
          {/* SVG України тут */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 3 2" className={css.flagIcon}>
              <rect width="3" height="1" fill="#0057B7"/>
              <rect width="3" height="1" y="1" fill="#FFD700"/>
            </svg>
          <span className={`${css.text} ${textColorClass}`}>UA</span>
        </div>
      )}
    </button>
  );
};
import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import { useLang } from '@/app/providers/LanguageProvider/LanguageProvider';
import { translations } from '@/shared/config/i18n/translations';

export const AuthNav = () => {
  const { lang } = useLang()
  const t = translations[lang]

  return (
    <div className={css.authNav}>
      <NavLink to="/login" className={css.loginLink}>{t.logIn}</NavLink>
      <NavLink to="/register" className={css.registerLink}>{t.register}</NavLink>
    </div>
  );
};
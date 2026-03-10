import { Link } from 'react-router-dom';
import css from './ModalAttention.module.css';
import { useLang } from '@/app/providers/LanguageProvider/LanguageProvider';
import { translations } from '@/shared/config/i18n/translations';

interface Props {
  onClose: () => void; 
}

export const ModalAttention = ({ onClose }: Props) => {
  const { lang } = useLang()
  const t = translations[lang]
  
  return (
    <div className={css.content}>
      <div className={css.iconWrapper}>
        <img src="/src/shared/assets/dog-avatar.png" alt="Attention" />
      </div>
      <h2 className={css.title}>{t.attention}</h2>
      <p className={css.text}>
        {t.text}
      </p>
      <div className={css.actions}>
        <Link to="/login" className={css.loginBtn}>{t.logIn}</Link>
        <Link to="/register" className={css.registerBtn}>{t.register}</Link>
      </div>
    </div>
  );
};
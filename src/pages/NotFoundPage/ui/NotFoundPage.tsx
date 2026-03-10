import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

import catDesktop from '@/shared/assets/images/404-cat-desktop.png';
import catTablet from '@/shared/assets/images/404-cat-tablet.png';
import catMobile from '@/shared/assets/images/404-cat-mobile.png';
import { Header } from '@/widgets/header';
import { useLang } from '@/app/providers/LanguageProvider/LanguageProvider';
import { translations } from '@/shared/config/i18n/translations';

export const NotFoundPage = () => {
     const { lang } = useLang()
      const t = translations[lang]
    return (
        <>
            <Header />
            <div className="container">
                <div className={css.wrapper}>
                    <picture className={css.picture}>
                        <source srcSet={catDesktop} media="(min-width: 1280px)" />
                        <source srcSet={catTablet} media="(min-width: 768px)" />
                        <img src={catMobile} alt="Cute cat" className={css.catImage} />
                    </picture>
           
                    <Link to="/home" className={css.homeBtn}>
                        {t.btnNot}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
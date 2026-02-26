import { Link } from 'react-router-dom';
import { IMAGES } from '@/shared/config/images';
import { AppPicture } from '@/shared/ui/AppPicture';
import css from './WelcomePage.module.css';

export const WelcomePage = () => {
  return (
    <div className={css.wrapper}>
      <AppPicture 
        {...IMAGES.welcomeScreen} 
        className={css.backgroundImage} 
      />
      <Link to="/home" className={css.logoLink}>
        <AppPicture 
          {...IMAGES.logoWhite}
          className={css.logoImg}
        />
      </Link>
    </div>
  );
};


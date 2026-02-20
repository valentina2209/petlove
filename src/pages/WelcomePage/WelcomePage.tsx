import { Link } from 'react-router-dom';
import { IMAGES } from '@/shared/config/images';
import { AppPicture } from '@/shared/ui/AppPicture';
import styles from './WelcomePage.module.css';

export const WelcomePage = () => {
  return (
    <div className={styles.wrapper}>
      <AppPicture 
        {...IMAGES.welcomeScreen} 
        className={styles.backgroundImage} 
      />
      <Link to="/home" className={styles.logoLink}>
        <AppPicture 
          {...IMAGES.logo}
          className={styles.logoImg}
        />
      </Link>
    </div>
  );
};


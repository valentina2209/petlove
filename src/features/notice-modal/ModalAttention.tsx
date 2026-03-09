import { Link } from 'react-router-dom';
import css from './ModalAttention.module.css';

interface Props {
  onClose: () => void; // Додай це, щоб TypeScript дозволив передавати onClose
}

export const ModalAttention = ({onClose} : Props) => {
  return (
    <div className={css.content}>
      <div className={css.iconWrapper}>
        <img src="/src/shared/assets/dog-avatar.png" alt="Attention" />
      </div>
      <h2 className={css.title}>Attention</h2>
      <p className={css.text}>
        We would like to remind you that certain functionality is available only to authorized users.
        If you have an account, please log in with your credentials. If you do not already have an account,
        you must register to access these features.
      </p>
      <div className={css.actions}>
        <Link to="/login" className={css.loginBtn}>Log In</Link>
        <Link to="/register" className={css.registerBtn}>Registration</Link>
      </div>
    </div>
  );
};
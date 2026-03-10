import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './ModalApproveAction.module.css';
import { useLang } from '@/app/providers/LanguageProvider/LanguageProvider';
import { translations } from '@/shared/config/i18n/translations';

interface ModalApproveActionProps {
  onClose: () => void;
  onConfirm: () => void;
}

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

export const ModalApproveAction = ({ onClose, onConfirm }: ModalApproveActionProps) => {
  const { lang } = useLang()
  const t = translations[lang]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose} aria-label="Close modal">
          <svg className={css.closeIcon}>
            <use href="/public/sprite.svg#icon-close"></use>
          </svg>
        </button>
        
        <div className={css.content}>
            <div className={css.iconPlaceholder}>
                <img src="/src/shared/assets/images/desktop/cat-avatar.png" />
            </div>
          <h2 className={css.title}>{t.already}</h2>
        <div className={css.buttons}>
            <button className={css.confirmBtn} onClick={onConfirm}>{t.yes}</button>
            <button className={css.cancelBtn} onClick={onClose}>{t.cancel}</button>
        </div>
        </div>

        
      </div>
    </div>,
    modalRoot
  );
};
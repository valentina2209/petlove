import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './ModalApproveAction.module.css';

interface ModalApproveActionProps {
  onClose: () => void;
  onConfirm: () => void;
}

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

export const ModalApproveAction = ({ onClose, onConfirm }: ModalApproveActionProps) => {
  // Закриття по клавіші Escape — ознака хорошого тону (UX)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Використовуємо createPortal, щоб винести модалку за межі Header
  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose} aria-label="Close modal">
          <svg className={css.closeIcon}>
            <use href="/src/shared/assets/sprite.svg#icon-close"></use>
          </svg>
        </button>
        
        <div className={css.content}>
            <div className={css.iconPlaceholder}>
                <img src="/src/shared/assets/images/desktop/cat-avatar.png" />
            </div>
            <h2 className={css.title}>Already leaving?</h2>
        <div className={css.buttons}>
          <button className={css.confirmBtn} onClick={onConfirm}>Yes</button>
          <button className={css.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
        </div>

        
      </div>
    </div>,
    modalRoot
  );
};
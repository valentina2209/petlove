import {  ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

const modalRoot = document.querySelector('#modal-root') || document.body;

export const Modal = ({ children, onClose }: ModalProps) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.code === 'Escape') onClose()
        }
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keydown', handleEsc)
        }
    }, [onClose])

    return createPortal(
        <div className={css.backdrop} onClick={(event) => event.target === event.currentTarget && onClose()}>
            <div className={css.container}>
                <button className={css.closeBtn} onClick={onClose}>
                    <svg width="24" height="24">
                        <use href="/sprite.svg#icon-close"></use>
                    </svg>
                </button>
                {children}
            </div>     
        </div>,
        modalRoot
    )
}
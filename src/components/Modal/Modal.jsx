import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({closeModal, children}) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleKeyDown = (event) => {
        event.code === 'Escape' && closeModal();
    };

    const handleOverlayClick = (event) => {
        event.currentTarget === event.target && closeModal();
    };

    return createPortal (
        <div className={s.overlay} onClick={handleOverlayClick}>
            <div className={s.modal}>
                {children}
            </div>
        </div>,
        modalRoot
    )
};

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired
};
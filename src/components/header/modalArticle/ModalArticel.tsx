import { useState, useRef, useEffect } from 'react';

import styles from './ModalArticle.module.css';

export function ModalArticle({ setModalState }: { setModalState: () => void }) {
    /* Сохранение объекта с модальным окном */
    const modalRef = useRef<HTMLDivElement>(null);

    /* Отслеживание клика вне модального окна и изменение его состояния */
    useEffect(() => {
        const handleClick = (event: any): void => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalState();
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return <div ref={modalRef}>
        <div className={styles.backdrop}></div>

        <div className={styles.modalWindow}> </div>
    </div>
}
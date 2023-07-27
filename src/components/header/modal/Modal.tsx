import {useState, useRef, useEffect} from 'react';

import styles from './Modal.module.css';
import {SignIn} from './signIn/SignIn';
import {Registration} from './registration/Registration';

export function Modal({setModalState}: { setModalState: () => void }) {
    /* Состояние модального окна */
    const [entrance, setEntrance] = useState<boolean>(true);

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

    return (
        //Модальное окно
        <div ref={modalRef}>
            <div className={styles.backdrop}></div>

            <div className={styles.modalWindow}>
                <div>
                    <button
                        className={`${
                            entrance ? styles.entranceActive : styles.entranceInActive
                        }`}
                        onClick={() => setEntrance(true)}
                    >
                        Вход
                    </button>
                    <button
                        className={`${
                            entrance ? styles.entranceInActive : styles.entranceActive
                        }`}
                        onClick={() => setEntrance(false)}
                    >
                        Регистрация
                    </button>
                </div>
                {entrance ? <SignIn/> : <Registration/>}
            </div>
        </div>
    );
}

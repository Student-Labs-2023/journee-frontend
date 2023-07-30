import {useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';

import styles from './Dropdown.module.css';

import reportIcon from '../../../img/article/fi-rs-triangle.svg';

export function Dropdown({setDropdown}: { setDropdown: () => void }) {
    //Сохранение объекта с dropdown меню
    const dropdownRef = useRef<HTMLDivElement>(null);

    //Отслеживание клика вне dropdown меню и изменение его состояния
    useEffect(() => {
        const handleClick = (event: any): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown();
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        /* Dropdown меню */

        <div ref={dropdownRef} className={styles.dropdown}>
            <Link className={styles.dropdownButton} to="/" onClick={(e) => {
                e.preventDefault() //Временно onClick
            }}>
                <img className={styles.dropdownImage} src={reportIcon} alt="record"/>
                Пожаловаться
            </Link>
        </div>
    );
}

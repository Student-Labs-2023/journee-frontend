import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

import styles from './Dropdown.module.css';

import recordIcon from '../../../img/header/¦бTВ¦-TВTМTПicons_header.svg';
import routeIcon from '../../../img/header/fi-rs-map-marker.svg';

interface IDropdown {
    setDropdown: () => void;
    setModalArticleState: () => void;
}

export function Dropdown({setDropdown, setModalArticleState}: IDropdown) {
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
        //Dropdown меню
        <div ref={dropdownRef} className={styles.dropdown}>
            <button className={styles.dropdownButton} onClick={() => {
                window.location.replace("/article/create")
            }}>
                <img className={styles.dropdownImage} src={recordIcon} alt="record"/>
                Запись
            </button>
            <Link className={styles.dropdownLink} to="/profile/map">
                <img className={styles.dropdownImage} src={routeIcon} alt="route"/>
                Маршрут
            </Link>
            <Link className={styles.dropdownLink} to="/profile/create">
                <img className={styles.dropdownImage} src={routeIcon} alt="route"/>
                Другое
            </Link>
        </div>
    );
}

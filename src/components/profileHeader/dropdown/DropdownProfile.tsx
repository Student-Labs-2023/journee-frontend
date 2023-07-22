import { useRef, useEffect } from 'react';
import {Link} from "react-router-dom";

import styles from './DropdownProfile.module.css';

import userIcon from "../../../img//profileDropdown/User.svg";
import routeIcon from "../../../img//profileDropdown/fi-rs-map-marker-home.svg";
import favoriteIcon from "../../../img//profileDropdown/fi-rr-bookmark.svg";
import settingsIcon from "../../../img//profileDropdown/fi-rs-settings (1).svg";
import outIcon from "../../../img//profileDropdown/fi-rs-sign-out-alt.svg";

export function DropdownProfile({ setDropdown }: {setDropdown: () => void}) {
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
            <Link className={styles.dropdownLink} to="/profile">
                <img className={styles.dropdownImage} src={userIcon} alt="userIcon" />
                Мой блог
            </Link>
            <Link className={styles.dropdownLink} to="/profile">
                <img className={styles.dropdownImage} src={routeIcon} alt="routeIcon" />
                Мои маршруты
            </Link>
            <Link className={styles.dropdownLink} to="/profile">
                <img className={styles.dropdownImage} src={favoriteIcon} alt="favoriteIcon" />
                Закладки
            </Link>
            <Link className={styles.dropdownLink} to="/profile">
                <img className={styles.dropdownImage} src={settingsIcon} alt="settingsIcon" />
                Настройки
            </Link>
            <Link className={styles.dropdownLink} to="/profile">
                <img className={styles.dropdownImage} src={outIcon} alt="outIcon" />
                Выйти
            </Link>
        </div>
    );
}
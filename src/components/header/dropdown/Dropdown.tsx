import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Dropdown.module.css';

import recordIcon from '../../../img/¦бTВ¦-TВTМTПicons_header.svg';
import routeIcon from '../../../img/fi-rs-map-marker.svg';

interface IDropdown {
  setDropdown: () => void;
  setModalArticleState: () => void;
}

export function Dropdown({ setDropdown, setModalArticleState }: IDropdown) {
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
      <button className={styles.dropdownButton} onClick={() => {setModalArticleState()}}>
        <img className={styles.dropdownImage} src={recordIcon} alt="record" />
        Запись
      </button>
      <Link className={styles.dropdownLink} to="/">
        <img className={styles.dropdownImage} src={routeIcon} alt="route" />
        Маршрут
      </Link>
    </div>
  );
}

import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import '../../styles/bulma.css'
import styles from './ProfileHeader.module.css';

import logoIcon from '../../img/header/Logoicons_header.svg';
import searchIcon from '../../img/header/50.svg';
import buttonIcon from '../../img/header/fi-rs-plus-small.svg';
import notificationIcon from '../../img/header/notificationicons_header.svg';
import userIcon from '../../img/profile/Ellipse 6.png';
import userDropdown from '../../img/profile/fi-rs-angle-small-down.svg';

import {Dropdown} from '../header/dropdown/Dropdown';
import {Modal} from '../header/modal/Modal';
import {ModalArticle} from "../header/modalArticle/ModalArticel";
import {DropdownProfile} from "./dropdown/DropdownProfile";
import {useNotification} from '../../hooks/useNotification';

//Шапка

export function ProfileHeader() {
    /* Состояние dropdown меню*/
    const [dropdownState, setDropdown] = useState<boolean>(false);
    const [dropdownProfile, setDropdownProfile] = useState<boolean>(false);

    /* Состояние модального окна*/
    const [modal, setModal] = useState<boolean>(false);

    const [article, setArticle] = useState<boolean>(false);

    /* Функция, которая передана в Dropdown.tsx для изменения состояния dropdown меню */
    const setDropdownState = (): void => {
        setDropdown(!dropdownState);
    };

    /* Функция, которая передана в SignIn.tsx для изменения состояния модального окна */
    const setModalState = (): void => {
        setModal(!modal);
    };

    const setArticleState = (): void => {
        setArticle(!article);
    };

    const setDropdownProfileState = (): void => {
        setDropdownProfile(!dropdownProfile);
    };

    const ShowNotification = useNotification()

    return (
        /* Шапка */
        <div className={`columns ${styles.header}`}>
            <div className="column is-1"></div>
            {/* Лого */}

            <div className="column is-2">
                <Link to="/">
                    <img className={styles.logo} src={logoIcon} alt="logo"></img>
                </Link>
            </div>

            <div className={`column is-6 ${styles.centerBlock}`}>
                {/* Блок поиска */}

                <div className={styles.searchBlock}>
                    <form className={styles.search}>
                        <div className={styles.searchIcon}>
                            <img src={searchIcon} alt="search"/>
                        </div>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Поиск"
                        />
                    </form>
                </div>
                {/* Блок создания маршрута */}

                <div className={styles.buttonBlock}>
                    <button
                        className={styles.button}
                        onClick={() => setDropdown(!dropdownState)}
                    >
                        <img
                            className={styles.buttonIcon}
                            src={buttonIcon}
                            alt="create a route"
                        />
                        <p className={styles.buttonText}>Создать</p>
                    </button>
                    {/* Dropdown меню */}

                    <CSSTransition
                        in={dropdownState}
                        classNames="alert"
                        timeout={300}
                        unmountOnExit
                    >
                        <Dropdown setDropdown={setDropdownState} setModalArticleState={setArticleState}/>
                    </CSSTransition>
                </div>
            </div>

            {/* Блок пользовтеля */}

            <div className="column is-2">
                <div className={`columns ${styles.user}`}>
                    {/* Блок уведомлений */}

                    <div className="column is-6">
                        <button
                            className={styles.userNotification}
                            onClick={() => ShowNotification("Простите, эта функция ещё не внедрена")}
                        >
                            <img src={notificationIcon} alt="notifications"/>
                        </button>
                    </div>
                    {/* Блок авторизации */}

                    <div className="column is-6">
                        <div className={styles.userProfile} onMouseEnter={() => setDropdownProfile(true)}>
                            <Link to="/profile">
                                <img src={userIcon} alt={'user'}/>
                            </Link>
                            <button className={styles.userProfileButton}
                                    onClick={() => setDropdownProfile(!dropdownProfile)}><img src={userDropdown}
                                                                                              alt={'userDropdown'}/>
                            </button>
                        </div>
                        <CSSTransition
                            in={dropdownProfile}
                            classNames="alert"
                            timeout={300}
                            unmountOnExit
                        >
                            <DropdownProfile setDropdown={setDropdownProfileState}/>
                        </CSSTransition>
                    </div>
                </div>
            </div>
            <div className="column is-1"></div>

            {/* Модальное окно входа & регистрации */}

            <CSSTransition in={modal} classNames="modal" timeout={300} unmountOnExit>
                <Modal setModalState={setModalState}/>
            </CSSTransition>

            <CSSTransition in={article} classNames="modal" timeout={300} unmountOnExit>
                <ModalArticle setModalState={setArticleState}/>
            </CSSTransition>

        </div>
    );
}

import {useState} from 'react';
import {NavLink, Link, useLocation} from 'react-router-dom';

import styles from './OtherUserPage.module.css';

import profileIcon from '../../img/otherUserPage/Ellipse 6 (2).png'
import detailsIcon from '../../img/otherUserPage/fi-rr-menu-dots (1).svg'
import {article} from "../../data/Article";
import {ArticleCard} from "../../components/mainpage/ArticleCard";
import {CSSTransition} from "react-transition-group";
import {Dropdown} from "../../components/otherpage/dropdown/Dropdown";
import { SideBar } from '../../components/sidebar/SideBar';

export function OtherUserPage() {
    const {state} = useLocation(); //Временно useLocation
    /* Состояние dropdown меню*/

    const [dropdown, setDropdown] = useState<boolean>(false);

    /* Функция, которая передана в Dropdown.tsx для изменения состояния dropdown меню */
    const setDropdownState = (): void => {
        setDropdown(!dropdown);
    };

    return (
        // Главная страница
        <div className={`columns ${styles.main}`}>
            <div className="column is-1"></div>
            {/* Медиа */}

            <div className="column is-2">
                <SideBar />
            </div>
            {/* Подгрузка карточек со статьями */}

            <div className="column is-6">
                <div className={styles.profile}>
                    <div className="columns">
                        <div className="column is-8">
                            <div className={styles.profileBlock}>
                                <img src={profileIcon} alt={profileIcon}/>
                                <div className={styles.profileUser}>
                                    <p className={styles.profileUserName}>Александр</p>
                                    <div>
                                        <p className={styles.profileUserRating}>+ 1034</p>
                                        <strong className={styles.profileUserSubs}>680</strong>
                                        <p className={styles.profileUserSubs}>подписчиков</p>
                                    </div>
                                </div>
                            </div>
                            <p className={styles.profileUserStatus}>Пишу и редактирую про туризм в Journee</p>
                        </div>
                        <div className="column is-4 has-text-right">
                            <div className={styles.profileActionBlock}>
                                <button className={styles.profileSubscribe}>
                                    Подписаться
                                </button>

                                <button className={styles.profileDetails} onClick={() => setDropdown(!dropdown)}>
                                    <img className={styles.profileDetailsIcon} src={detailsIcon} alt={detailsIcon}/>
                                </button>

                                {/* Dropdown меню */}
                                <CSSTransition
                                    in={dropdown}
                                    classNames="alert"
                                    timeout={300}
                                    unmountOnExit
                                >
                                    <Dropdown setDropdown={setDropdownState}/>
                                </CSSTransition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-2"></div>
            <div className="column is-1"></div>
        </div>
    );
}
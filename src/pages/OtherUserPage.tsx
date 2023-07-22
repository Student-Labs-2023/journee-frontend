import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import styles from './OtherUserPage.module.css';

import profileIcon from '../img/otherUserPage/Ellipse 6 (2).png'
import detailsIcon from '../img/otherUserPage/fi-rr-menu-dots (1).svg'
import {article} from "../data/Article";
import {ArticleCard} from "../components/mainpage/ArticleCard";
import {CSSTransition} from "react-transition-group";
import {Dropdown} from "../components/otherpage/dropdown/Dropdown";

export function OtherUserPage() {
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
                <h2 className={styles.mediaTitle}>Медиа</h2>
                <nav>
                    <NavLink
                        className={({ isActive }: { isActive: boolean }) =>
                            isActive
                                ? `${styles.categoryPopularActive}`
                                : `${styles.categoryPopularInActive}`
                        }
                        to="/profile"
                        end
                    >
                        Популярное
                    </NavLink>
                    <NavLink
                        className={({ isActive }: { isActive: boolean }) =>
                            isActive
                                ? `${styles.categoryFreshActive}`
                                : `${styles.categoryFreshInActive}`
                        }
                        to="/profile/other"
                        end
                    >
                        Свежее
                    </NavLink>
                </nav>
                {/* Сервисы */}

                <h2 className={styles.servicesTitle}>Сервисы</h2>
                <nav>
                    <NavLink
                        className={({ isActive }: { isActive: boolean }) =>
                            isActive
                                ? `${styles.categoryRoutesActive}`
                                : `${styles.categoryRoutesInActive}`
                        }
                        to="/"
                        end
                    >
                        Маршруты
                    </NavLink>
                </nav>
                {/* Доп. информация */}

                <div className={styles.details}>
                    <Link className={styles.advertisement} to="/advertisement">
                        Заказать рекламу
                    </Link>
                    <div className={styles.otherBlock}>
                        <Link className={styles.other} to="/project">
                            О проекте
                        </Link>
                        <Link className={styles.other} to="/help">
                            Помощь
                        </Link>
                    </div>
                </div>
            </div>
            {/* Подгрузка карточек со статьями */}

            <div className="column is-6">
                <div className={styles.profile}>
                    <div className="columns">
                        <div className="column is-8">
                            <div className={styles.profileBlock}>
                                <img src={profileIcon} alt={profileIcon} />
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
                                    <Dropdown setDropdown={setDropdownState} />
                                </CSSTransition>
                            </div>
                        </div>
                    </div>
                </div>
                {article.map((prop) => (
                    <ArticleCard props={prop} />
                ))}
            </div>
            <div className="column is-2"></div>
            <div className="column is-1"></div>
        </div>
    );
}
import {NavLink, Link, useLocation} from 'react-router-dom';

import styles from './ProfilePage.module.css';

import profileIcon from '../../img/profilePage/Ellipse 6 (1).png'
import settingsIcon from '../../img/profilePage/fi-rs-settings.svg'
import createArticleIcon from '../../img/profilePage/fi-rs-pencil.svg'

export function ProfilePage() {
    const {state} = useLocation();

    //console.log(state.data.user);

    return (
        // Главная страница
        <div className={`columns ${styles.main}`}>
            <div className="column is-1"></div>
            {/* Медиа */}

            <div className="column is-2">
                <h2 className={styles.mediaTitle}>Медиа</h2>
                <nav>
                    <NavLink
                        className={({isActive}: { isActive: boolean }) =>
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
                        className={({isActive}: { isActive: boolean }) =>
                            isActive
                                ? `${styles.categoryFreshActive}`
                                : `${styles.categoryFreshInActive}`
                        }
                        to="/profile/other"
                        end

                        state={state}
                    >
                        Свежее {/*Временно state={state} */}
                    </NavLink>
                </nav>
                {/* Сервисы */}

                <h2 className={styles.servicesTitle}>Сервисы</h2>
                <nav>
                    <NavLink
                        className={({isActive}: { isActive: boolean }) =>
                            isActive
                                ? `${styles.categoryRoutesActive}`
                                : `${styles.categoryRoutesInActive}`
                        }
                        to="/"
                        end

                        onClick={(e) => {
                            e.preventDefault() //Временно onClick
                        }}
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
                        <div className="column is-10">
                            <div className={styles.profileBlock}>
                                <img src={profileIcon} alt={profileIcon}/>
                                <div className={styles.profileUser}>
                                    <p className={styles.profileUserName}>{state.data.user.user_metadata.fullName}</p>
                                    <div>
                                        <p className={styles.profileUserRating}>+ 0</p>
                                        <strong className={styles.profileUserSubs}>0</strong>
                                        <p className={styles.profileUserSubs}>подписчиков</p>
                                    </div>
                                </div>
                            </div>
                            <button className={styles.profileUserButton}>Изменить описание</button>
                        </div>
                        <div className="column is-2 has-text-right">
                            <button className={styles.profileSettings}>
                                <img src={settingsIcon} alt={settingsIcon}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.profile}>
                    <div className="columns">
                        <div className="column is-8">
                            <p className={styles.article}>Напишите первую статью, чтобы привлечь читателей в ваш
                                блог</p>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-6">
                            <button className={styles.articleButton}>
                                <img src={createArticleIcon} alt={createArticleIcon}/>
                                <p className={styles.articleButtonText}>Создать статью</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-2"></div>
            <div className="column is-1"></div>
        </div>
    );
}
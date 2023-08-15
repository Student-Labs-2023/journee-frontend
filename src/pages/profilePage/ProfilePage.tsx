import {NavLink, Link, useLocation} from 'react-router-dom';

import styles from './ProfilePage.module.css';

import profileIcon from '../../img/profilePage/Ellipse 6 (1).png'
import settingsIcon from '../../img/profilePage/fi-rs-settings.svg'
import createArticleIcon from '../../img/profilePage/fi-rs-pencil.svg'
import { useEffect, useState } from 'react';
import { SideBar } from '../../components/sidebar/SideBar';
import { useNotification } from '../../hooks/useNotification';

export function ProfilePage() {
    const {state} = useLocation();
    const [User, setUser] = useState({} as any)
    const showNotification = useNotification()
    
    useEffect(() => {
        fetch(`http://178.170.192.87/rest/v1/users?id=eq.${localStorage.getItem("user_id")}`, {
            method:"GET",
            headers:{
                apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q",
                "Accept-Profile":"auth"
            }
        }).then(response => response.json())
        .then(user => {
            setUser(user[0])
        })
        .catch(console.error)
        // fetch user by token/id from localstorage
    }, [])

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
                        <div className="column is-10">
                            <div className={styles.profileBlock}>
                                <img src={profileIcon} alt={profileIcon}/>
                                <div className={styles.profileUser}>
                                    <p className={styles.profileUserName}>{User?.raw_user_meta_data?.fullName}</p>
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
                            <button onClick={() => showNotification("Простите, эта функция ещё не внедрена")} className={styles.profileSettings}>
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
                                <p className={styles.articleButtonText} onClick={() => window.location.replace("/article/create")}>Создать статью</p>
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
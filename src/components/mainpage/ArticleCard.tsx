import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';

import {Article} from '../../interface/Article';

import detailsIcon from '../../img/article/fi-rr-menu-dots.svg';
import imgAuthor from '../../img/user_icon.png';

import styles from './ArticleCard.module.css';
import {Dropdown} from './dropdown/Dropdown';

//Расширение интерфейса из входящих данных

interface ArticleProps {
    props: Article,
    onClick:() => void
}

export function ArticleCard({props, onClick}: ArticleProps) {
    //Состояния лайков, комментариев и сохраненок

    const [like, setLike] = useState<boolean>(false);
    const [comment, setComment] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    /* Состояние dropdown меню*/
    const [imgArticle, setImgArticle] = useState<string>("");
    useEffect(() => {
        fetch(props.imgArticle, {
            method:"GET",
            headers:{
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE`,
                "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q"
            }
        }).then(response => response.blob())
        .then(blob => {
            setImgArticle(URL.createObjectURL(blob))
        })
        .catch(console.error)
    }, [])

    const [dropdown, setDropdown] = useState<boolean>(false);

    /* Функция, которая передана в Dropdown.tsx для изменения состояния dropdown меню */
    const setDropdownState = (): void => {
        setDropdown(!dropdown);
    };

    return (
        //Карточка статьи

        <div className={styles.articleWindow} onClick={onClick||(() => {})}>
            {/* Блок информации автора */}
            <div className={`columns ${styles.articleWindowAuthor}`}>
                <div className={`column is-7 `}>
                    <div className={styles.authorBlock}>
                        <img src={imgAuthor} alt={props.autor}/>
                        <div className={styles.detailsBlock}>
                            <Link className={styles.authorName} to="/">
                                {props.autor}
                            </Link>
                            <div>
                                <Link className={styles.details} to="/">
                                    {props.city}
                                </Link>
                                <p className={styles.comma}>,</p>
                                <Link className={styles.details} to="/">
                                    {props.category}
                                </Link>
                            </div>
                        </div>
                        <p className={`${styles.detailsTime}`}>{props.time}ч</p>
                    </div>
                </div>
                <div className={`column is-5`}>
                    <div className={styles.buttonBlock}>
                        <button className={styles.buttonSubscribe}>Подписаться</button>
                        <div className={styles.reportBlock}>
                            <button
                                onClick={() => setDropdown(!dropdown)}
                                className={styles.buttonDetails}
                            >
                                <img src={detailsIcon} alt={props.autor}/>
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
            {/* Заголовок и текст */}

            <div className={styles.articleWindowText}>
                <div className="columns">
                    <div className={`column if-full ${styles.articleTitle}`}>
                        {props.titleArticle}
                    </div>
                </div>
                <div className="columns">
                    <div className={`column if-full ${styles.articleText}`}>
                        {props.textArticle}
                    </div>
                </div>
            </div>
            {/* Фото */}

            <div className="columns">
                <div className="column if-full">
                    <img
                        className={styles.articleImage}
                        src={imgArticle}
                        alt={styles.articleTitle}
                    />
                </div>
            </div>
            <div>
                {/* Лайки, комментарии и сохраненки */}
                <div className="columns">
                    <div className={`column is-4`}>
                        <div className={`${styles.userBlock} ${styles.userSection}`}>
                            <div
                                onClick={() => setLike(!like)}
                                className={like ? styles.userLikesActive : styles.userLikes}
                            >
                                {props.likes}
                            </div>
                            <div
                                onClick={() => setComment(!comment)}
                                className={
                                    comment ? styles.userCommentsActive : styles.userComments
                                }
                            >
                                {props.comments}
                            </div>
                        </div>
                    </div>
                    <div className={`column is-8`}>
                        <div
                            onClick={() => setSaved(!saved)}
                            className={`${styles.userSection} ${
                                saved ? styles.userFavoriteActive : styles.userFavorite
                            }`}
                        >
                            {'ㅤ'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import {NavLink, Link} from 'react-router-dom';

import {ArticleCard} from '../../components/mainpage/ArticleCard';

import styles from './FreshPage.module.css';

import {get as get_articles} from '../../data/Article';
import { useEffect, useState } from 'react';
import { SideBar } from '../../components/sidebar/SideBar';

export function FreshPage() {
    const [Articles, setArticles] = useState([])
    useEffect(() => {
        get_articles().then(res => {
            setArticles(res)
        })
    }, [])
    return (
        // Главная страница
        <div key="FreshPage" className={`columns ${styles.main}`}>
            <div className="column is-1"></div>
            {/* Медиа */}

            <div className="column is-2">
                <SideBar />
            </div>
            {/* Подгрузка карточек со статьями */}

            <div className={`column is-6 ${styles.scroll}`}>
                {Articles.map((prop) => (
                    <ArticleCard props={prop}/>
                ))}
            </div>
            <div className="column is-2"></div>
            <div className="column is-1"></div>
        </div>
    );
}

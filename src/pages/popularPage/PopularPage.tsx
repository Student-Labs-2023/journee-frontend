import {ArticleCard} from '../../components/mainpage/ArticleCard';

import styles from './PopularPage.module.css';

import {get as get_articles} from '../../data/Article';
import {useEffect, useState} from 'react';
import {SideBar} from '../../components/sidebar/SideBar';
import ModalWatchArticle from '../../components/article/ModalWatchArticle/ModalWatchArticle';

export function PopularPage() {
    let height: any;

    const [Articles, setArticels] = useState([])
    useEffect(() => {
        get_articles().then(res => {
            setArticels(res)
        })
    }, [])

    const [CurrentArticle, setCurrentArticle] = useState<string|false>(false)

    return (
        // Главная страница
        <div key="PopularPage" className={`columns ${styles.main}`}>
            <div className="column is-1"></div>
            {/* Медиа */}

            <div className="column is-2">
                <SideBar/>
            </div>
            {/* Подгрузка карточек со статьями */}

            <div className={`column is-6 ${styles.scroll}`}>
                {Articles.map((prop) => (
                    <ArticleCard props={prop} onClick={() => {setCurrentArticle((prop as any).article_url)}}/>
                ))}
            </div>

            <div className="column is-2"></div>
            <div className="column is-1"></div>

            <ModalWatchArticle current={CurrentArticle} setCurrent={setCurrentArticle} />
        </div>
    );
}

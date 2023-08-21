import {NavLink, Link} from 'react-router-dom';

import {ArticleCard} from '../../components/mainpage/ArticleCard';

import styles from './RoutesPage.module.css';

import {article} from '../../data/Article';
import { SideBar } from '../../components/sidebar/SideBar';

export function RoutesPage() {
    return (
        // Главная страница
        <div key="RoutesPage" className={`columns ${styles.main}`}>
            <div className="column is-1"></div>
            {/* Медиа */}

            <div className="column is-2">
                <SideBar />
            </div>
            {/* Подгрузка карточек со статьями */}

            <div className="column is-6">
                {/* {article.map((prop) => (
                    <ArticleCard props={prop}/>
                ))} */}
            </div>
            <div className="column is-2"></div>
            <div className="column is-1"></div>
        </div>
    );
}

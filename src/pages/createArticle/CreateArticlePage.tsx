import styles from './CreateArticlePage.module.css';

import { SideBar } from '../../components/sidebar/SideBar';
import { CreateArticle } from '../../components/article/CreateArticle';

export default function CreateArticlePage() {
    return (
        // Главная страница
        <div key="FreshPage" className={`columns ${styles.main}`}>
            <div className="column is-1"></div>
            {/* Медиа */}

            <div className="column is-2">
                {/* <SideBar /> */}
            </div>
            {/* Подгрузка карточек со статьями */}

            <div className="column is-6">
                <CreateArticle />
            </div>
            <div className="column is-2"></div>
            <div className="column is-1"></div>
        </div>
    );
}

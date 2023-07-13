import { NavLink, Link } from 'react-router-dom';

import { ArticleCard } from '../components/mainpage/ArticleCard';

import styles from './PopularPage.module.css';

import { article } from '../data/Article';

export function PopularPage() {
  return (
    // Главная страница
    <div className={`columns ${styles.main}`}>
      {/* Медиа */}

      <div className={`column is-one-fifth ${styles.nav}`}>
        <h2 className={styles.mediaTitle}>Медиа</h2>
        <nav>
          <NavLink
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? `${styles.categoryPopularActive}`
                : `${styles.categoryPopularInActive}`
            }
            to="/"
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
            to="/fresh"
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
            to="/routes"
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

      <div className={`column ${styles.cards}`}>
        {article.map((prop) => (
          <ArticleCard props={prop} />
        ))}
      </div>
      <div className="column is-3"></div>
    </div>
  );
}

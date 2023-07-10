import { Link } from 'react-router-dom';

import '../../bulma/bulma.css';
import styles from './Header.module.css';

import logoIcon from '../../img/Logoicons_header.svg';
import searchIcon from '../../img/50.svg';
import buttonIcon from '../../img/fi-rs-plus-small.svg';
import notificationIcon from '../../img/notificationicons_header.svg';
import userIcon from '../../img/Usericons_header.svg';

//Шапка

export function Header() {
  return (
    /* Шапка */
    <div className="columns">
      <div className={`column ${styles.header}`}>
        <div className="columns is-5">
          {/* Лого */}

          <div className="column is-one-fifth">
            <Link to="/">
              <img className={styles.logo} src={logoIcon} alt="logo"></img>
            </Link>
          </div>
          {/* Блок поиска и кнопки создания */}

          <div className="column">
            <div className="columns">
              {/* Блок поиска */}

              <div className="column">
                <form className={styles.search}>
                  <div className={styles.searchIcon}>
                    <img src={searchIcon} alt="search" />
                  </div>
                  <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Поиск"
                  />
                </form>
              </div>
              {/* Блок создания маршрута */}

              <div className="column is-one-third">
                <button
                  className={styles.button}
                  onClick={() => console.log('Создать маршрут')}
                >
                  <img
                    className={styles.buttonIcon}
                    src={buttonIcon}
                    alt="create a route"
                  />
                  <p className={styles.buttonText}>Создать</p>
                </button>
              </div>
            </div>
          </div>
          {/* Блок пользовтеля */}

          <div className="column is-one-fifth">
            <div className={`columns ${styles.user}`}>
              {/* Блок уведомлений */}

              <div className="column">
                <button
                  className={styles.userNotification}
                  onClick={() => console.log('Открыть уведомления')}
                >
                  <img src={notificationIcon} alt="notifications" />
                </button>
              </div>
              {/* Блок авторизации */}

              <div className="column is-three-fifths">
                <button
                  className={styles.userAuthorization}
                  onClick={() => console.log('Войти')}
                >
                  <img
                    className={styles.userAuthorizationImage}
                    src={userIcon}
                    alt="sign in"
                  />
                  <p className={styles.userAuthorizationText}>Войти</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

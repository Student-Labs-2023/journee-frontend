import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import '../../bulma/bulma.css';
import styles from './Header.module.css';

import logoIcon from '../../img/Logoicons_header.svg';
import searchIcon from '../../img/50.svg';
import buttonIcon from '../../img/fi-rs-plus-small.svg';
import notificationIcon from '../../img/notificationicons_header.svg';
import userIcon from '../../img/Usericons_header.svg';

import { Dropdown } from './dropdown/Dropdown';
import { Modal } from './modal/Modal';
import AuthButton from '../auth/buttons/AuthButton';

//Шапка

export function Header() {
  /* Состояние dropdown меню*/
  const [dropdownState, setDropdown] = useState<boolean>(false);

  /* Состояние модального окна*/
  const [modal, setModal] = useState<boolean>(false);

  /* Функция, которая передана в Dropdown.tsx для изменения состояния dropdown меню */
  const setDropdownState = (): void => {
    setDropdown(!dropdownState);
  };

  /* Функция, которая передана в SignIn.tsx для изменения состояния модального окна */
  const setModalState = (): void => {
    setModal(!modal);
  };

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
                  onClick={() => setDropdown(!dropdownState)}
                >
                  <img
                    className={styles.buttonIcon}
                    src={buttonIcon}
                    alt="create a route"
                  />
                  <p className={styles.buttonText}>Создать</p>
                </button>
                {/* Dropdown меню */}

                <CSSTransition
                  in={dropdownState}
                  classNames="alert"
                  timeout={300}
                  unmountOnExit
                >
                  <Dropdown setDropdown={setDropdownState} />
                </CSSTransition>
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
                <AuthButton
                  className={styles.userAuthorization}
                  //onClick={() => setModal(!modal)} Жалко😢, но тут будет auth0
                >
                  <img
                    className={styles.userAuthorizationImage}
                    src={userIcon}
                    alt="sign in"
                  />
                  <p className={styles.userAuthorizationText}>Войти</p>
                </AuthButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно входа & регистрации */}

      <CSSTransition in={modal} classNames="modal" timeout={300} unmountOnExit>
        <Modal setModalState={setModalState} />
      </CSSTransition>
    </div>
  );
}

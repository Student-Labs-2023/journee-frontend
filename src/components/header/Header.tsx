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
import {ModalArticle} from "./modalArticle/ModalArticel";

//Шапка

export function Header() {
  /* Состояние dropdown меню*/
  const [dropdownState, setDropdown] = useState<boolean>(false);

  /* Состояние модального окна*/
  const [modal, setModal] = useState<boolean>(false);

  const [article, setArticle] = useState<boolean>(false);

  /* Функция, которая передана в Dropdown.tsx для изменения состояния dropdown меню */
  const setDropdownState = (): void => {
    setDropdown(!dropdownState);
  };

  /* Функция, которая передана в SignIn.tsx для изменения состояния модального окна */
  const setModalState = (): void => {
    setModal(!modal);
  };

  const setArticleState = (): void => {
      setArticle(!article);
  };

  return (
    /* Шапка */
    <div className={`columns ${styles.header}`}>
      <div className="column is-1"></div>
      {/* Лого */}

      <div className="column is-2">
        <Link to="/">
          <img className={styles.logo} src={logoIcon} alt="logo"></img>
        </Link>
      </div>

      <div className={`column is-6 ${styles.centerBlock}`}>
        {/* Блок поиска */}

        <div className={styles.searchBlock}>
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

        <div className={styles.buttonBlock}>
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
            <Dropdown setDropdown={setDropdownState} setModalArticleState={setArticleState} />
          </CSSTransition>
        </div>
      </div>

      {/* Блок пользовтеля */}

      <div className="column is-2">
        <div className={`columns ${styles.user}`}>
          {/* Блок уведомлений */}

          <div className="column is-6">
            <button
              className={styles.userNotification}
              onClick={() => console.log('Открыть уведомления')}
            >
              <img src={notificationIcon} alt="notifications" />
            </button>
          </div>
          {/* Блок авторизации */}

          <div className="column is-6">
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
      <div className="column is-1"></div>

      {/* Модальное окно входа & регистрации */}

      <CSSTransition in={modal} classNames="modal" timeout={300} unmountOnExit>
        <Modal setModalState={setModalState} />
      </CSSTransition>

        <CSSTransition in={article} classNames="modal" timeout={300} unmountOnExit>
            <ModalArticle setModalState={setArticleState} />
        </CSSTransition>

    </div>
  );
}

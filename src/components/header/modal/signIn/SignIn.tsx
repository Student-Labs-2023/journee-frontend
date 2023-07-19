import { Link } from 'react-router-dom';

import google from '../../../../img/Icons_SignIn/Google.svg';
import vk from '../../../../img/Icons_SignIn/VK.svg';
import appleId from '../../../../img/Icons_SignIn/Apple.svg';

import styles from './SignIn.module.css';

export function SignIn() {
  return (
    //Блок входа

    <div>
      {/* Форма входа */}

      <form className={styles.authorizationBlock}>
        <input
          className={styles.authorizationInput}
          type="email"
          placeholder="Почта"
        />
        <input
          className={styles.authorizationInput}
          type="password"
          placeholder="Пароль"
        />
        <button className={styles.authorizationButton} type="submit">
          Войти
        </button>
      </form>
      {/* Виджеты */}

      <div className={styles.authorizationWidgets}>
        <button
          onClick={() => console.log('Вход через Google')}
          className={`${styles.widgets} ${styles.widgetsGoogle}`}
        >
          <img src={google} alt="googleSignIn" />
        </button>
        <button
          onClick={() => console.log('Вход через VK')}
          className={`${styles.widgets} ${styles.widgetsVK}`}
        >
          <img src={vk} alt="VKSignIn" />
        </button>
        <button
          onClick={() => console.log('Вход через AppleID')}
          className={`${styles.widgets} ${styles.widgetsApple}`}
        >
          <img src={appleId} alt="AppleIDSignIn" />
        </button>
      </div>
      {/* Пользовательское соглашение */}

      <p className={styles.agreement}>
        Нажимая "Войти", я соглашаюсь с тем, что я прочитал и принял{' '}
        <Link className={styles.agreementLink} to="agreement">
          Пользовательское соглашение
        </Link>
      </p>
    </div>
  );
}

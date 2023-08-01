import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from 'react-router-dom';
import axios from "axios";

import google from '../../../../img/Icons_SignIn/Google.svg';
import vk from '../../../../img/Icons_SignIn/VK.svg';
import appleId from '../../../../img/Icons_SignIn/Apple.svg';

import styles from './SignIn.module.css';
import {useInput} from "../../../../hooks/validation/useInput";

type createLoginRequest = {
    email: string;
    password: string;
};

export function SignIn() {
    const navigate = useNavigate();

    const email = useInput('', {isEmpty: true});
    const password = useInput('', {isEmpty: true, minLength: 6});

    const [isReady, setReady] = useState<boolean>(false);
    const [isEmail, setEmail] = useState<string>("");
    const [isPassword, setPassword] = useState<string>("");

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        setReady(true);
    };

    async function signIn() {
        try {
            const {data, status} = await axios.post<createLoginRequest>(
                'http://178.170.192.87/auth/v1/login?grant_type=password',
                {email: isEmail, password: isPassword},
            );

            console.log(JSON.stringify(data, null, 4));
            localStorage.setItem("token", (data as any).access_token)
            localStorage.setItem("user_id", (data as any).user.id)
            console.log(status);

            return navigate('/profile', {state: {data}});
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                // 👇️ error: AxiosError<any, any>
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    useEffect((): void => {
        if (isReady) {
            void signIn();

            setReady(false);
        }
    }, [isReady])


    return (
        //Блок входа

        <>
            {/* Форма входа */}

            <form onSubmit={onSubmit} className={styles.authorizationBlock}>
                <input
                    onBlur={e => email.onBlur(e)}
                    value={email.value}
                    className={styles.authorizationInput}
                    type="email"
                    placeholder="Почта"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                        email.onChange(e);
                    }}

                />
                {(email.isDirty && email.isEmpty) &&
                    <div className={styles.errorMessage}>Поле не может быть пустым</div>}
                <input
                    onBlur={e => password.onBlur(e)}
                    value={password.value}
                    className={styles.authorizationInput}
                    type="password"
                    placeholder="Пароль"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                        password.onChange(e);
                    }}
                />
                {(password.isDirty && password.isEmpty) &&
                    <div className={styles.errorMessage}>Поле не может быть пустым</div>}
                {(password.isDirty && password.minLengthError) &&
                    <div className={styles.errorMessage}>Длина пароля от 6 символов</div>}
                <button disabled={!email.inputValid || !password.inputValid} className={styles.authorizationButton}
                        type="submit">
                    Войти
                </button>
            </form>
            {/* Виджеты */}

            <div className={styles.authorizationWidgets}>
                <button
                    onClick={() => console.log('Вход через Google')}
                    className={`${styles.widgets} ${styles.widgetsGoogle}`}
                >
                    <img src={google} alt="googleSignIn"/>
                </button>
                <button
                    onClick={() => console.log('Вход через VK')}
                    className={`${styles.widgets} ${styles.widgetsVK}`}
                >
                    <img src={vk} alt="VKSignIn"/>
                </button>
                <button
                    onClick={() => console.log('Вход через AppleID')}
                    className={`${styles.widgets} ${styles.widgetsApple}`}
                >
                    <img src={appleId} alt="AppleIDSignIn"/>
                </button>
            </div>
            {/* Пользовательское соглашение */}

            <p className={styles.agreement}>
                Нажимая "Войти", я соглашаюсь с тем, что я прочитал и принял{' '}
                <Link className={styles.agreementLink} to="agreement">
                    Пользовательское соглашение
                </Link>
            </p>
        </>
    );
}

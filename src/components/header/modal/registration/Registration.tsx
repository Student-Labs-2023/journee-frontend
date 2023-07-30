import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

import google from '../../../../img/Icons_SignIn/Google.svg';
import vk from '../../../../img/Icons_SignIn/VK.svg';
import appleId from '../../../../img/Icons_SignIn/Apple.svg';

import styles from './Registration.module.css';

const apiKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'

type createRegisterRequest = {
    fullName: string;
    email: string;
    password: string;
};

export function Registration() {
    const navigate = useNavigate();

    const [isReady, setReady] = useState<boolean>(false);
    const [isFullName, setFullName] = useState<string>("");
    const [isEmail, setEmail] = useState<string>("");
    const [isPassword, setPassword] = useState<string>("");

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        setReady(true);
    };

    async function register(): Promise<void> {
        const {data, status} = await axios.post<createRegisterRequest>(
            'http://178.170.192.87/auth/v1/signup', // 👈 ❗️❗️ URL для регистрации замени в ковычках, ответ выводится в консоль
            {
                email: isEmail, password: isPassword, data: {
                    fullName: isFullName,
                }
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "apikey": apiKey,
                }
            }
        );

        console.log(JSON.stringify(data, null, 4));
        localStorage.setItem("token", (data as any).access_token)
        localStorage.setItem("user_id", (data as any).user.id)
        console.log(status);

        return navigate('/profile', {state: {data}});
    }

    useEffect((): void => {
        if (isReady) {
            void register();

            setReady(false);
        }
    }, [isReady])

    return (
        //Блок регистрации

        <>
            {/* Форма регистрации */}

            <form onSubmit={onSubmit} className={styles.authorizationBlock}>
                <input
                    className={styles.authorizationInput}
                    type="text"
                    placeholder="Имя и фамилия"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                />
                <input
                    className={styles.authorizationInput}
                    type="email"
                    placeholder="Почта"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <input
                    className={styles.authorizationInput}
                    type="password"
                    placeholder="Пароль"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <button className={styles.authorizationButton} type="submit">
                    Зарегистрироваться
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
                Нажимая "Зарегистрироваться", я соглашаюсь с тем, что я прочитал и
                принял{' '}
                <Link className={styles.agreementLink} to="agreement">
                    Пользовательское соглашение
                </Link>
            </p>
        </>
    );
}

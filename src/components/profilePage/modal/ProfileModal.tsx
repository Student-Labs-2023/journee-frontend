import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";

import styles from './ProfileModal.module.css'
import axios from "axios";
import {useNotification} from "../../../hooks/useNotification";
import {useNavigate} from "react-router-dom";
import {useInput} from "../../../hooks/validation/useInput";

const apiKey: string = ''

type createRegisterRequest = {
    password: string;

    raw_user_meta_data: { fullName: string }
};

export function ProfileModal({setModalState}: { setModalState: () => void }) {
    const navigate = useNavigate();

    const showNotification = useNotification()

    const fullName = useInput('', {isEmpty: true});
    const password = useInput('', {isEmpty: true, minLength: 6});

    const [isReady, setReady] = useState<boolean>(false);

    const [isFullName, setFullName] = useState<string>("");
    const [isPassword, setPassword] = useState<string>("");

    /* Сохранение объекта с модальным окном */
    const modalRef = useRef<HTMLDivElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        setReady(true);
    };

    /* Отслеживание клика вне модального окна и изменение его состояния */
    useEffect(() => {
        const handleClick = (event: any): void => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalState();
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    async function change(): Promise<void> {
        const {data, status} = await axios.put<createRegisterRequest>(
            'http://178.170.192.87/auth/v1/put', // 👈 ❗️❗️ URL для регистрации замени в ковычках, ответ выводится в консоль

            isPassword && isFullName ? {
                password: isPassword,
                data: {fullName: isFullName}
            } : isPassword ? {password: isPassword} : isFullName ? {data: {fullName: isFullName}} : {},
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "apikey": apiKey,
                }
            }
        );

        showNotification("Данные изменены");
        console.log(JSON.stringify(data, null, 4));
        console.log(status);

        return navigate('/profile', {state: {data}});
    }

    useEffect((): void => {
        if (isReady) {
            void change();

            setReady(false);
        }
    }, [isReady])

    return (
        <div ref={modalRef}>
            <div className={styles.backdrop}></div>

            <div className={styles.modal}>
                <form onSubmit={onSubmit} className={styles.form}>
                    <p className={styles.title}>Изменение данных</p>
                    <input value={fullName.value}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               setFullName(e.target.value);
                               fullName.onChange(e);
                           }} className={styles.input} type={'text'} placeholder={'Введите новое имя'}/>
                    <input value={password.value}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               setPassword(e.target.value);
                               password.onChange(e);
                           }} className={styles.input} type={'text'} placeholder={'Введите новый пароль'}/>
                    <button className={styles.button}
                            type={'submit'}>Изменить
                    </button>
                </form>
            </div>
        </div>
    )
}
import { createContext, useContext, useState } from "react"
import style from "../styles/Notification.module.css"

export function useNotification() {
    const [List, setList] = useContext(NotificationContext) as [string[], React.Dispatch<React.SetStateAction<string[]>>]
    return (data:string, delay:number = 3000) => {
        setList((e) => [...e, data])
        setTimeout(() => {
            setList((e) => e.slice(1))
        }, delay)
    }
}

const NotificationContext = createContext(["", () => {}] as any)

export function NotificationNode() {
    const [List, _] = useContext(NotificationContext) as [string[], React.Dispatch<React.SetStateAction<string[]>>]
    return (
        <>
        {List.length === 0 ? <></> : 
            <ul className={style.container}>
                {List.map((el, i) => <li key={Math.random()}>{el}</li>)}
            </ul>
        }
        </>
    )
}

export function NotificationContextProvider(props:React.PropsWithChildren) {
    const NotificationListState = useState([] as string[])
    return (<NotificationContext.Provider value={NotificationListState}>
        {props.children}
    </NotificationContext.Provider>)
}
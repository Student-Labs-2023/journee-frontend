import { useAuth0 } from "@auth0/auth0-react"

export default function AuthButton(props:React.PropsWithChildren<any>) {
    const { loginWithPopup } = useAuth0()
    function onClick(props:any) {
        return (...args:any) => {
            //props.onClick(...args)
            loginWithPopup()
        }
    }
    return (
        <button {...props} onClick={onClick(props)}>
            {props.children}
        </button>
    )
}
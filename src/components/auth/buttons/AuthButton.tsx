import Auth0Lock from "auth0-lock"

export default function AuthButton(props:React.PropsWithChildren<any>) {
    function onClick(props:any) {
        return (...args:any) => {
            if ("onClick" in props) {props.onClick(...args)}
            const lock = new Auth0Lock("BFpoQ0SsiPTgGRlfMDzoUrNjc7nPqqWx", "dev-vrsblas6ves78ir5.us.auth0.com", {
                "theme":{
                    "primaryColor":"#FF933CB2",
                    "logo":"/logo.svg",
                    "hideMainScreenTitle":true,
                },
                "language":"ru",
                "autoclose":true
            })
            lock.on("authenticated", (e) => {
                // console.log(e)
                lock.getUserInfo(e.accessToken, console.log)
            })
            lock.show()
        }
    }
    return (
        <button {...props} onClick={onClick(props)}>
            {props.children}
        </button>
    )
}
import { useAuth0 } from "@auth0/auth0-react"

export default function LogIn() {
    const {loginWithPopup} = useAuth0()
    return (<button onClick={() => {loginWithPopup()}}>log in</button>)
}
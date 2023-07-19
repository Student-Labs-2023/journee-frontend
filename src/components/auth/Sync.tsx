import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"

export default function Sync() {
    const {isLoading, isAuthenticated, user} = useAuth0()
    useEffect(() => {
        if (localStorage.getItem("token") !== null || isLoading || !isAuthenticated || user === undefined) return;
        
        fetch('http://localhost:8080/auth', {
            method:'POST',
            "headers":{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(res => res.text()).then(res => {
            localStorage.setItem('token', res)// setting response(token) in localstorage
        }).catch(err => console.error(err))
    }, [isLoading, isAuthenticated, user])
    return (<></>)
}
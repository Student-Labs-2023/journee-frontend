import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"

export default function Sync() {
    const {isLoading, isAuthenticated, user} = useAuth0()
    useEffect(() => {
        if (isLoading || !isAuthenticated || user === undefined) return;
        
        fetch("http://localhost:8080/auth", {
            method:"POST",
            "headers":{
                "Content-Type":"application/json",
            },
            "body":JSON.stringify(user)
        }).then(res => res.text()).then(res => {
            console.log(res)
        }).catch(err => console.error(err))
    }, [isLoading, isAuthenticated, user])
    return (<></>)
}
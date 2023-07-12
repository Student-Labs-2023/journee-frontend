import {Auth0Provider} from '@auth0/auth0-react'
import React from 'react'
import Sync from './Sync'

export default function AuthProvider({children}:React.PropsWithChildren) {
    return (
    <Auth0Provider
        domain='dev-vrsblas6ves78ir5.us.auth0.com'// test application
        clientId='BFpoQ0SsiPTgGRlfMDzoUrNjc7nPqqWx'
        authorizationParams={{
            "redirect_uri":window.location.origin
        }}
    >
        <Sync />
        {children}
    </Auth0Provider>)
}
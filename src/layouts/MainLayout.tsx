import {Outlet} from 'react-router-dom';
import {Header} from '../components/header/Header';
import { ProfileHeader } from '../components/profileHeader/ProfileHeader';
import {NotificationContextProvider, NotificationNode} from '../hooks/useNotification';

export function MainLayout() {
    return (
        <NotificationContextProvider>
            <NotificationNode/>
            {"user_id" in localStorage && "token" in localStorage ? <ProfileHeader/> : <Header/>}
            <Outlet/>
        </NotificationContextProvider>
    );
}

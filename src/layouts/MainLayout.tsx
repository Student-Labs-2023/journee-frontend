import {Outlet} from 'react-router-dom';
import {Header} from '../components/header/Header';
import { ProfileHeader } from '../components/profileHeader/ProfileHeader';

export function MainLayout() {
    return (
        <>
            {"user_id" in localStorage && "token" in localStorage ? <ProfileHeader/> : <Header/>}
            <Outlet/>
        </>
    );
}

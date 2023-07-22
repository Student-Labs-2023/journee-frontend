import { Outlet } from 'react-router-dom';
import { ProfileHeader } from '../components/profileHeader/ProfileHeader';

export function ProfileLayout() {
    return (
        <div>
            <ProfileHeader />
            <Outlet />
        </div>
    );
}
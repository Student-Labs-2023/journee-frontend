import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {PopularPage} from './pages/popularPage/PopularPage';
import {FreshPage} from './pages/freshPage/FreshPage';
import {RoutesPage} from './pages/routesPage/RoutesPage';
import {MainLayout} from './layouts/MainLayout';
import {ProfilePage} from "./pages/profilePage/ProfilePage";
import {ProfileLayout} from "./layouts/ProfileLayout";
import {OtherUserPage} from "./pages/otherUserPage/OtherUserPage";
import CreateArticlePage from './pages/createArticle/CreateArticlePage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<PopularPage/>}/>
                    <Route path="/fresh" element={<FreshPage/>}/>
                    <Route path="/routes" element={<RoutesPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/profile/other" element={<OtherUserPage/>}/>
                    <Route path="/article/create" element={<CreateArticlePage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

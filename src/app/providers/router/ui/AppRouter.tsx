import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout/MainLayout";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import Loader from "@/app/layouts/Loader/Loader";

const NewsPage = lazy(() => import("@/pages/news/ui/NewsPage").then(m => ({ default: m.NewsPage })));
const FriendsPage = lazy(() => import("@/pages/friends/ui/FriendsPage").then(m => ({ default: m.FriendsPage })));
const NoticesPage = lazy(() => import("@/pages/notices/NoticesPage").then(m => ({ default: m.NoticesPage })));
const RegisterPage = lazy(() => import("@/pages/register/RegisterPage").then(m => ({ default: m.RegisterPage })));
const LoginPage = lazy(() => import("@/pages/login/LoginPage").then(m => ({ default: m.LoginPage })));
const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"));
const AddPetPage = lazy(() => import("@/pages/AddPetPage/AddPetPage"));
const WelcomePage = lazy(() => import("@/pages/welcome/WelcomePage").then(m => ({ default: m.WelcomePage })));
const HomePage = lazy(() => import("@/pages/home/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage")); 

function AppRouter() {
    return (
        <Suspense fallback={<div><Loader/></div>}>
            <Routes>
                <Route path="/" element={<WelcomePage />} />

                <Route element={<MainLayout />}>
                    <Route path="/register" element={<PublicRoute component={<RegisterPage />} />} />
                    <Route path="/login" element={<PublicRoute component={<LoginPage />} />} />
                
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/notices" element={<NoticesPage />} />
                    <Route path="/friends" element={<FriendsPage />} />
                
                    <Route path="/profile" element={<PrivateRoute component={<ProfilePage />} />} />
                    <Route path="/add-pet" element={<PrivateRoute component={<AddPetPage />} />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>

        </Suspense>
      
    );
}

export default AppRouter;
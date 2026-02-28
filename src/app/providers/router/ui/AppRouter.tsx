import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout/MainLayout";
import { NewsPage } from "@/pages/news/ui/NewsPage";
import { FriendsPage } from "@/pages/friends/ui/FriendsPage";
import { NoticesPage } from "@/pages/notices/NoticesPage";
import { RegisterPage } from "@/pages/register/RegisterPage";

const WelcomePage = lazy(() => import("@/pages/welcome/WelcomePage").then(module => ({ default: module.WelcomePage })));
const HomePage = lazy(() =>
    Promise.all([
        import("@/pages/home/HomePage"),
        new Promise(resolve => setTimeout(resolve, 10000))
    ]).then(([module]) => module)
);
    

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />

            <Route element={<MainLayout />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/notices" element={<NoticesPage />} />
                <Route path="/friends" element={<FriendsPage />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;
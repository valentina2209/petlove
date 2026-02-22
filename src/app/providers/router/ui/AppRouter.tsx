import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout/MainLayout";

const WelcomePage = lazy(() => import("@/pages/WelcomePage/WelcomePage").then(module => ({ default: module.WelcomePage })));
const HomePage = lazy(() =>
    Promise.all([
        import("@/pages/HomePage/HomePage"),
        new Promise(resolve => setTimeout(resolve, 10000))
    ]).then(([module]) => module)
);
    

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />

            <Route element={<MainLayout />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;
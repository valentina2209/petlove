import { Header } from "@/app/layouts/MainLayout/Header"
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";


function MainLayout() {
    return (
        <>
            <Header />
            <Suspense fallback={<Loader />}>
                <main>
                    <Outlet />
                </main>
            </Suspense>
        </>
    );
}

export default MainLayout;
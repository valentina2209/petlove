import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./Loader";
import { Header } from "@/widgets/header/ui/Header";

function MainLayout() {
    return (
        <div className="app-layout">
            <Header />
            <Suspense fallback={<Loader />}>
                <main>
                    <Outlet />
                </main>
            </Suspense>
        </div>
    );
}

export default MainLayout;
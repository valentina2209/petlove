import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {  useSelector } from "react-redux";
import { RootState } from "@/app/providers/StoreProvider/store";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { LangSwitcher } from "@/features/LangSwitcher/LangSwitcher";
import { IMAGES } from "@/shared/config/images";
import { AppPicture } from "@/shared/ui/AppPicture";
import { NAV_LINKS } from "@/shared/config/navigation";
import { UserNav } from "../UserNav/UserNav";
import { AuthNav } from "../AuthNav/AuthNav";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import css from "./Header.module.css";


export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
    const isHomePage = pathname === "/" || pathname === "/home";
    
    const logoData = isHomePage ? IMAGES.logoHome : IMAGES.logo;
    console.log("isLoggedIn:", isLoggedIn);
    return (
        <header className={`${css.header} ${isHomePage ? css.home : ""}`}>
            <div className="container">
                <div className={css.innerContainer}>
                    <NavLink to="/home" className={css.logo}>
                        <AppPicture {...logoData} />
                    </NavLink>  

                    <nav className={css.desktopNav}>
                        {NAV_LINKS.map(link => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `${css.navLink} ${isActive ? css.active : ""}`
                                }
                            >
                                {link.title}
                            </NavLink>
                        ))}
                    </nav>

                    <div className={css.headerThemeSwitcher}>
                        <LangSwitcher />
                        <ThemeSwitcher />
                    </div> 
                    
                    <div className={css.rightSide}>
                        {isLoggedIn ? (
                            <div className={css.userWrapper}>
                                <UserNav />
                            </div>
                        ) : (
                            <div className={css.desktopOnly}>
                                <AuthNav />
                            </div>   
                        )}
                        
                    
                        <button
                            className={css.burgerBtn}
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <svg className={`${css.burgerIcon} ${isHomePage ? css.iconWhite : css.iconBlack}`}>
                                <use href="/src/shared/assets/sprite.svg#icon-burger"></use>
                            </svg>
                        </button>
                    </div>


                </div>
            </div>


            <MobileMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                isLoggedIn={isLoggedIn}
                isHomePage={isHomePage}
            />
        </header>
    );
};
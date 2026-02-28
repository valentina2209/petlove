import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IMAGES } from "@/shared/config/images";
import { AppPicture } from "@/shared/ui/AppPicture";
import { NAV_LINKS } from "@/shared/config/navigation";
import css from "./Header.module.css";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    // Перевірка на головну сторінку
    const isHomePage = pathname === "/" || pathname === "/home";
    
    // Логотип змінюється автоматично
    const logoData = isHomePage ? IMAGES.logoHome : IMAGES.logo;

    return (
        <header className={`${css.header} ${isHomePage ? css.home : ""}`}>
            <div className="container">
                <div className={css.innerContainer}>
                    {/* LOGO */}
                    <NavLink to="/" className={css.logo}>
                        <AppPicture {...logoData} />
                    </NavLink>  

                    {/* NAVIGATION */}
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

                    {/* ACTIONS */}
                    <div className={css.rightSide}>
                        <div className={css.authContainer}>
                            <NavLink
                                to="/login"
                                className={`${css.loginBtn} ${isHomePage ? css.loginWhite : css.loginOrange}`}
                            >
                                Log In
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={css.regBtn}
                            >
                                Registration
                            </NavLink>
                        </div>

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
        </header>
    );
};
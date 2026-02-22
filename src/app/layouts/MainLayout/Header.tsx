import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom";
import { IMAGES } from "@/shared/config/images"
import { AppPicture } from "@/shared/ui/AppPicture"
import { NAV_LINKS } from "@/shared/config/navigation";
import css from "./Header.module.css"

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation()

    const isHomePage = pathname === "/";
    const isLoggedIn = false;

    const toggleLanguage = () => {
        console.log("Зміна мови")
    }

    return (
        <header className={`${css.header} ${isHomePage ? css.homeVariant : css.defaultVariant}`}>
            <div className={css.container}>
                <Link to="/" className={css.logo}>
                    <AppPicture {...(isHomePage ? IMAGES.logoWhite : IMAGES.logo)} />
                </Link>

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

                <div className={css.rightSide}>
                    <button className={css.langBtn} onClick={toggleLanguage}>
                        UA
                    </button>

                    <label className={css.themeSwitch}>
                        <input type="checkbox" />
                        <span className={css.slider}></span>
                    </label>

                    {/* {isLoggedIn ? <UserBar /> : <AuthNav />} */}
                    <div className={css.authContainer}>
                        <button className={css.loginBtn}>Log In</button>
                        <button className={css.regBtn}>Registration</button>
                    </div>

                    <button
                        className={css.burgerBtn}
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg className={css.burgerIcon}>
                            <use href="/src/shared/assets/sprite.svg#icon-burger"></use>
                        </svg>
                    </button>
                </div> 
            </div>

            {/* {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />} */}
        </header>
    )
}
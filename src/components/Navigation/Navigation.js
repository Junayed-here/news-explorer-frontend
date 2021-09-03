import './Navigation.css';
import logout from "../../images/logout.png";
import logoutBlack from "../../images/logout-black.png";
import {NavLink} from "react-router-dom";
import React from "react";

function Navigation(props) {
    const {loggedIn,theme,handleSignInClick,handleSignOutClick,activeMenu,mobileMenuToggle,popUpOpened} = props;

    function signIn(){
        handleSignInClick();
    }

    return (
        <nav className={(popUpOpened ? `popupOpened `:'') + (activeMenu ? `mobileMenu__active `:'') + 'nav '+`nav__${theme}`}>
            <div className="container">
                <div className="nav__content ">
                    <NavLink className="logo" to="/">NewsExplorer</NavLink>
                    <div className="mobileMenu" onClick={mobileMenuToggle}>
                        <span className="mobileMenu__bar"></span>
                        <span className="mobileMenu__bar"></span>
                    </div>
                    {
                        loggedIn ?
                            <div className="nav__menu_box">
                                <ul className="nav__menu" >
                                    <li className="nav__menu__item">
                                        <NavLink exact to="/" className="nav__link" activeClassName="active">Home</NavLink>
                                    </li>
                                    <li className="nav__menu__item">
                                        <NavLink to="/saved-news" className="nav__link" activeClassName="active">Saved articles</NavLink>
                                    </li>
                                </ul>
                                <button className="button nav__signOut_button" onClick={handleSignOutClick}>
                                    Elise
                                    {
                                        (theme == 'light' && !activeMenu) ?
                                            <img className="nav__signOut_button_icon" src={logoutBlack } alt="logout"/>
                                            :
                                            <img className="nav__signOut_button_icon" src={logout } alt="logout"/>
                                    }
                                </button>
                            </div>
                            :
                            <div className="nav__menu_box">
                                <ul className="nav__menu" >
                                    <li className="nav__menu__item">
                                        <NavLink to="/" className="nav__link" activeClassName="active">Home</NavLink>
                                    </li>
                                </ul>
                                <button className="button nav__signIn_button" onClick={signIn}>Sign in</button>
                            </div>
                    }

                </div>
            </div>
        </nav>
    );
}

export default Navigation;

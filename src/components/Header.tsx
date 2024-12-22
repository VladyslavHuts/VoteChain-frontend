import React, { useState } from 'react';
import '../styles/header.css';
import logo from '../assets/images/header__logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/account');
        } else {
            setIsLoggedIn(true);
        }
    };

    return (
        <div className="header">
            <div className="container">
                <div className="header__container">
                    <div className="header__wrap">
                        <Link to="/">
                            <img className="header__logo" src={logo} alt="VoteChain" />
                        </Link>
                        <nav className="header__nav">
                            <ul className="header__list">
                                <li className="header__item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "header__link active" : "header__link"
                                        }
                                        to="/"
                                    >
                                        VoteChain
                                    </NavLink>
                                </li>
                                <li className="header__item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "header__link active" : "header__link"
                                        }
                                        to="/about"
                                    >
                                        About the platform
                                    </NavLink>
                                </li>
                                <li className="header__item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "header__link active" : "header__link"
                                        }
                                        to="/how-it-works"
                                    >
                                        How it works
                                    </NavLink>
                                </li>
                                <li className="header__item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "header__link active" : "header__link"
                                        }
                                        to="/active-votes"
                                    >
                                        Active votes
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <button
                        className="header__btn"
                        onClick={handleButtonClick}
                    >
                        {isLoggedIn ? 'Account' : 'Connect'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;

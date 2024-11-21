import React, {Component} from 'react';
import '../styles/header.css';
import logo from '../assets/images/header__logo.svg';
import { Link } from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="container">
                    <div className="header__container ">
                        <div className="header__wrap">
                            <img className="header__logo" src={logo} alt="VoteChain"/>
                            <nav className="header__nav">
                                <ul className="header__list">
                                    <li className="header__item">
                                        <Link className="header__link" to="/">VoteChain</Link>
                                    </li>
                                    <li className="header__item"><Link to="">About the platform</Link></li>
                                    <li className="header__item"><Link to="">How it works</Link></li>
                                    <li className="header__item">
                                        <Link className="header__link" to="/active-votes">Active votes</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <button className="header__btn">Log in</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
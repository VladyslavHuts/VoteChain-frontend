import React, {Component} from 'react';
import '../styles/header.css';
import logo from '../assets/images/header__logo.svg';


class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="container">
                    <div className="header__wrap">
                        <div className="header__container">
                            <img className="header__logo" src={logo} alt=""/>
                            <nav className="header__nav">
                                <ul className="header__list">
                                    <li className="header__item"><a href=""> VoteChain</a></li>
                                    <li className="header__item"><a href="">About the platform</a></li>
                                    <li className="header__item"><a href="">How it works</a></li>
                                    <li className="header__item"><a href="">Active votes</a></li>
                                </ul>
                            </nav>
                        </div>
                        <button className="header__btn">Log in </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
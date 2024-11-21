import React, {Component} from 'react';
import '../styles/showcase.css';
import metamsk from '../assets/images/showcase__metamask.svg';
import logo from "../assets/images/header__logo.svg";

class Showcase extends Component {
    render() {
        return (
            <div className="showcase">
                <div className="container">
                    <div className="showcase__container">
                        <h1 className="showcase__title"> VoteChain: <br/> Decentralized Voting System</h1>
                        <p className="showcase__description">Secure. Transparent. Accessible. Experience a new way of voting powered by the Ethereum blockchain. </p>
                        <button className="showcase__button"> Connect <img className="showcase__button-img" src={metamsk} alt="Not found"/> </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Showcase;
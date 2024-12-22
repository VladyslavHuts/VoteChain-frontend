import React, { useState } from 'react';
import '../styles/showcase.css';
import metamask from '../assets/images/showcase__metamask.svg';
import { useNavigate } from 'react-router-dom';

const Showcase: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/active-votes');
        } else {
            setIsLoggedIn(true);
        }
    };

    return (
        <div className="showcase">
            <div className="container">
                <div className="showcase__container">
                    <h1 className="showcase__title">VoteChain: <br /> Decentralized Voting System</h1>
                    <p className="showcase__description">
                        Secure. Transparent. Accessible. Experience a new way of voting powered by the Ethereum blockchain.
                    </p>
                    <button className="showcase__button" onClick={handleButtonClick}>
                        {isLoggedIn ? 'Go Vote' : 'Connect'}
                        {!isLoggedIn && (
                            <img className="showcase__button-img" src={metamask} alt="Not found" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Showcase;

import React, { useState, useEffect } from 'react';
import '../styles/showcase.css';
import metamask from '../assets/images/showcase__metamask.svg';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

declare global {
    interface Window {
        ethereum?: any;
    }
}

const Showcase: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Перевірка токену в localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }

        // Відстеження події дисконекту MetaMask
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountChange);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountChange);
            }
        };
    }, []);

    const handleAccountChange = (accounts: string[]) => {
        if (accounts.length === 0) {
            disconnectWallet();
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                const userBalance = await provider.getBalance(address);

                const response = await connectUserToDB({ metamaskAdress: address });

                if (response.token) {
                    localStorage.setItem('authToken', response.token); // Зберігаємо токен у localStorage
                    setIsLoggedIn(true);
                }

            } catch (err: any) {
                console.error("User rejected the request or error occurred:", err.message || err);
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    const disconnectWallet = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    const connectUserToDB = async (data: { metamaskAdress: string }): Promise<{ token?: string }> => {
        try {
            // Тут можна додати запит до бекенду для підключення користувача
            return { token: "fakeToken" }; // Тестовий токен
        } catch (error: any) {
            console.error("Error connecting user:", error.response?.data || error.message);
            throw error;
        }
    };

    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/active-votes');
        } else {
            connectWallet();
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

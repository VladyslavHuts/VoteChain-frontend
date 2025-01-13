import React, { useState, useEffect } from 'react';
import '../styles/header.css';
import logo from '../assets/images/header__logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import axios from 'axios';

declare global {
    interface Window {
        ethereum?: any;
    }
}

const API_URL = "http://localhost:80";

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [balance, setBalance] = useState<string | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [message, setMessage] = useState("");
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
                setAccount(address);
                setBalance(ethers.formatEther(userBalance));

                const response = await connectUserToDB({ metamaskAdress: address });

                if (response.token) {
                    localStorage.setItem('authToken', response.token); // Зберігаємо токен у localStorage
                    setIsLoggedIn(true);
                }

                setMessage(response.message || "Action completed successfully.");
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
        setAccount(null);
        setBalance(null);
        setMessage("Disconnected from wallet.");
    };

    const connectUserToDB = async (data: { metamaskAdress: string }): Promise<{ token?: string; message?: string }> => {
        try {
            const response = await axios.post(`${API_URL}/login`, data);
            return response.data as { token?: string; message?: string }; // Явне приведення типу
        } catch (error: any) {
            console.error("Error connecting user:", error.response?.data || error.message);
            throw error;
        }
    };

    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/account');
        } else {
            connectWallet();
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

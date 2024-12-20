import React, { Component } from "react";
import card__img from "../assets/images/card__img-user.svg";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export interface CardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    onDetails: () => void;
}

const Card: React.FC<CardProps> = ({ id, title, description, imageUrl, onDetails }) => {
    const navigate = useNavigate();

    return (
        <div
            className="card"
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
        >
            <div className="card__header">
                <h2 className="card__title">{title}</h2>
            </div>
            <div className="card__main">
                <div className="card__info">
                    <img src={imageUrl} alt={title} className="card__image" />
                    <p className="card__description">{description}</p>
                </div>
            </div>
            <div className="card__actions">
                <button
                    className="card__button card__button--vote"
                    onClick={() => navigate(`/Voting/${id}`)}
                >
                    Vote
                </button>
                <button
                    className="card__button card__button--details"
                    onClick={onDetails}
                >
                    Details
                </button>
            </div>
        </div>
    );
};

class Created extends Component {
    render() {
        const cards = [
            {
                id: "1",
                title: "Sample Card 1",
                description: "Description for Sample Card 1",
                imageUrl: card__img,
                onVote: () => {},
                onDetails: () => alert("Details for Card 1!")
            },
            {
                id: "2",
                title: "Sample Card 2",
                description: "Description for Sample Card 2",
                imageUrl: card__img,
                onVote: () => {},
                onDetails: () => alert("Details for Card 2!")
            }
        ];
        return (
            <div className="account__cards">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        {...card}
                    />
                ))}
                <div className="account__addCard">
                    <Link className="account__link" to="">
                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="58" fill="#111111" stroke="#E8E8E8" stroke-width="4"/>
                            <rect x="55.5" y="16" width="9" height="90" fill="#D9D9D9"/>
                            <rect x="15" y="65.5" width="9" height="90" transform="rotate(-90 15 65.5)"
                                  fill="#D9D9D9"/>
                        </svg>
                        <span className="account__addTitle">Create a poll</span>
                    </Link>
                </div>

            </div>
        );
    }
}

export default Created;
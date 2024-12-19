import React, {Component, useState} from 'react';
import card__img from "../assets/images/card__img-user.svg";
import { useNavigate } from "react-router-dom";

export interface CardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    onDetails: () => void;
}

const Card: React.FC<CardProps> = ({ id, title, description, imageUrl, onDetails }) => {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    const handleVote = () => {
        navigate(`/vote/${id}`);
    };

    return (
        <div
            className={`card ${hovered ? "card--hovered" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
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
                <button className="card__button card__button--vote" onClick={handleVote}>
                    Vote
                </button>
                <button className="card__button card__button--details" onClick={onDetails}>
                    Details
                </button>
            </div>
        </div>
    );
};

class MyVotes extends Component {
    render() {
        const cards = [
            {
                id: "1",
                title: "My votes Card 1",
                description: "This is a description of the my votes card 1.",
                imageUrl: card__img,
                onDetails: () => alert("Details for card 1!")
            },
            {
                id: "2",
                title: "My votes Card 2",
                description: "This is a description of the my votes card 2.",
                imageUrl: card__img,
                onDetails: () => alert("Details for card 2!")
            },
            {
                id: "3",
                title: "My votes Card 3",
                description: "This is a description of the my votes card 3.",
                imageUrl: card__img,
                onDetails: () => alert("Details for card 3!")
            },
            {
                id: "4",
                title: "My votes Card 4",
                description: "This is a description of the my votes card 4.",
                imageUrl: card__img,
                onDetails: () => alert("Details for card 4!")
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
            </div>
        );
    }
}

export default MyVotes;
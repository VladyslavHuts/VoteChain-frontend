import React, {Component, useState} from 'react';
import card__img from "../assets/images/card__img-user.svg";

export interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    onVote: () => void;
    onDetails: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, onVote, onDetails }) => {
    const [hovered, setHovered] = useState(false);

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
                <button className="card__button card__button--vote" onClick={onVote}>
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
                title: "My votes Card",
                description: "This is a description of the my votes card.",
                imageUrl: card__img,
                onVote: () => alert("Voted!"),
                onDetails: () => alert("Details!")
            },
            {
                title: "My votes Card",
                description: "This is a description of the my votes card.",
                imageUrl: card__img,
                onVote: () => alert("Voted!"),
                onDetails: () => alert("Details!")
            },
            {
                title: "My votes Card",
                description: "This is a description of the my votes card.",
                imageUrl: card__img,
                onVote: () => alert("Voted!"),
                onDetails: () => alert("Details!")
            },
            {
                title: "My votes Card",
                description: "This is a description of the my votes card.",
                imageUrl: card__img,
                onVote: () => alert("Voted!"),
                onDetails: () => alert("Details!")
            }
        ];
        return (
            <div className="account__cards">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        title={card.title}
                        description={card.description}
                        imageUrl={card.imageUrl}
                        onVote={card.onVote}
                        onDetails={card.onDetails}
                    />
                ))}
            </div>
        );
    }
}

export default MyVotes;
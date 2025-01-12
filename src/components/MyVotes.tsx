import React, { useState } from "react";
import card__img from "../assets/images/card__img-user.svg";
import { useNavigate } from "react-router-dom";
import Details from "./Details";

export interface CardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    isClosed: boolean;
    onDetails: () => void;
}

export const Card: React.FC<CardProps> = ({ id, title, description, imageUrl, isClosed, onDetails }) => {
    const navigate = useNavigate();

    return (
        <div className={`card ${isClosed ? "card--closed" : ""}`}>
            {isClosed && <div className="card__overlay"></div>}
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
                    onClick={() => !isClosed && navigate(`/Voting/${id}`)}
                    disabled={isClosed}
                >
                    Vote
                </button>
                <button
                    className="card__button card__button--details"
                    onClick={onDetails}
                    disabled={isClosed}
                >
                    Details
                </button>
            </div>
        </div>
    );
};

const MyVotes: React.FC = () => {
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [isDetailsOpen, setDetailsOpen] = useState(false);

    const cards = [
        {
            id: "1",
            title: "Green Future Initiative",
            description: "This is a description of the Green Future Initiative.",
            imageUrl: card__img,
            isClosed: false,
        },
        {
            id: "2",
            title: "Clean Energy Project",
            description: "This is a description of the Clean Energy Project.",
            imageUrl: card__img,
            isClosed: false,
        },
        {
            id: "3",
            title: "My Votes Card 3",
            description: "This is a description of the My Votes Card 3.",
            imageUrl: card__img,
            isClosed: true,
        },
    ];

    const handleDetails = (id: string) => {
        setSelectedCardId(id);
        setDetailsOpen(true);
    };

    const selectedCard = cards.find((card) => card.id === selectedCardId);

    return (
        <div>
            <div className="account__cards">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        {...card}
                        onDetails={() => handleDetails(card.id)}
                    />
                ))}
            </div>

            {selectedCard && (
                <Details
                    isOpen={isDetailsOpen}
                    onClose={() => setDetailsOpen(false)}
                    title={selectedCard.title}
                    description={selectedCard.description}
                    startDate="2025-01-01"
                    endDate="2025-12-31"
                />
            )}
        </div>
    );
};

export default MyVotes;

import React, { useState } from 'react';
import '../styles/card.css';
import сomplaint from '../assets/images/complaint.png';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    onVote: () => void;
    onDetails: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, onVote, onDetails }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="card">
            <div className="card__header">
                <h2 className="card__title">{title}</h2>
                <div className="card__buttons--complaint">
                    <button
                        className="card__button--complaint"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        {hovered ? (
                            "Complaint"
                        ) : (
                            <img src={сomplaint} alt="Complaint"/>
                        )}
                    </button>
                </div>
            </div>
            <div className="card__main">
                <div className="card__info">
                    <img src={imageUrl} alt={title} className="card__image"/>
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

export default Card;

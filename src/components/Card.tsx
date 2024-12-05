import React, { useState } from "react";
import ComplaintModal from "../components/ComplaintModal";
import Details from "../components/Details";
import "../styles/card.css";
import complaint from "../assets/images/complaint.png";

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    onVote: () => void;
    onDetails: () => void;
}


const Card: React.FC<CardProps> = ({ title, description, imageUrl, onVote }) => {
    const [hovered, setHovered] = useState(false);
    const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const openComplaintModal = () => {
        setIsComplaintModalOpen(true);
    };

    const closeComplaintModal = () => {
        setIsComplaintModalOpen(false);
    };

    const openDetailsModal = () => {
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    return (
        <div className="card">
            <div className="card__header">
                <h2 className="card__title">{title}</h2>
                <div className="card__buttons--complaint">
                    <button
                        className="card__button--complaint"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onClick={openComplaintModal}
                    >
                        {hovered ? "Complaint" : <img src={complaint} alt="Complaint" />}
                    </button>
                </div>
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
                <button
                    className="card__button card__button--details"
                    onClick={openDetailsModal}
                >
                    Details
                </button>
            </div>

            {isComplaintModalOpen && <ComplaintModal onClose={closeComplaintModal} />}

            {isDetailsModalOpen && (
                <Details
                    isOpen={isDetailsModalOpen}
                    onClose={closeDetailsModal}
                    title={title}
                    description={description}
                    startDate="01/15/2024"
                    endDate="02/20/2024"
                />
            )}
        </div>
    );
};

export default Card;

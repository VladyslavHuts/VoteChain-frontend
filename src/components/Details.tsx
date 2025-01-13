import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/details.css";

interface DetailsProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    pollId: string; // Додано поле для ID голосування
}

const Details: FC<DetailsProps> = ({ isOpen, onClose, title, description, startDate, endDate, pollId }) => {
    const navigate = useNavigate(); // Ініціалізуємо хук useNavigate

    if (!isOpen) return null;

    // Функція для навігації на сторінку голосування
    const goToVoting = () => {
        navigate(`/Voting/${pollId}`);
    };

    return (
        <div className="details">
            <div className="details__overlay">
                <div className="details__content">
                    <button className="details__close-button" onClick={onClose}>
                        &times;
                    </button>
                    <div className="details__header">
                        <h1 className="details__title">{title}</h1>
                        <div className="details__dates">
                            <p className="details__date">
                                <strong>Start Date:</strong> {startDate}
                            </p>
                            <p className="details__date">
                                <strong>End Date:</strong> {endDate}
                            </p>
                        </div>
                    </div>
                    <p className="details__description">{description}</p>
                    <button className="details__action-button" onClick={goToVoting}>
                        Go to Voting
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Details;

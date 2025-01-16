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

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

const Details: FC<DetailsProps> = ({ isOpen, onClose, title, description, startDate, endDate, pollId }) => {
    const navigate = useNavigate(); // Ініціалізуємо хук useNavigate

    if (!isOpen) return null;

    // Функція для навігації на сторінку голосування
    const goToVoting = async () => {
        try {
            // Відправляємо POST-запит
            const response = await fetch(`http://localhost:80/votes/${pollId}/details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pollId }), // Додаємо pollId у запит
            });

            if (response.ok) {
                console.log('Vote details viewed');
            } else {
                console.error('Error in sending vote details');
            }

            // Навігація на сторінку голосування
            navigate(`/Voting/${pollId}`);
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
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
                                <strong>Start Date:</strong> {formatDate(startDate)}
                            </p>
                            <p className="details__date">
                                <strong>End Date:</strong> {formatDate(endDate)}
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

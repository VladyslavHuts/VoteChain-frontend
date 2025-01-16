import React, { useState, useEffect } from "react";
import card__img from "../assets/images/card__img-user.svg";
import { useNavigate } from "react-router-dom";
import Details from "./Details";

export interface Vote {
    pollId: string;
    pollTitle: string;
    pollDescription: string;
    pollImageUrl: string;
    endTime: string;
    pollIsClosed: boolean;
    chosenOptionId: string; // ID вибраної опції для голосування
    createdAt: string; // Додано поле для стартової дати
}

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

    const handleResult = () => {
        navigate(`/Voting/${id}`);
    };

    return (
        <div className={`card ${isClosed ? "card--closed" : ""}`}>
            {isClosed && <div className="card__overlay"></div>}
            <div className="card__header">
                <h2 className="card__title-account">{title}</h2>
            </div>
            <div className="card__main">
                <div className="card__info">
                    <img src={imageUrl} alt={title} className="card__image" />
                    <p className="card__description">{description}</p>
                </div>
            </div>
            {!isClosed && (
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
            )}
            {isClosed && (
                <div className="card__actions">
                    <button className="card__button card__button--result" onClick={handleResult}>
                        Results
                    </button>
                </div>
            )}
        </div>
    );
};

const MyVotes: React.FC = () => {
    const [votes, setVotes] = useState<Vote[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [isDetailsOpen, setDetailsOpen] = useState(false);


    // Функція для отримання голосувань користувача з API
    const fetchVotes = async () => {
        const authToken = localStorage.getItem("authToken"); // Отримуємо токен з локального сховища
        if (!authToken) {
            console.error("No authToken found in localStorage.");
            return;
        }

        try {
            const response = await fetch("http://localhost:80/Account/MyVotes", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${authToken}`, // Передаємо токен у заголовку
                },
            });

            const data = await response.json();
            if (data.success) {
                setVotes(data.data); // Оновлюємо стейт голосуваннями
            } else {
                console.error("Failed to fetch votes:", data.message);
            }
        } catch (error) {
            console.error("Error fetching votes:", error);
        }

        
    };

    
    useEffect(() => {
        fetchVotes(); // Викликаємо fetchVotes при завантаженні компонента
    }, []);

    const handleDetails = (id: string) => {
        setSelectedCardId(id);
        setDetailsOpen(true);
    };

    const selectedCard = votes.find((vote) => vote.pollId === selectedCardId);

    return (
        <div>
            <div className="account__cards">
                {votes.map((vote) => (
                    
                    <Card
                    
                        key={vote.pollId}
                        id={vote.pollId}
                        title={vote.pollTitle}
                        description={vote.pollDescription}
                        imageUrl={vote.pollImageUrl || card__img} // Встановлюємо картинку за замовчуванням
                        isClosed={new Date(vote.endTime) < new Date()} // Перевірка на закриття голосування
                        onDetails={() => handleDetails(vote.pollId)} // Викликаємо функцію для відкриття деталей
                    />
                ))}
            </div>

            {selectedCard && (
                <Details
                    isOpen={isDetailsOpen}
                    onClose={() => setDetailsOpen(false)}
                    title={selectedCard.pollTitle}
                    description={selectedCard.pollDescription}
                    startDate={selectedCard.createdAt} // Використовуємо створену дату як стартову
                    endDate={selectedCard.endTime}
                    pollId={selectedCard.pollId}
                />
            )}
        </div>
    );
};

export default MyVotes;

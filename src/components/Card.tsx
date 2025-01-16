    import React, { useState, useEffect } from "react";
    import ComplaintModal from "../components/ComplaintModal";
    import Details from "../components/Details";
    import "../styles/card.css";
    import complaint from "../assets/images/complaint.png";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";

    interface Vote {
        _id: string;
        title: string;
        description: string;
        imageUrl: string;
        isClosed: boolean;
        endTime: string;
        createdAt: string;
    }

    interface VoteDataResponse {
        polls: Vote[];
    }

    interface CardProps {
        id: string;
        title: string;
        description: string;
        imageUrl: string;
        isClosed: boolean;
        onVote: () => void;
        onDetails?: () => void;
    }

    const API_URL = "http://localhost:80";

    const Card: React.FC<CardProps> = ({ id, title, description, imageUrl, isClosed, onVote, onDetails }) => {
        const [hovered, setHovered] = useState(false);
        const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
        const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
        const [voteData, setVoteData] = useState<Vote | null>(null);
        const navigate = useNavigate();


        if(!imageUrl){
            imageUrl = "https://cdn-icons-png.flaticon.com/512/9501/9501143.png";
        }

        useEffect(() => {
            const fetchVoteData = async () => {
                try {
                    const response = await axios.get<VoteDataResponse>(`${API_URL}/votes/all`);
                    const vote = response.data.polls.find((vote) => vote._id === id);
                    if (vote) {
                        setVoteData(vote);
                    }
                } catch (error) {
                    console.error("Error fetching vote data:", error);
                }
            };

            fetchVoteData();
        }, [id]);

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

        const handleVote = async () => {
            try {
                const response = await fetch(`http://localhost:80/votes/${id}/details`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ pollId: id }),
                });

                if (response.ok) {
                    console.log('Vote details viewed');
                } else {
                    console.error('Error in sending vote details');
                }

                navigate(`/Voting/${id}`);
            } catch (error) {
                console.error('Error sending POST request:', error);
            }
        };

        const handleResult = () => {
            navigate(`/Voting/${id}`);
        };

        return (
            <div className={`card ${isClosed ? "card--closed" : "card--active"}`}>
                <div className="cards__header">
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
                {!isClosed && (
                    <div className="card__actions">
                        <button className="card__button card__button--vote" onClick={handleVote}>
                            Vote
                        </button>
                        <button
                            className="card__button card__button--details"
                            onClick={() => {
                                openDetailsModal();
                                if (onDetails) onDetails();
                            }}
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

                {isComplaintModalOpen && <ComplaintModal onClose={closeComplaintModal} votingId={id} />}
                {isDetailsModalOpen && voteData && (
                    <Details
                        isOpen={isDetailsModalOpen}
                        onClose={closeDetailsModal}
                        title={title}
                        description={description}
                        startDate={voteData.createdAt || "01/15/2024"}
                        endDate={voteData.endTime || "02/20/2024"}
                        pollId={id}
                    />
                )}
            </div>
        );
    };

    export default Card;
import React, { Component } from "react";
import { Card } from "./MyVotes";
import { Link } from "react-router-dom";
import Details from "./Details";

// Оголошуємо тип для кожного елементу в масиві опитувань
interface Poll {
    pollId: string;
    pollTitle: string;
    pollDescription: string;
    pollEndTime: string;
    pollIsClosed: boolean;
    pollContractAddress: string;
    pollViews: number;
    pollComplains: number;
    pollWinner: string | null;
    pollImageUrl: string; // Це поле може бути відсутнім
    createdAt: string; // Додано поле для стартової дати
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

class Created extends Component {
    state = {
        polls: [] as Poll[], // Оголошуємо, що це масив об'єктів типу Poll
        selectedCardId: null,
        isDetailsOpen: false,
    };

    handleDetails = (id: string) => {
        this.setState({
            selectedCardId: id,
            isDetailsOpen: true,
        });
    };

    closeDetails = () => {
        this.setState({ isDetailsOpen: false });
    };

    fetchPolls = async () => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            console.error("No authToken found in localStorage.");
            return;
        }

        try {
            const response = await fetch("http://localhost:80/Account", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
            });

            const data = await response.json();
            if (data.success) {
                this.setState({ polls: data.data }); // Оновлюємо стейт масивом опитувань
            } else {
                console.error("Failed to fetch polls:", data.message);
            }
        } catch (error) {
            console.error("Error fetching polls:", error);
        }
    };

    componentDidMount() {
        this.fetchPolls();
    }

    render() {
        const { selectedCardId, isDetailsOpen, polls } = this.state;
        const selectedCard = polls.find((poll) => poll.pollId === selectedCardId);

        return (
            <div>
                <div className="account__cards">
                    {polls.map((poll) => (
                        <Card
                            key={poll.pollId}
                            id={poll.pollId}
                            title={poll.pollTitle}
                            description={poll.pollDescription}
                            imageUrl={poll.pollImageUrl}
                            isClosed={new Date(poll.pollEndTime) < new Date()} // Перевірка на закриття голосування
                            onDetails={() => this.handleDetails(poll.pollId)}
                        />
                    ))}
                    <div className="account__addCard">
                        <Link className="account__link" to="">
                            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="60" cy="60" r="58" fill="#111111" stroke="#E8E8E8" strokeWidth="4"/>
                                <rect x="55.5" y="16" width="9" height="90" fill="#D9D9D9"/>
                                <rect x="15" y="65.5" width="9" height="90" transform="rotate(-90 15 65.5)" fill="#D9D9D9"/>
                            </svg>
                            <span className="account__addTitle">Create a poll</span>
                        </Link>
                    </div>
                </div>

                {selectedCard && (
                    <Details
                        isOpen={isDetailsOpen}
                        onClose={this.closeDetails}
                        title={selectedCard.pollTitle}
                        description={selectedCard.pollDescription}
                        startDate={formatDate(selectedCard.createdAt)} // Використовуємо форматовану дату
                        endDate={formatDate(selectedCard.pollEndTime)}
                        pollId={selectedCard.pollId}
                    />
                )}
            </div>
        );
    }
}

export default Created;

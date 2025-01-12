import React, { Component } from "react";
import card__img from "../assets/images/card__img-user.svg";
import { Card } from "./MyVotes";
import { Link } from "react-router-dom";
import Details from "./Details";

class Created extends Component {
    state = {
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

    render() {
        const cards = [
            {
                id: "1",
                title: "Green Future Initiative",
                description: "Description for Sample Card 1",
                imageUrl: card__img,
                isClosed: false,
            },
            {
                id: "2",
                title: "Clean Energy Project",
                description: "Description for Sample Card 2",
                imageUrl: card__img,
                isClosed: false,
            },
            {
                id: "3",
                title: "Sample Card 3",
                description: "Description for Sample Card 3",
                imageUrl: card__img,
                isClosed: true,
            },
        ];

        const { selectedCardId, isDetailsOpen } = this.state;
        const selectedCard = cards.find((card) => card.id === selectedCardId);

        return (
            <div>
                <div className="account__cards">
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            {...card}
                            onDetails={() => this.handleDetails(card.id)}
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
                        title={selectedCard.title}
                        description={selectedCard.description}
                        startDate="2025-01-01"
                        endDate="2025-12-31"
                    />
                )}
            </div>
        );
    }
}

export default Created;

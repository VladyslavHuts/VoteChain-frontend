import React, { Component } from "react";
import card__img from "../assets/images/card__img-user.svg";
import { Card } from "./MyVotes";
import { Link } from "react-router-dom";

class Created extends Component {
    render() {
        const cards = [
            {
                id: "1",
                title: "Green Future Initiative",
                description: "Description for Sample Card 1",
                imageUrl: card__img,
                onDetails: () => alert("Details for Card 1!"),
                isClosed: false,
            },
            {
                id: "2",
                title: "Clean Energy Project",
                description: "Description for Sample Card 2",
                imageUrl: card__img,
                onDetails: () => alert("Details for Card 2!"),
                isClosed: false,
            },
            {
                id: "3",
                title: "Sample Card 3",
                description: "Description for Sample Card 3",
                imageUrl: card__img,
                onDetails: () => alert("Details for Card 3!"),
                isClosed: true,
            },
        ];
        return (
            <div className="account__cards">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        {...card}
                    />
                ))}
                <div className="account__addCard">
                    <Link className="account__link" to="">
                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="58" fill="#111111" stroke="#E8E8E8" strokeWidth="4"/>
                            <rect x="55.5" y="16" width="9" height="90" fill="#D9D9D9"/>
                            <rect x="15" y="65.5" width="9" height="90" transform="rotate(-90 15 65.5)"
                                  fill="#D9D9D9"/>
                        </svg>
                        <span className="account__addTitle">Create a poll</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Created;
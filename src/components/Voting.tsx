import React, { Component } from "react";
import "../styles/voting.css";
import { FaChevronDown } from "react-icons/fa";

interface VotingState {
    expandedIndex: number | null;
    votingData: {
        title: string;
        startDate: string;
        endDate: string;
    };
    options: { name: string; details: string }[];
}

class Voting extends Component<{}, VotingState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expandedIndex: null,
            votingData: {
                title: "Green Future Initiative",
                startDate: "01.15.2024",
                endDate: "02.20.2024",
            },
            options: [
                { name: "Green future initiative", details: "Details about Green future initiative." },
                { name: "Sustainable living plan", details: "Details about Sustainable living plan." },
                { name: "Renewable energy sources", details: "Details about Renewable energy sources." },
                { name: "Clean water access project", details: "Details about Clean water access project." },
                { name: "Forest preservation program", details: "Details about Forest preservation program." },
                { name: "Global education support", details: "Details about Global education support." },
            ],
        };
    }

    toggleOption = (index: number) => {
        this.setState((prevState) => ({
            expandedIndex: prevState.expandedIndex === index ? null : index,
        }));
    };

    render() {
        const { expandedIndex, votingData, options } = this.state;

        return (
            <div className="voting">
                <div className="container">
                    <div className="voting__container">
                        <div className="voting__window">
                            <p className="voting__title">{votingData.title}</p>
                            <div className="voting__dates">
                                <p className="voting__date">Start Date: <span id="start__date">{votingData.startDate}</span></p>
                                <p className="voting__date">End Date: <span id="end__date">{votingData.endDate}</span></p>
                            </div>
                            <div className="voting__content">
                            <div className="voting__graph"></div>
                                <ul className="voting__options">
                                    {options.map((option, index) => (
                                        <li
                                            key={index}
                                            className={`voting__option ${
                                                expandedIndex === index ? "expanded" : ""
                                            }`}
                                        >
                                            <div className="voting__header">
                                                <div
                                                    className={`voting__icon-wrapper ${
                                                        expandedIndex === index ? "rotated" : ""
                                                    }`}
                                                    onClick={() => this.toggleOption(index)}
                                                >
                                                    <FaChevronDown />
                                                </div>
                                                <span>{option.name}</span>
                                                <input
                                                    type="radio"
                                                    name="vote"
                                                    value={option.name}
                                                    className="voting__radiobutton"
                                                />
                                            </div>
                                            <div
                                                className={`voting__details ${
                                                    expandedIndex === index ? "expanded" : ""
                                                }`}
                                            >
                                                {option.details}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <button className="voting__btn" type="submit">Vote</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Voting;

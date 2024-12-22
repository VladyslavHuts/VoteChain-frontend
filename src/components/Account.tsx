import React, { Component } from "react";
import "../styles/account.css";
import Created from "./Created";
import MyVotes from "./MyVotes";
import identify from "../assets/images/account__identify.svg";

interface AccountState {
    activeTab: string;
    buttonState: "initial" | "waiting" | "success";
}

class Account extends Component<{}, AccountState> {
    state: AccountState = {
        activeTab: "MyVotes",
        buttonState: "initial",
    };

    setActiveTab = (tabName: string) => {
        this.setState({ activeTab: tabName });
    };

    handleButtonClick = () => {
        const { buttonState } = this.state;

        if (buttonState !== "initial") return;

        this.setState({ buttonState: "waiting" });

        setTimeout(() => {
            alert("Identity confirmed!"); // Виконуємо дію (наприклад, показуємо алерт)

            this.setState({ buttonState: "success" });
        }, 1000);
    };

    render() {
        const { activeTab, buttonState } = this.state;

        return (
            <div className="container">
                <div className="account__container">
                    <div className="account__identify">
                        <button
                            className={`account__button-identify ${
                                buttonState === "waiting"
                                    ? "waiting"
                                    : buttonState === "success"
                                        ? "success"
                                        : ""
                            }`}
                            onClick={this.handleButtonClick}
                            disabled={buttonState !== "initial"}
                        >
                            {buttonState === "initial"
                                ? "Confirm identity"
                                : buttonState === "waiting"
                                    ? "Waiting..."
                                    : "Confirmed"}
                        </button>
                        <div className="account__icon-wrapper">
                            <svg
                                className="account__circle"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="20" cy="20" r="20" fill="#858585" fillOpacity="0.4" />
                            </svg>
                            <img className="account__question" src={identify} alt="question" />
                            <span className="account__tooltip">
                                DID ensures you are unique in voting. It's a fast and secure process that ensures
                                integrity and prevents duplicate votes.
                            </span>
                        </div>
                    </div>
                    <div className="account__navigation">
                        <button
                            className={`account__button ${activeTab === "MyVotes" ? "active" : ""}`}
                            onClick={() => this.setActiveTab("MyVotes")}
                        >
                            My Votes
                        </button>
                        <button
                            className={`account__button ${activeTab === "Created" ? "active" : ""}`}
                            onClick={() => this.setActiveTab("Created")}
                        >
                            Created
                        </button>
                    </div>
                    <div className="account__window">
                        {activeTab === "Created" ? <Created /> : <MyVotes />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;

import React, { Component } from "react";
import "../styles/account.css";
import Created from "./Created";
import MyVotes from "./MyVotes";

class Account extends Component {
    state = {
        activeTab: "MyVotes",
    };

    setActiveTab = (tabName: string) => {
        this.setState({ activeTab: tabName });
    };

    render() {
        const { activeTab } = this.state;

        return (
            <div className="container">
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
        );
    }
}

export default Account;

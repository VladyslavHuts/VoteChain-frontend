import React, { Component } from "react";
import { Navigate } from "react-router-dom"; // Додано для переадресації
import "../styles/account.css";
import Created from "./Created";
import MyVotes from "./MyVotes";
import identify from "../assets/images/account__identify.svg";

interface AccountState {
  activeTab: string;
  buttonState: "initial" | "waiting" | "success";
  redirect: boolean; // Доданий стан для переадресації
}

class Account extends Component<{}, AccountState> {
  state: AccountState = {
    activeTab: "MyVotes",
    buttonState: "initial",
    redirect: false, // Початкове значення для переадресації
  };

  // Перевірка статусу підтвердження аккаунта
  checkAccountVerification = async () => {
    const authToken = localStorage.getItem("authToken"); // Отримуємо токен з локального сховища
    if (!authToken) {
      console.error("No authToken found in localStorage.");
      this.setState({ redirect: true }); // Установлюємо стан для переадресації
      return;
    }

    try {
      const response = await fetch("http://localhost:80/profile/getUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`, // Передаємо токен у заголовку
        },
      });

      const data = await response.json();
      if (data.success && data.DIDverified) {
        this.setState({ buttonState: "success" }); // Якщо підтверджено, змінюємо статус кнопки на "success"
      } else {
        console.log("Account not verified or failed response.");
      }
    } catch (error) {
      console.error("Error checking account verification:", error);
    }
  };

  confirmAccount = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No authToken found in localStorage.");
      return;
    }

    try {
      const response = await fetch("http://localhost:80/profile/getConfirm", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setTimeout(() => {
          this.checkAccountVerification(); // Перевірка статусу після затримки
        }, 2000); // Затримка в 2 секунди
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error confirming account:", error);
    }
  };

  setActiveTab = (tabName: string) => {
    this.setState({ activeTab: tabName });
  };

  handleButtonClick = () => {
    const { buttonState } = this.state;

    if (buttonState !== "initial") return;

    this.setState({ buttonState: "waiting" });

    // Якщо статус аккаунта не підтверджено, викликаємо confirmAccount
    this.confirmAccount();
  };

  componentDidMount() {
    this.checkAccountVerification(); // Перевіряємо статус при завантаженні сторінки
  }

  render() {
    const { activeTab, buttonState, redirect } = this.state;

    // Якщо немає токену, переадресація на головну
    if (redirect) {
      return <Navigate to="/" replace />;
    }

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
                <circle
                  cx="20"
                  cy="20"
                  r="20"
                  fill="#858585"
                  fillOpacity="0.4"
                />
              </svg>
              <img
                className="account__question"
                src={identify}
                alt="question"
              />
              <span className="account__tooltip">
                DID ensures you are unique in voting. It's a fast and secure
                process that ensures integrity and prevents duplicate votes.
              </span>
            </div>
          </div>
          <div className="account__navigation">
            <button
              className={`account__button ${
                activeTab === "MyVotes" ? "active" : ""
              }`}
              onClick={() => this.setActiveTab("MyVotes")}
            >
              My Votes
            </button>
            <button
              className={`account__button ${
                activeTab === "Created" ? "active" : ""
              }`}
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

import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/dashboard.css";
import dashboardImage from "../assets/images/dashboard__info-img.svg";

interface State {
    isDropdownOpen: boolean;
    selectedInterval: string;
}

class Dashboard extends Component<{}, State> {
    state: State = {
        isDropdownOpen: false,
        selectedInterval: "7 days",
    };

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropdownOpen: !prevState.isDropdownOpen,
        }));
    };

    closeDropdown = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".dropdown")) {
            this.setState({ isDropdownOpen: false });
        }
    };

    componentDidMount() {
        document.addEventListener("click", this.closeDropdown);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.closeDropdown);
    }

    changeInterval = (interval: string) => {
        this.setState({ selectedInterval: interval });
    };

    // Функція для отримання дати
    getDatesForInterval = (interval: string): string[] => {
        const today = new Date();
        const dates: string[] = [];

        if (interval === "7 days") {
            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                dates.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
            }
        } else if (interval === "1 month") {
            const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
            dates.push(...weeks);
        } else if (interval === "1 year") {
            const months = Array.from({ length: 12 }, (_, i) => {
                const date = new Date(today.getFullYear(), i);
                return date.toLocaleDateString("en-US", { month: "short" });
            });
            dates.push(...months);
        }

        return dates;
    };

    getGraphData = () => {
        const { selectedInterval } = this.state;

        // Дані для різних інтервалів
        const dataMap: Record<string, number[]> = {
            "7 days": [100, 150, 200, 75, 180, 150, 250],
            "1 month": [500, 700, 600, 550],
            "1 year": [450, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100],
        };

        const labels = this.getDatesForInterval(selectedInterval);

        return {
            labels: labels,
            datasets: [
                {
                    label: "Votes",
                    data: dataMap[selectedInterval],
                    backgroundColor: (context: any) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, "#03c0c6");
                        gradient.addColorStop(1, "#2600ff");
                        return gradient;
                    },
                    borderRadius: 8,
                },
            ],
        };
    };

    renderGraph = () => {
        const data = this.getGraphData();

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: "#222",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#fff",
                    },
                    grid: {
                        display: false,
                    },
                },
                y: {
                    ticks: {
                        color: "#fff",
                    },
                    grid: {
                        color: "#444",
                    },
                },
            },
        };

        return <Bar data={data} options={options} />;
    };

    render() {
        const { isDropdownOpen, selectedInterval } = this.state;

        return (
            <section className="dashboard">
                <div className="container">
                    <div className="dashboard__container">
                        <div className="dashboard__wrapper">
                            <div className="dashboard__info">
                                <div className="dashboard__info-text">
                                    <h2 className="dashboard__subtitle">Voting information</h2>
                                    <p className="dashboard__text">
                                        Voting on our platform is a modern way of participating in
                                        making important decisions, built on the principles of
                                        transparency, security, and accessibility for every user. Using
                                        the Ethereum blockchain technology.
                                    </p>
                                </div>
                                <img
                                    className="dashboard__info-image"
                                    src={dashboardImage}
                                    alt="Voting information"
                                />
                            </div>
                            <div className="dashboard__option">
                                <h2 className="dashboard__subtitle">Filter Options</h2>
                                <div className="dashboard__filters">
                                    <button className="dashboard__filters-btn">Status</button>
                                    <div className="dropdown">
                                        <button
                                            className="dashboard__filters-btn"
                                            onClick={this.toggleDropdown}
                                            aria-expanded={isDropdownOpen}
                                            aria-haspopup="true"
                                        >
                                            Category
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="dropdown__content">
                                                <button className="dropdown__content-btn">Projects</button>
                                                <button className="dropdown__content-btn">Features</button>
                                                <button className="dropdown__content-btn">Policies</button>
                                            </div>
                                        )}
                                    </div>
                                    <button className="dashboard__filters-btn">By Date</button>
                                    <button className="dashboard__filters-btn">Popularity</button>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard__statistics">
                            <div className="dashboard__statistics-wrapper">
                                <div className="dashboard__graph-btns">
                                    <button
                                        className={`dashboard__graph-btn ${
                                            selectedInterval === "1 year" ? "active" : ""
                                        }`}
                                        onClick={() => this.changeInterval("1 year")}
                                    >
                                        1 year
                                    </button>
                                    <button
                                        className={`dashboard__graph-btn ${
                                            selectedInterval === "1 month" ? "active" : ""
                                        }`}
                                        onClick={() => this.changeInterval("1 month")}
                                    >
                                        1 month
                                    </button>
                                    <button
                                        className={`dashboard__graph-btn ${
                                            selectedInterval === "7 days" ? "active" : ""
                                        }`}
                                        onClick={() => this.changeInterval("7 days")}
                                    >
                                        7 days
                                    </button>
                                </div>
                                <div className="dashboard__graph">{this.renderGraph()}</div>
                            </div>
                            <div className="dashboard__graph-btns-stat">
                                <h3 className="dashboard__graph-btn-stat">Active voting</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;

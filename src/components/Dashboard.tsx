import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/dashboard.css";
import dashboardImage from "../assets/images/dashboard__info-img.svg";

interface State {
    isDropdownOpen: boolean;
    isCategoryDropdownOpen: boolean;
    selectedInterval: string;
    selectedStatus: string;
    chartType: string;
    graphData: Record<string, Record<string, number[]>> | null;
}

class Dashboard extends Component<{}, State> {
    state: State = {
        isDropdownOpen: false,
        isCategoryDropdownOpen: false,
        selectedInterval: "7 days",
        selectedStatus: "ALL",
        chartType: "activeVotes",
        graphData: null,
    };

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropdownOpen: !prevState.isDropdownOpen,
        }));
    };

    toggleCategoryDropdown = () => {
        this.setState((prevState) => ({
            isCategoryDropdownOpen: !prevState.isCategoryDropdownOpen,
        }));
    };

    closeDropdown = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".dropdown") && !target.closest(".category-dropdown")) {
            this.setState({
                isDropdownOpen: false,
                isCategoryDropdownOpen: false,
            });
        }
    };

    componentDidMount() {
        document.addEventListener("click", this.closeDropdown);

        // Fetch initial data from API
        this.fetchGraphData();
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.closeDropdown);
    }

    fetchGraphData = async () => {
        try {
            const response = await fetch("http://localhost:80/votes/dashboard"); // Replace with your API endpoint
            const data = await response.json();
            this.setState({ graphData: data });
        } catch (error) {
            console.error("Error fetching graph data:", error);
        }
    };

    changeInterval = (interval: string) => {
        this.setState({ selectedInterval: interval });
    };

    changeStatus = (status: string) => {
        this.setState({ selectedStatus: status });
        console.log(`Status changed to: ${status}`);
    };

    changeChartType = (type: string) => {
        this.setState({ chartType: type });
    };

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
        const { selectedInterval, chartType, graphData } = this.state;

        if (!graphData) {
            return {
                labels: [],
                datasets: [],
            };
        }

        const labels = this.getDatesForInterval(selectedInterval);
        const data = graphData[chartType]?.[selectedInterval] || [];
        const colorsMap: Record<string, string[]> = {
            "activeVotes": ["#03c0c6", "#2600ff"],
            "newVotes": ["#FC42E9", "#C800FF"],
        };

        const [startColor, endColor] = colorsMap[chartType] || ["#000", "#000"];

        return {
            labels: labels,
            datasets: [
                {
                    label: chartType === "activeVotes" ? "Active Votes" : "New Votes",
                    data: data,
                    backgroundColor: (context: any) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, startColor);
                        gradient.addColorStop(1, endColor);
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
        const { isDropdownOpen, isCategoryDropdownOpen, selectedInterval, selectedStatus, chartType } = this.state;

        const buttonClass = chartType === "activeVotes" ? "dashboard__graph-btn-blue" : "dashboard__graph-btn-pink";

        return (
            <section className="dashboard">
                <div className="container">
                    <div className="dashboard__container">
                        <div className="dashboard__wrapper">
                            <div className="dashboard__info">
                                <div className="dashboard__info-text">
                                    <h2 className="dashboard__subtitle">Voting Information</h2>
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
                                    <div className="dropdown">
                                        <button
                                            className="dashboard__filters-btn"
                                            onClick={this.toggleDropdown}
                                        >
                                            {selectedStatus === "ALL" ? `Status: ${selectedStatus}` : selectedStatus}
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="dropdown__content">
                                                <button
                                                    className="dropdown__content-btn"
                                                    onClick={() => this.changeStatus("ALL")}
                                                >
                                                    ALL
                                                </button>
                                                <button
                                                    className="dropdown__content-btn"
                                                    onClick={() => this.changeStatus("Active")}
                                                >
                                                    Active
                                                </button>
                                                <button
                                                    className="dropdown__content-btn"
                                                    onClick={() => this.changeStatus("Inactive")}
                                                >
                                                    Inactive
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="dropdown category-dropdown">
                                        <button
                                            className="dashboard__filters-btn"
                                            onClick={this.toggleCategoryDropdown}
                                        >
                                            Category
                                        </button>
                                        {isCategoryDropdownOpen && (
                                            <div className="dropdown__content">
                                                <button
                                                    className="dropdown__content-btn"
                                                    onClick={() => console.log("Projects selected")}
                                                >
                                                    Projects
                                                </button>
                                                <button
                                                    className="dropdown__content-btn"
                                                    onClick={() => console.log("Features selected")}
                                                >
                                                    Features
                                                </button>
                                                <button
                                                    className="dropdown__content-btn"
                                                    onClick={() => console.log("Policies selected")}
                                                >
                                                    Policies
                                                </button>
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
                                        className={`${buttonClass} ${selectedInterval === "1 year" ? "active" : ""}`}
                                        onClick={() => this.changeInterval("1 year")}
                                    >
                                        1 year
                                    </button>
                                    <button
                                        className={`${buttonClass} ${selectedInterval === "1 month" ? "active" : ""}`}
                                        onClick={() => this.changeInterval("1 month")}
                                    >
                                        1 month
                                    </button>
                                    <button
                                        className={`${buttonClass} ${selectedInterval === "7 days" ? "active" : ""}`}
                                        onClick={() => this.changeInterval("7 days")}
                                    >
                                        7 days
                                    </button>
                                </div>
                                <div className="dashboard__graph">{this.renderGraph()}</div>
                            </div>
                            <div className="dashboard__graph-btns-stat">
                                <button
                                    className={`dashboard__graph-btn-new ${chartType === "newVotes" ? "active" : ""}`}
                                    onClick={() => this.changeChartType("newVotes")}
                                >
                                    New votes
                                </button>
                                <button
                                    className={`dashboard__graph-btn-active ${chartType === "activeVotes" ? "active" : ""}`}
                                    onClick={() => this.changeChartType("activeVotes")}
                                >
                                    Active Voting
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;

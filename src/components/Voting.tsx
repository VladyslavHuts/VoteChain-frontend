import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/voting.css";

interface VotingState {
    expandedIndex: number | null;
    votingData: {
        title: string;
        startDate: string;
        endDate: string;
    } | null;
    options: { name: string; details: string; votes: number }[];
    selectedOption: string | null;
    hasVoted: boolean;
    hoveredIndex: number | null;
}

interface VotingProps {
    id: string;
    onNotFound: () => void;
}

class Voting extends Component<VotingProps, VotingState> {
    constructor(props: VotingProps) {
        super(props);
        this.state = {
            expandedIndex: null,
            votingData: null,
            options: [],
            selectedOption: null,
            hasVoted: false,
            hoveredIndex: null,
        };
    }

    componentDidMount() {
        const { id } = this.props;
        this.fetchVotingData(id);
    }

    fetchVotingData = (id: string) => {
        const mockData = [
            {
                id: "1",
                title: "Green Future Initiative",
                startDate: "01.15.2024",
                endDate: "02.20.2024",
                options: [
                    { name: "Green future initiative", details: "Details about Green future initiative.", votes: 1198 },
                    { name: "Sustainable living plan", details: "Details about Sustainable living plan.", votes: 720 },
                    { name: "Renewable energy sources", details: "Details about Renewable energy sources.", votes: 1890 },
                    { name: "Clean water access project", details: "Details about Clean water access project.", votes: 780 },
                    { name: "Forest preservation programForest preservation program", details: "Details about Forest preservation program.", votes: 670 },
                    { name: "Global education support", details: "Details about Global education support.", votes: 220 },
                ],
            },
            {
                id: "2",
                title: "Clean Energy Project",
                startDate: "02.01.2024",
                endDate: "03.01.2024",
                options: [
                    { name: "Solar power expansion", details: "Details about Solar power expansion.", votes: 870 },
                    { name: "Wind energy development", details: "Invest in expanding wind turbine infrastructure to increase renewable energy capacity.", votes: 430 },
                    { name: "Hydropower efficiency upgrades", details: "Improve the efficiency of existing hydropower plants for better energy production.", votes: 320 },
                    { name: "Geothermal energy exploration", details: "Explore new geothermal energy sources and develop existing ones.", votes: 210 },
                    { name: "Electric vehicle infrastructure", details: "Build more electric vehicle charging stations across urban areas.", votes: 560 },
                    { name: "Energy storage solutions", details: "Invest in developing advanced energy storage systems for renewable energy.", votes: 650 },
                    { name: "Smart grid technology", details: "Implement smart grid technology for better energy distribution and management.", votes: 540 },
                    { name: "Biomass energy projects", details: "Develop sustainable biomass energy solutions using organic materials.", votes: 190 },
                    { name: "Nuclear fusion research", details: "Support ongoing research into nuclear fusion as a clean energy source.", votes: 300 }
                ]
            }
        ];

        const voting = mockData.find((item) => item.id === id);

        if (voting) {
            this.setState({
                votingData: {
                    title: voting.title,
                    startDate: voting.startDate,
                    endDate: voting.endDate,
                },
                options: voting.options,
            });
        } else {
            this.props.onNotFound(); // Викликаємо функцію для обробки відсутності ID
        }
    };

    toggleOption = (index: number) => {
        this.setState((prevState) => ({
            expandedIndex: prevState.expandedIndex === index ? null : index,
        }));
    };

    handleOptionChange = (optionName: string) => {
        this.setState({ selectedOption: optionName });
    };

    handleVote = () => {
        const { selectedOption } = this.state;
        if (selectedOption) {
            alert(`You voted for: ${selectedOption}`);
            this.setState({ hasVoted: true });
        }
    };

    render() {
        const { expandedIndex, votingData, options, selectedOption, hasVoted, hoveredIndex } = this.state;

        if (!votingData) {
            return <p>Loading voting data...</p>;
        }

        const sortedOptions = [...options].sort((a, b) => b.votes - a.votes);
        const maxVotes = Math.max(...sortedOptions.map(option => option.votes));
        const totalVotes = sortedOptions.reduce((sum, option) => sum + option.votes, 0);

        return (
            <div className="container">
                <div className="voting__container">
                    <div className="voting__window">
                        <p className="voting__title">{votingData.title}</p>
                        <div className="voting__dates">
                            <p className="voting__date">
                                Start Date: <span id="start__date">{votingData.startDate}</span>
                            </p>
                            <p className="voting__date">
                                End Date: <span id="end__date">{votingData.endDate}</span>
                            </p>
                        </div>

                        <div className="voting__content">
                            <div className="voting__graph">
                                {sortedOptions.map((option, index) => {
                                    const scaledWidth = ((option.votes / maxVotes) * 95).toFixed(0);
                                    const actualPercentage = ((option.votes / totalVotes) * 100).toFixed(0);

                                    return (
                                        <div
                                            key={index}
                                            className="voting__bar-container"
                                            onMouseEnter={() => this.setState({ hoveredIndex: index })}
                                            onMouseLeave={() => this.setState({ hoveredIndex: null })}
                                        >
                                            <div className="voting__bar-label">{option.votes}</div>
                                            <div className="voting__bar-background">
                                                <div
                                                    className={`voting__bar ${
                                                        this.state.hasVoted && this.state.selectedOption === option.name
                                                            ? "voting__bar-selected"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        "--target-width": `${scaledWidth}%`,
                                                    } as React.CSSProperties}
                                                ></div>
                                            </div>
                                            <div className="voting__bar-percentage-container">
                                                <div className="voting__bar-percentage">{actualPercentage}%</div>
                                            </div>

                                            {hoveredIndex === index && (
                                                <div className="voting__tooltip">{option.name}</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <ul className="voting__options">
                                {sortedOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className={`voting__option ${
                                            selectedOption === option.name && hasVoted ? "selected" : ""
                                        } ${expandedIndex === index ? "expanded" : ""}`}
                                    >
                                        <div className="voting__header">
                                            <div
                                                className={`voting__icon-wrapper ${
                                                    expandedIndex === index ? "rotated" : ""
                                                }`}
                                                onClick={() => this.toggleOption(index)}
                                            >
                                                <svg width="20" height="14" viewBox="0 0 20 14" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M3.75 0L0 3.81818L10 14L20 3.81818L16.25 0L10 6.36364L3.75 0Z"
                                                        fill="#E8E8E8" />
                                                </svg>
                                            </div>
                                            <span>{option.name}</span>
                                            {!hasVoted && (
                                                <input
                                                    type="radio"
                                                    name="vote"
                                                    value={option.name}
                                                    className="voting__radiobutton"
                                                    onChange={() => this.handleOptionChange(option.name)}
                                                />
                                            )}
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
                        {!hasVoted && (
                            <button
                                className="voting__btn"
                                type="submit"
                                onClick={this.handleVote}
                                disabled={!selectedOption}
                            >
                                Vote
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

// Використання функціонального компонента для передачі параметрів маршруту
const VotingWithParams: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleNotFound = () => {
        navigate("/404"); // Перенаправляємо на сторінку 404
    };

    return <Voting id={id!} onNotFound={handleNotFound} />;
};

export default VotingWithParams;

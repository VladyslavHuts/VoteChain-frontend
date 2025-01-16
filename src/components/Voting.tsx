import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/voting.css";
import { ethers } from "ethers";
import CONTRACT_ABI from "./contractABI.json"; // Replace with your ABI file path

const CONTRACT_ADDRESS = "0xb67b620f52fa7a39e6310b6fd426ce3bb128c2e2";

interface VotingState {
    expandedIndex: number | null;
    votingData: {
        title: string;
        description: string;
        startDate: string;
        endDate: string;
        imageUrl: string;
    } | null;
    options: { name: string; details: string; votes: number; id: string }[];
    selectedOption: string | null;
    hasVoted: boolean;
    hoveredIndex: number | null;
    voteDetails: { optionId: string; optionTitle: string; optionDescription: string } | null;
    winnerId: string | null;
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
            voteDetails: null,
            winnerId: null,
        };
    }

    componentDidMount() {
        const { id } = this.props;
        this.fetchVotingData(id);
        this.checkIfUserVoted(id);
    }

    toggleOption = (index: number) => {
        this.setState((prevState) => ({
            expandedIndex: prevState.expandedIndex === index ? null : index,
        }));
    };

    // Функція для перевірки, чи користувач вже проголосував
    checkIfUserVoted = async (id: string) => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            console.error("No authToken found in localStorage.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:80/votes/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
            });
            const data = await response.json();
            if (data.success && data.vote) {
                this.setState({
                    hasVoted: true,
                    voteDetails: data.vote,
                    selectedOption: data.vote.optionId,
                });
            }
        } catch (error) {
            console.error("Error checking user vote:", error);
        }
    };

    // Функція для отримання даних голосування
    fetchVotingData = (id: string) => {
        fetch(`http://localhost:80/votes/${id}/details`)
            .then((response) => response.json())
            .then((data) => {
                const voting = data;
                const formattedOptions = voting.options.map((option: any) => ({
                    name: option.optionText,
                    details: option.description,
                    votes: option.voteCount,
                    id: option.optionId,
                }));

                this.setState({
                    votingData: {
                        title: voting.title,
                        description: voting.description,
                        startDate: new Date(voting.createdAt).toLocaleDateString(),
                        endDate: new Date(voting.endTime).toLocaleDateString(),
                        imageUrl: voting.imageUrl,
                    },
                    options: formattedOptions,
                    winnerId: voting.winner || null,
                });
            })
            .catch((error) => {
                console.error("Error fetching voting data:", error);
                this.props.onNotFound();
            });
    };

    // Функція для вибору варіанту
    handleOptionChange = (optionId: string) => {
        this.setState({ selectedOption: optionId });
    };

    // Функція для відправки голосу на сервер
    handleVote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { selectedOption } = this.state;
        const { id } = this.props;
    
        if (!selectedOption) {
            alert("Please select an option before voting.");
            return;
        }
    
        try {
            // Підключення до MetaMask
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
            // Відправка транзакції до смартконтракту
            const transaction = await contract.vote(id, selectedOption);
    
            alert("Transaction sent! Please confirm it in MetaMask.");
            const receipt = await transaction.wait(); // Очікуємо підтвердження транзакції
    
            const transactionHash = receipt.hash;
           
    
            // Після успішної транзакції відправляємо дані на бекенд
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                console.error("No authToken found in localStorage.");
                return;
            }
    
            const response = await fetch(`http://localhost:80/votes/${id}/vote/${selectedOption}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionAddress: transactionHash,
                }),
            });
    
            if (!response.ok) {
                console.error("Server error:", response.status, response.statusText);
                alert("An error occurred while submitting your vote. Please try again.");
                return;
            }
    
            const data = await response.json();
            
    
            // Перевірка наявності повідомлення про успіх
            if (data.message === "Vote recorded successfully") {
                this.setState({ hasVoted: true });
                
                window.location.reload(); // Перезавантаження сторінки
            } else {
                console.error("Unexpected server response:", data);
                alert("An unexpected error occurred.");
            }
        } catch (error) {
            console.error("Error voting:", error);
            alert("An error occurred during the voting process.");
        }
    };
    
    

    render() {
        const { expandedIndex, votingData, options, selectedOption, hasVoted, hoveredIndex, winnerId } = this.state;

        if (!votingData) {
            return <p>Loading voting data...</p>;
        }

        const sortedOptions = [...options].sort((a, b) => b.votes - a.votes);
        const maxVotes = Math.max(...sortedOptions.map((option) => option.votes));
        const totalVotes = sortedOptions.reduce((sum, option) => sum + option.votes, 0);

        return (
            <div className="container">
                <div className="voting__container">
                    <div className="voting__window">
                        <p className="voting__title">{votingData.title}</p>
                        <p className="voting__description">{votingData.description}</p>
                        <div className="voting__dates">
                            <p className="voting__date">
                                Start Date: <span id="start__date">{votingData.startDate}</span>
                            </p>
                            <p className="voting__date">
                                End Date: <span id="end__date">{votingData.endDate}</span>
                            </p>
                        </div>

                        <form className="voting__form" onSubmit={this.handleVote}>
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
                                                            winnerId === option.id
                                                                ? 'voting__bar-winner'
                                                                : hasVoted && selectedOption === option.id
                                                                ? 'voting__bar-selected'
                                                                : ''
                                                        }`}
                                                        style={{
                                                            '--target-width': `${scaledWidth}%`,
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
                                                winnerId === option.id
                                                    ? 'winner'
                                                    : selectedOption === option.id && hasVoted
                                                    ? 'selected'
                                                    : ''
                                            } ${expandedIndex === index ? 'expanded' : ''}`}
                                        >
                                            <div className="voting__header">
                                                <div
                                                    className={`voting__icon-wrapper ${
                                                        expandedIndex === index ? 'rotated' : ''
                                                    }`}
                                                    onClick={() => this.toggleOption(index)}
                                                >
                                                    <svg
                                                        width="20"
                                                        height="14"
                                                        viewBox="0 0 20 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M3.75 0L0 3.81818L10 14L20 3.81818L16.25 0L10 6.36364L3.75 0Z"
                                                            fill="#E8E8E8"
                                                        />
                                                    </svg>
                                                </div>
                                                <span>{option.name}</span>
                                                {!hasVoted && (
                                                    <input
                                                        type="radio"
                                                        name="vote"
                                                        value={option.id}
                                                        className="voting__radiobutton"
                                                        onChange={() => this.handleOptionChange(option.id)}
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <div
                                                className={`voting__details ${
                                                    expandedIndex === index ? 'expanded' : ''
                                                }`}
                                            >
                                                {option.details}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {!hasVoted && (
                                <button className="voting__btn" type="submit">
                                    Vote
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const VotingWithParams: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const handleNotFound = () => {
        navigate("/404");
    };

    return <Voting id={id!} onNotFound={handleNotFound} />;
};

export default VotingWithParams;

import React, { Component, ChangeEvent, FormEvent } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import stringSimilarity from 'string-similarity';
import Card from './Card';
import '../styles/vote.css';
import search from '../assets/images/searh.png';

interface CardData {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    isClosed: boolean;
}

interface State {
    query: string;
    filteredData: CardData[];
}

class Vote extends Component<{}, State> {
    state: State = {
        query: '',
        filteredData: [],
    };

    componentDidMount() {
        // Отримуємо дані з API
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await fetch('http://localhost:80/votes/all'); 
            const data = await response.json();

            // Оновлюємо стан з отриманими даними
            const formattedData = data.polls.map((vote: any) => ({
                id: vote._id,
                title: vote.title,
                description: vote.description,
                imageUrl: vote.imageUrl, // Додаємо зображення, якщо воно є в API
                isClosed: vote.isClosed,
            }));

            this.setState({ filteredData: formattedData });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    handleVote = (id: string) => {
        console.log(`Voted for card with ID: ${id}`);
    };

    handleDetails = (id: string) => {
        console.log(`Details for card with ID: ${id}`);
    };

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        this.setState({ query }, this.filterData);
    };

    filterData = () => {
        const { query } = this.state;

        if (!query.trim()) {
            this.fetchData(); // Якщо нічого не введено, повторно отримуємо всі дані
            return;
        }

        const titles = this.state.filteredData.map((item) => item.title);
        const matches = stringSimilarity.findBestMatch(query, titles);

        const similarTitles = matches.ratings
            .filter((rating) => rating.rating > 0.4)
            .map((rating) => rating.target);

        const filteredData = this.state.filteredData.filter((item) =>
            similarTitles.includes(item.title)
        );

        this.setState({ filteredData });
    };

    render() {
        const { query, filteredData } = this.state;

        return (
            <div className="vote">
                <div className="container">
                    <div className="vote__container">
                        <h1 className="vote__title">Active Voting</h1>
                        <form
                            className="vote__form"
                            onSubmit={(e: FormEvent) => e.preventDefault()}
                        >
                            <input
                                type="text"
                                name="query"
                                placeholder="Search..."
                                className="voting__form-input"
                                value={query}
                                onChange={this.handleInputChange}
                            />
                            <button type="submit" className="vote__form-button">
                                <img src={search} alt="Search icon" />
                            </button>
                        </form>
                    </div>
                    <div className="vote__cards">
                        <TransitionGroup component={null}>
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <CSSTransition
                                        key={item.id}
                                        timeout={300}
                                        classNames="fade"
                                    >
                                        <Card
                                            id={item.id} 
                                            title={item.title}
                                            description={item.description}
                                            imageUrl={item.imageUrl} // Передаємо зображення з API
                                            isClosed={item.isClosed}
                                            onVote={() => this.handleVote(item.id)}
                                            onDetails={() => this.handleDetails(item.id)}
                                        />
                                    </CSSTransition>
                                ))
                            ) : (
                                <CSSTransition timeout={300} classNames="fade">
                                    <p className="vote__no-results">No results found</p>
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        );
    }
}

export default Vote;

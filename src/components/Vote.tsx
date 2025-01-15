import React, { Component, ChangeEvent, FormEvent } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import stringSimilarity from 'string-similarity';
import Card from './Card';
import '../styles/vote.css';
import userImage from '../assets/images/user__img.svg';
import search from '../assets/images/searh.png';

interface CardData {
    id: number;
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

    mockData: CardData[] = [
        {
            id: 1,
            title: 'Green Future Initiative  Initiative Initiative',
            description:
                'Support the initiative to introduce green technologies into city infrastructure. Support the initiative to introduce green technologies into city infrastructure. The project involves the iSupport the initiative to introduce green technologies into city infrastructure. The project involves the iThe project involves the installation of solar panels, charging stations for electric vehicles, and reduction of CO₂ emissions.',
            imageUrl: userImage,
            isClosed: false,
        },
        {
            id: 2,
            title: 'Clean Water Project',
            description:
                'Join us in providing clean water to underprivileged communities by installing sustainable water filtration systems.',
            imageUrl: userImage,
            isClosed: true,
        },
        {
            id: 3,
            title: 'Urban Forest Development',
            description:
                'Help us create urban forests to improve air quality, reduce urban heat, and enhance biodiversity in cities.',
            imageUrl: userImage,
            isClosed: false,
        },
        {
            id: 4,
            title: 'Sustainable Agriculture',
            description:
                'Promote sustainable farming practices to enhance soil fertility, reduce waste, and improve crop yields.',
            imageUrl: userImage,
            isClosed: true,
        },
        {
            id: 5,
            title: 'Sustainable Agriculture',
            description:
                'Promote sustainable farming practices to enhance soil fertility, reduce waste, and improve crop yields.',
            imageUrl: userImage,
            isClosed: true,
        },
        {
            id: 6,
            title: 'Sustainable Agriculture',
            description:
                'Promote sustainable farming practices to enhance soil fertility, reduce waste, and improve crop yields.',
            imageUrl: userImage,
            isClosed: true,
        },
        {
            id: 7,
            title: 'Urban Forest Development',
            description:
                'Help us create urban forests to improve air quality, reduce urban heat, and enhance biodiversity in cities.',
            imageUrl: userImage,
            isClosed: false,
        },
        {
            id: 8,
            title: 'Urban Forest Development',
            description:
                'Help us create urban forests to improve air quality, reduce urban heat, and enhance biodiversity in cities.',
            imageUrl: userImage,
            isClosed: false,
        },
    ];

    componentDidMount() {
        this.setState({ filteredData: this.mockData });
    }

    handleVote = (id: number) => {
        console.log(`Voted for card with ID: ${id}`);
    };

    handleDetails = (id: number) => {
        console.log(`Details for card with ID: ${id}`);
    };

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        this.setState({ query }, this.filterData);
    };

    filterData = () => {
        const { query } = this.state;

        if (!query.trim()) {
            this.setState({ filteredData: this.mockData });
            return;
        }

        const titles = this.mockData.map((item) => item.title);
        const matches = stringSimilarity.findBestMatch(query, titles);

        const similarTitles = matches.ratings
            .filter((rating) => rating.rating > 0.4)
            .map((rating) => rating.target);

        const filteredData = this.mockData.filter((item) =>
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
                                            imageUrl={item.imageUrl}
                                            isClosed={item.isClosed} // Передаємо статус
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

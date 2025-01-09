import React, { Component, ChangeEvent, FormEvent } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import stringSimilarity from 'string-similarity';
import Card from './Card';
import '../styles/vote.css';
import userImage from '../assets/images/user__img.svg';
import search from '../assets/images/searh.png';

interface State {
    query: string;
    filteredData: {
        title: string;
        description: string;
        imageUrl: string;
    }[];
}

class Vote extends Component<{}, State> {
    state: State = {
        query: '',
        filteredData: [],
    };

    mockData = [
        {
            title: 'Green Future Initiative',
            description:
                'Support the initiative to introduce green technologies into city infrastructure. The project involves the installation of solar panels, charging stations for electric vehicles, and reduction of CO₂ emissions.',
            imageUrl: userImage,
        },
        {
            title: 'Clean Water Project',
            description:
                'Join us in providing clean water to underprivileged communities by installing sustainable water filtration systems.',
            imageUrl: userImage,
        },
        {
            title: 'Urban Forest Development',
            description:
                'Help us create urban forests to improve air quality, reduce urban heat, and enhance biodiversity in cities.',
            imageUrl: userImage,
        },
        {
            title: 'Green Future Initiative',
            description:
                'Support the initiative to introduce green technologies into city infrastructure. The project involves the installation of solar panels, charging stations for electric vehicles, and reduction of CO₂ emissions.',
            imageUrl: userImage,
        },
        {
            title: 'Clean Water Project',
            description:
                'Join us in providing clean water to underprivileged communities by installing sustainable water filtration systems.',
            imageUrl: userImage,
        },
        {
            title: 'Urban Forest Development',
            description:
                'Help us create urban forests to improve air quality, reduce urban heat, and enhance biodiversity in cities.',
            imageUrl: userImage,
        },
    ];

    componentDidMount() {
        this.setState({ filteredData: this.mockData });
    }

    handleVote = (title: string) => {
        console.log(`Voted for: ${title}`);
    };

    handleDetails = (title: string) => {
        console.log(`Details for: ${title}`);
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
            <div className="voting">
                <div className="container">
                    <div className="voting__container">
                        <h1 className="voting__title">Active voting</h1>
                        <form
                            className="voting__form"
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
                            <button type="submit" className="voting__form-button">
                                <img src={search} alt="Search icon" />
                            </button>
                        </form>
                    </div>
                    <div className="voting__cards">
                        <TransitionGroup component={null}>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <CSSTransition
                                        key={index}
                                        timeout={300}
                                        classNames="fade"
                                    >
                                        <Card
                                            title={item.title}
                                            description={item.description}
                                            imageUrl={item.imageUrl}
                                            onVote={() => this.handleVote(item.title)}
                                            onDetails={() => this.handleDetails(item.title)}
                                        />
                                    </CSSTransition>
                                ))
                            ) : (
                                <CSSTransition timeout={300} classNames="fade">
                                    <p className="voting__no-results">No results found</p>
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

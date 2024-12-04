import React, { Component } from 'react';
import Card from './Card';
import '../styles/vote.css';
import userImage from '../assets/images/user__img.svg';

class Vote extends Component {
    handleVote = (title: string) => {
        console.log(`Voted for: ${title}`);
    };

    handleDetails = (title: string) => {
        console.log(`Details for: ${title}`);
    };

    render() {
        const mockData = [
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
                title: 'Clean Water Project',
                description:
                    'Join us in providing clean water to underprivileged communities by installing sustainable water filtration systems.',
                imageUrl: userImage,
            },
            {
                title: 'Clean Water Project',
                description:
                    'Join us in providing clean water to underprivileged communities by installing sustainable water filtration systems.',
                imageUrl: userImage,
            },
            {
                title: 'Clean Water Project',
                description:
                    'Join us in providing clean water to underprivileged communities by installing sustainable water filtration systems.',
                imageUrl: userImage,
            },
            {
                title: 'Clean Water Project',
                description:
                    'Join us in providing clean water to underprivileged communities by installing sustainable water filtration systems.',
                imageUrl: userImage,
            },
        ];

        return (
            <div className="voting">
                <div className="container">
                    <div className="voting__container">
                        <h1 className="voting__title">Active voting</h1>
                        <form className="voting__form">
                            <input type="text" name="query" placeholder="Search..." />
                            <button type="submit">🔍</button>
                        </form>
                    </div>
                    <div className="voting__cards">
                        {mockData.map((item, index) => (
                            <Card
                                key={index}
                                title={item.title}
                                description={item.description}
                                imageUrl={item.imageUrl}
                                onVote={() => this.handleVote(item.title)}
                                onDetails={() => this.handleDetails(item.title)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Vote;

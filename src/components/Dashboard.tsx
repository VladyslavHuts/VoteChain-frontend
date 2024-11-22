import React, {Component} from 'react';
import '../styles/dashboard.css';
import dashboardImage from '../assets/images/dashboard__info-img.svg';

class Dashboard extends Component {
    render() {
        return (
            <section className="dashboard">
                <div className="container">
                    <div className="dashboard__container">
                        <div className="dashboard__wrapper">
                            <div className="dashboard__info">
                                <div className="dashboard__info-text">
                                    <h2 className="dashboard__subtitle">Voting information</h2>
                                    <p className="dashboard__text">Voting on our platform is a modern way of participating in making important decisions, built on the principles of transparency, security and accessibility for every user. Using the Ethereum blockchain technology.</p>
                                </div>
                                <img className="dashboard__info-image" src={dashboardImage} alt="#"/>
                            </div>
                            <div className="dashboard__option">
                                <h2 className="dashboard__subtitle">Filter Options</h2>
                                <div className="dashboard__filters">
                                    <button className="dashboard__filters-btn">Status</button>
                                    <button className="dashboard__filters-btn">Category</button>
                                    <button className="dashboard__filters-btn">By Date</button>
                                    <button className="dashboard__filters-btn">Popularity</button>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard__statistics">
                            <div className="dashboard__statistics-wrapper">
                                <div className="dashboard__graph-btns">
                                    <button className="dashboard__graph-btn">1 year</button>
                                    <button className="dashboard__graph-btn">1 month</button>
                                    <button className="dashboard__graph-btn">7 days</button>
                                </div>
                                <div className="dashboard__graph">

                                </div>
                            </div>
                            <div className="dashboard__graph-btns-stat">
                                <button className="dashboard__graph-btn-stat">New votes</button>
                                <button className="dashboard__graph-btn-stat">Active voting</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;
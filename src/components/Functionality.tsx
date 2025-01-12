import React, { Component } from 'react';
import '../styles/functionality.css';

class Functionality extends Component {
    render() {
        return (
            <div className="functionality">
                <div className="container">
                    <div className="functionality__container">
                        <div className="functionality-header">
                            <h1 className="functionality-title">System Features</h1>
                            <p className="functionality-description">
                                An overview of the features our system offers. Below, we present
                                the key features and advantages that ensure ease of use and
                                efficiency. Each feature has been designed with the user in mind
                                to provide the best experience.
                            </p>
                        </div>
                        <div className="functionality-list">
                            <div className="functionality-item">
                                <h2 className="functionality-item-title">Security</h2>
                                <p className="functionality-item-description">
                                    Our system provides high-quality security using the latest
                                    encryption technologies. This ensures full protection of user
                                    data and the security of their transactions.
                                </p>
                            </div>
                            <div className="functionality-item">
                                <h2 className="functionality-item-title">Transparency</h2>
                                <p className="functionality-item-description">
                                    All processes are fully transparent. Users have access to
                                    detailed reports and histories, enabling full control over
                                    activities within the system.
                                </p>
                            </div>
                            <div className="functionality-item">
                                <h2 className="functionality-item-title">Ease of Use</h2>
                                <p className="functionality-item-description">
                                    The system is easy to use and accessible to everyone. An
                                    intuitive interface allows quick familiarization with the
                                    features without the need for training or complex configuration.
                                </p>
                            </div>
                            <div className="functionality-item">
                                <h2 className="functionality-item-title">Availability</h2>
                                <p className="functionality-item-description">
                                    Our platform is available 24/7, allowing users to access system
                                    features at any time of the day or night. This enables quick
                                    responses to changes and market needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Functionality;

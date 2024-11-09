import React, {Component} from 'react';
import '../styles/footer.css'
import footer__img from '../assets/images/footer__img.svg';


class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="footer__wrap">
                        <div className="footer__container">
                            <ul className="footer__list">
                                <li className="footer__item">Contacts</li>
                                <li className="footer__item"><a className="footer__link">Email: support@example.com</a></li>
                                <li className="footer__item"><a className="footer__link">Phone: +1 123 456 789</a></li>
                                <li className="footer__item">
                                    <span className="footer__span">Social Media:</span>
                                    <ul className="footer__sublist">
                                        <li className="footer__subitem"><a className="footer__link">LinkedIn</a></li>
                                        <li className="footer__subitem"><a className="footer__link">X.com</a></li>
                                        <li className="footer__subitem"><a className="footer__link">GitHub</a></li>
                                    </ul>
                                </li>

                            </ul>
                            <ul className="footer__list">
                                <li className="footer__item">Documents</li>
                                <li className="footer__item"><a className="footer__link">Privacy Policy</a></li>
                                <li className="footer__item"><a className="footer__link">Terms of Service</a></li>
                                <li className="footer__item"><a className="footer__link">Documentation</a></li>
                                <li className="footer__item"><a className="footer__link">GitHub Repository</a></li>
                            </ul>
                            <ul className="footer__list">
                                <li className="footer__item">About Us</li>
                                <li className="footer__item"><a className="footer__link">Decentralized Voting System</a></li>
                                <li className="footer__item"><a className="footer__link">Powered by Ethereum Blockchain</a></li>
                                <li className="footer__item"><a className="footer__link">Transparency, Security, and Accessibility</a></li>
                            </ul>
                        </div>
                        <img className="footer__logo" src={footer__img} alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
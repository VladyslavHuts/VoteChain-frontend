import React from 'react';
import '../styles/complaintModal.css';

interface ComplaintModalProps {
    onClose: () => void;
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({ onClose }) => {
    return (
        <section className="complaint">
            <div className="complaint__overlay" onClick={onClose}></div>
            <div className="complaint__container">
                <div className="complaint__header">
                    <h2 className="complaint__title">Submit a Complaint</h2>
                </div>
                <form className="complaint__form">
                    <label className="complaint__option">
                        <span className="complaint__text">Violation of voting rules</span>
                        <input className="complaint__radio" type="radio" name="complaint" value="violation" />
                    </label>
                    <label className="complaint__option">
                        <span className="complaint__text">Suspicious activity</span>
                        <input className="complaint__radio" type="radio" name="complaint" value="suspicious" />
                    </label>
                    <label className="complaint__option">
                        <span className="complaint__text">Deception or fraud</span>
                        <input className="complaint__radio" type="radio" name="complaint" value="fraud" />
                    </label>
                    <label className="complaint__option">
                        <span className="complaint__text">Technical error</span>
                        <input className="complaint__radio" type="radio" name="complaint" value="error" />
                    </label>
                    <label className="complaint__option">
                        <span className="complaint__text">Other</span>
                        <input className="complaint__radio" type="radio" name="complaint" value="other" />
                    </label>
                    <button type="submit" className="complaint__submit">
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ComplaintModal;

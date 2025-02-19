import React, { useState } from "react";
import "../styles/complaintModal.css";

interface ComplaintModalProps {
    onClose: () => void;
    votingId: string;
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({ onClose, votingId }) => {
    const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedComplaint) {
            alert("Please select a complaint type before submitting.");
            return;
        }

        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            console.error("No authToken found in localStorage.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:80/votes/${votingId}/complain`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ complaintType: selectedComplaint }),
            });

            if (response.ok) {
                console.log('Complaint submitted successfully');
                alert("Your complaint has been submitted successfully!");
            } else {
                console.error('Error submitting complaint');
            }

            onClose();
        } catch (error) {
            console.error("Error sending complaint request:", error);
        }
    };

    return (
        <section className="complaint">
            <div className="complaint__overlay" onClick={onClose}></div>
            <div className="complaint__container">
                <div className="complaint__header">
                    <h2 className="complaint__title">Submit a Complaint</h2>
                </div>
                <form className="complaint__form" onSubmit={handleSubmit}>
                    <label className="complaint__option">
                        <span className="complaint__text">Violation of voting rules</span>
                        <input
                            className="complaint__radio"
                            type="radio"
                            name="complaint"
                            value="violation"
                            onChange={() => setSelectedComplaint("violation")}
                        />
                    </label>
                    <label className="complaint__option">
                        <span className="complaint__text">Suspicious activity</span>
                        <input
                            className="complaint__radio"
                            type="radio"
                            name="complaint"
                            value="suspicious"
                            onChange={() => setSelectedComplaint("suspicious")}
                        />
                    </label>
                    <label className="complaint__option">
                        <span className="complaint__text">Deception or fraud</span>
                        <input
                            className="complaint__radio"
                            type="radio"
                            name="complaint"
                            value="fraud"
                            onChange={() => setSelectedComplaint("fraud")}
                        />
                    </label>
                    <label className="complaint__option">
                        <span className="complaint__text">Technical error</span>
                        <input
                            className="complaint__radio"
                            type="radio"
                            name="complaint"
                            value="error"
                            onChange={() => setSelectedComplaint("error")}
                        />
                    </label>
                    <label className="complaint__option">
                        <span className="complaint__text">Other</span>
                        <input
                            className="complaint__radio"
                            type="radio"
                            name="complaint"
                            value="other"
                            onChange={() => setSelectedComplaint("other")}
                        />
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

import React, {Component} from 'react';
import VotingComponent from "../components/Voting";

class Voting extends Component {
    render() {
        return (
            <div className="voting">
            <VotingComponent/>
            </div>
        );
    }
}

export default Voting;
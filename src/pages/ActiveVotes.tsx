import React, {Component} from 'react';
import '../styles/activeVotes.css'
import Dashboard from "../components/Dashboard";
import Vote from "../components/Vote";

class ActiveVotes extends Component {
    render() {
        return (
            <div className="activeVotes">
                <Dashboard/>
                <Vote/>
            </div>
        );
    }
}

export default ActiveVotes;
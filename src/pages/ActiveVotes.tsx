import React, {Component} from 'react';
import '../styles/activeVotes.css'
import Dashboard from "../components/Dashboard";
import Vote from "../components/Vote";
import {Link} from "react-router-dom";

class ActiveVotes extends Component {
    render() {
        return (
            <div className="activeVotes">
                <Dashboard/>
                <Vote/>
                <Link to={"/add-voting"}>AddVoting</Link>
            </div>
        );
    }
}

export default ActiveVotes;
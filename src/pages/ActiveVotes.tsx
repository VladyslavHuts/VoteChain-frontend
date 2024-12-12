import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ActiveVotes extends Component {
    render() {
        return (
            <div className="activeVotes">
                <Link to={"/add-voting"}>AddVoting</Link>
            </div>
        );
    }
}

export default ActiveVotes;
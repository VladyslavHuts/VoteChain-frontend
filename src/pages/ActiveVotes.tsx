import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ActiveVotes extends Component {
    render() {
        return (
            <div className="activeVotes">
                <Link to="/Account">Aboba account</Link>
                <Link to="/Voting">Aboba voting</Link>
            </div>
        );
    }
}

export default ActiveVotes;
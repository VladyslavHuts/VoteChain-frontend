import React, {Component} from 'react';
import AddVotingForm from '../components/AddVotingForm';

class AddVoting extends Component {
    render() {
        return (
            <div className="addVoting">
                <AddVotingForm/>
            </div>
        );
    }
}

export default AddVoting;
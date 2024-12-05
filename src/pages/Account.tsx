import React, {Component} from 'react';
import AccountComponent from '../components/Account';

class Account extends Component {
    render() {
        return (
            <div className="account">
                <AccountComponent />
            </div>
        );
    }
}

export default Account;
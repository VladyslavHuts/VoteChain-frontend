import React, {Component} from 'react';

class NotFound extends Component {
    render() {
        return (
            <div className="container">
                <div style={{textAlign: 'center', marginTop: '50px'}}>
                    <h1 style={{fontSize: '100px'}}>404</h1>
                    <p>Page not found</p>
                     <button
                        onClick={() => window.location.href = '/'}
                        style={{
                            padding: '5px 20px',
                            backgroundColor: '#ccc',
                            color: '#000',
                            borderRadius: '5px',
                            fontSize: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '20px'
                        }}
                        onMouseEnter={(e) => {
                            const target = e.target as HTMLAnchorElement; // Явно вказуємо тип
                            target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            const target = e.target as HTMLAnchorElement; // Явно вказуємо тип
                            target.style.transform = 'scale(1)';
                        }}
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }
}

export default NotFound;
import React, { Component, createRef } from 'react';
import '../styles/about.css';

type State = {
    isInView: boolean[];
};

class About extends Component<{}, State> {
    blocksRef: React.RefObject<HTMLDivElement>[] = [
        createRef(),
        createRef(),
        createRef(),
    ];

    constructor(props: {}) {
        super(props);
        this.state = {
            isInView: [false, false, false],
        };
    }

    componentDidMount() {
        this.blocksRef.forEach((blockRef) => {
            blockRef.current?.addEventListener('mousemove', this.handleMouseMove);
        });
    }

    handleMouseMove = (event: MouseEvent) => {
        const element = event.currentTarget as HTMLElement;
        const { left, top, width, height } = element.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        const moveX = (x / width) * 20 - 10;
        const moveY = (y / height) * 20 - 10;
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    render() {
        return (
            <div className="about">
                <div className="container">
                    <div className="about-content">
                        <h1 className="about-title">
                            Zdecentralizowany system głosowania na blockchainie Ethereum
                        </h1>
                        <p className="about-description">
                            Przejrzystość, bezpieczeństwo i dostępność dla wszystkich
                            użytkowników.
                        </p>
                        <div className="about-blocks">
                            <div className="about-block" ref={this.blocksRef[0]}>
                                <h2 className="block-title">Przejrzystość</h2>
                                <p className="block-description">
                                    Wszystkie głosy i wyniki są dostępne do weryfikacji przez
                                    każdego użytkownika systemu.
                                </p>
                            </div>
                            <div className="about-block" ref={this.blocksRef[1]}>
                                <h2 className="block-title">Bezpieczeństwo</h2>
                                <p className="block-description">
                                    Dzięki technologii blockchain głosowanie nie może być
                                    fałszowane ani manipulowane.
                                </p>
                            </div>
                            <div className="about-block" ref={this.blocksRef[2]}>
                                <h2 className="block-title">Dostępność</h2>
                                <p className="block-description">
                                    Platforma jest dostępna dla wszystkich użytkowników bez
                                    potrzeby fizycznej obecności.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;

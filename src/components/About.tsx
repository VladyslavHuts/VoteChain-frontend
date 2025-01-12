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
                            Decentralized Voting System on the Ethereum Blockchain
                        </h1>
                        <p className="about-description">
                            Transparency, security, and accessibility for all users.
                        </p>
                        <div className="about-blocks">
                            <div className="about-block" ref={this.blocksRef[0]}>
                                <h2 className="block-title">Transparency</h2>
                                <p className="block-description">
                                    All votes and results are available for verification by
                                    every system user.
                                </p>
                            </div>
                            <div className="about-block" ref={this.blocksRef[1]}>
                                <h2 className="block-title">Security</h2>
                                <p className="block-description">
                                    Thanks to blockchain technology, voting cannot be falsified
                                    or manipulated.
                                </p>
                            </div>
                            <div className="about-block" ref={this.blocksRef[2]}>
                                <h2 className="block-title">Accessibility</h2>
                                <p className="block-description">
                                    The platform is accessible to all users without the need for
                                    physical presence.
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

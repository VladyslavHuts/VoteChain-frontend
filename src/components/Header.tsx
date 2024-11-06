import React, { Component } from 'react';
import '../styles/header.css';

// Якщо компонент не має пропсів, вказуємо пустий об'єкт {}
interface HeaderProps {}

class Header extends Component<HeaderProps> {
    componentDidMount() {
        const number: number = 42; // визначаємо число з типом "number"
        console.log("Число:", number); // виводимо в консоль
    }

    render() {
        return (
            <div className="header">
                <p>fdsfsd</p>
            </div>
        );
    }
}

export default Header;

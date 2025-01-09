import React, { Component } from 'react';
import '../styles/functionality.css';

class Functionality extends Component {
    render() {
        return (
            <div className="functionality">
                <div className="container">
                    <div className="functionality__container">
                        <div className="functionality-header">
                            <h1 className="functionality-title">Funkcje Systemu</h1>
                            <p className="functionality-description">
                                Przegląd funkcji, które oferuje nasz system. Poniżej przedstawiamy
                                kluczowe cechy i zalety, które zapewniają łatwą obsługę i efektywność
                                naszego systemu. Każda z funkcji została zaprojektowana z myślą o
                                użytkowniku, aby zapewnić mu najlepsze doświadczenie.
                            </p>
                        </div>
                        <div className="functionality-list">
                            <div className="functionality-item">
                                <h2 className="functionality-item-title">Bezpieczeństwo</h2>
                                <p className="functionality-item-description">
                                    Nasz system zapewnia wysokiej jakości bezpieczeństwo dzięki
                                    wykorzystaniu najnowszych technologii szyfrowania. Gwarantuje to
                                    pełną ochronę danych użytkowników i bezpieczeństwo ich transakcji.
                                </p>
                            </div>
                            <div className="functionality-item">
                                <h2 className="functionality-item-title">Przejrzystość</h2>
                                <p className="functionality-item-description">
                                    Wszystkie procesy są w pełni przejrzyste. Użytkownicy mają dostęp
                                    do szczegółowych raportów i historii, co pozwala na pełną kontrolę
                                    nad działaniami w systemie.
                                </p>
                            </div>
                            <div className="functionality-item">
                                <h2 className="functionality-item-title">Łatwość Obsługi</h2>
                                <p className="functionality-item-description">
                                    System jest prosty w obsłudze i dostępny dla każdego. Intuicyjny
                                    interfejs umożliwia szybkie zapoznanie się z funkcjami bez
                                    potrzeby szkolenia czy skomplikowanej konfiguracji.
                                </p>
                            </div>
                            <div className="functionality-item">
                                <h2 className="functionality-item-title">Dostępność</h2>
                                <p className="functionality-item-description">
                                    Nasza platforma jest dostępna 24/7, co pozwala użytkownikom na
                                    korzystanie z funkcji systemu o każdej porze dnia i nocy. Dzięki
                                    temu możliwe jest szybkie reagowanie na zmiany i potrzeby rynku.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Functionality;

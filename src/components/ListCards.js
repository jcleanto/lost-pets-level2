import React, { Component } from 'react';
import Card from './Card';

export default class ListCards extends Component {

    render() {

        const { cards, isLogged, openModal, donatedCard, donations } = this.props;

        return (
            <React.Fragment>
                {cards.length === 0 &&
                    <p>No pet found!</p>
                }
                {cards.map((card) => (
                    <div key={card.id} className={(donatedCard && donatedCard.id === card.id) ? "divCard card-shake" : "divCard"}>
                        <Card 
                            card={card}
                            isLogged={isLogged}
                            openModal={() => openModal(card)}
                            donations={donations}
                        />
                    </div>
                ))
                }
            </React.Fragment>
        );
    }

}
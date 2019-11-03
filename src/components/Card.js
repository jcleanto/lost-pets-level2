import React, { Component } from 'react';
import '../styles/Card.css';

export default class Card extends Component {

    constructor(props) {
        super(props);
        this.btn = React.createRef();
    }

    componentDidMount() {
        if (!this.props.isLogged) {
            this.btn.current && this.btn.current.setAttribute('disabled','disabled');
        } else {
            this.btn.current && this.btn.current.addEventListener('click', this.props.openModal);
        }
    }

    render() {
        
        const { card, donations } = this.props;
        const monthNames = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
        };
        if (!this.props.isLogged) {
            this.btn.current && this.btn.current.setAttribute('disabled','disabled');
        } else {
            this.btn.current && this.btn.current.addEventListener('click', this.props.openModal);
        }

        let totalDonations = donations.filter((donation) => donation.idAnimal === card.id)
            .reduce(function(prev, cur) {
                return prev + (cur.amount);
            }, 0);

        return (
            <div className="card radius">
                <div className="photo" style={{ backgroundImage: `url(${card.image})`}}>
                    <div className="photoHeader">
                        <div>{card && card.petName} -- #{card && card.id}</div>
                        <button className="radius">Share</button>
                    </div>
                </div>
                <div className="info">
                    <div className="infoKey">Lost</div>
                    <div className="infoValue">{card && card.dataPerdido.year}, {card && monthNames[card.dataPerdido.month]}</div>
                    <div className="infoKey">Owner</div>
                    <div className="infoValue">{card && card.owner}</div>
                    <div className="infoKey">Locality</div>
                    <div className="infoValue">{card && card.locality}</div>
                </div>
                <div className="donate">
                    <div>${totalDonations} <span>donated</span></div>
                    <button ref={this.btn} className="radius">Donate</button>
                </div>
                <div className="call">
                    <div>(<span itemProp="telephone">{card && card.ownerNumber}</span>) CALL</div>
                </div>
            </div>
        );
    }

}
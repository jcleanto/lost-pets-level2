import React, { Component } from 'react';
import '../styles/Login.css';

export default class Login extends Component {

    render() {
        const { isLogged, formRef, inputUserRef, donations, user, cards } = this.props;

        let userDonations = [];
        if (isLogged) {
            userDonations = donations.filter((donation) => { return donation.idUser === user.id; });
        }

        return (
            <div className="div-login">
                { !isLogged && 
                    <form ref={formRef} className="form-login">
                        <input ref={inputUserRef} type="text" placeholder="Username" required="required" pattern="[a-zA-Z1-9]{3,15}" title="Username should only letters or/and numbers (minimum:3, maximum:15). e.g. john" />
                        <input type="password" placeholder="Password" />
                        <button className="radius">Login</button>
                    </form>
                }
                { isLogged &&
                    <span className="div-logged">
                        <h3>Your Donations:</h3>
                        {userDonations.length === 0 &&
                            <p>No donations yet!</p>
                        }
                        <div className="cards">
                        {userDonations.map((donation) => (
                            <div key={donation.id} className="card">
                                <div className="card-container">
                                    <p>Day (Time): <span>{donation.date.substring(0,10)} ({donation.date.substring(11,16)})</span></p>
                                    <p>Pet: <span>{ cards.cards.filter((card) => { return card.id === donation.idAnimal; })[0].petName }</span></p>
                                    <p>Amount: <span>${donation.amount}</span></p>
                                </div>
                            </div>
                        ))
                        }
                        </div>
                    </span>
                }                
            </div>
        );
    }

}
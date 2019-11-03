import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import ListCards from './components/ListCards';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import { cards, users, donations } from './utils/mocks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

export default class App extends Component {

  state = {
    isLogged: false,
    route: 'list-cards',
    page: 1,
    totalCards: cards && cards.cards.length,
    searchFilter: '',
    orderField: 'dateLost',
    initialCards: cards && cards.cards,
    showModal: false,
    btnShowLoginText: 'Login',
    loading: false,
    initialDonations: donations && donations.donations,
    users: users && users.users,
    login: '',
    user: {},
    card: {},
    donatedCard: {},
    loaderText: 'loading',
  }

  constructor(props) {
    super(props);
    this.formModalRef = React.createRef();
    this.homeLink = React.createRef();
    this.btnShowLogin = React.createRef();
    this.selectOrder = React.createRef();
    this.btnLogout = React.createRef();
    this.formLogin = React.createRef();
    this.inputUser = React.createRef();
    this.btnPrev = React.createRef();
    this.btnNext = React.createRef();
    this.inputSearch = React.createRef();
  }

  componentDidMount() {
    this.btnShowLogin.current.addEventListener('click', this.showLogin);
    this.homeLink.current.addEventListener('click', this.showHome);
    this.state.route === 'login' && this.addLoginEvents();
    this.addListEvents();
  }

  addLoginEvents = () => {
    this.formLogin.current && this.formLogin.current.addEventListener('submit', this.handleLogin);
    this.homeLink.current.addEventListener('click', this.showHome);
    this.state.isLogged && this.btnLogout.current.addEventListener('click', this.handleLogout);
  }

  addListEvents = () => {
    this.btnNext.current.addEventListener('click', this.nextPage);
    this.btnPrev.current.addEventListener('click', this.prevPage);
    this.inputSearch.current.addEventListener('keyup', this.handleSearch);
    this.selectOrder.current.addEventListener('change', this.handleOrder);
    this.btnShowLogin.current.addEventListener('click', this.showLogin);
  }

  showLogin = event => {
    event.preventDefault();
    this.setState({
      loading: true,
      loaderText: 'loading',
      route: 'login',
      donatedCard: {}
    });
    asyncCall().then(() => {
      this.setState({ loading: false });
      this.addLoginEvents();
    });
  }

  showHome = event => {
    event.preventDefault();
    this.setState({
      loading: true,
      loaderText: 'loading',
      searchFilter: '',
      route: 'list-cards'
    });
    asyncCall().then(() => {
      this.setState({ 
        loading: false,
        page: 1
      });
      this.addListEvents();
    });
  }

  handleSearch = event => {
    event.preventDefault();
    let { value } = event.target;
    this.setState({
      loading: true,
      loaderText: 'searching',
      donatedCard: {}
    });
    asyncCall().then(() => {
      this.setState({
        loading: false,
        searchFilter: value,
        page: 1,
      });
    });
    this.btnPrev.current.setAttribute('disabled','disabled');
  }

  handleOrder = event => {
    event.preventDefault();
    let { value } = event.target;
    this.setState({
      loading: true,
      loaderText: 'ordering',
      donatedCard: {}
    });
    asyncCall().then(() => {
      this.setState({
        loading: false,
        orderField: value
      });
    });
  }

  handleLogin = event => {
    event.preventDefault();
    this.setState({
      loading: true,
      loaderText: 'logging in',
    });
    asyncCall().then(() => {
      this.signUser(event.target[0].value);
      this.setState({
        ...this.state,
        isLogged: true,
        btnShowLoginText: 'My Donations',
        route: 'list-cards',
        page: 1,
        loading: false,
      });
      this.btnLogout.current.addEventListener('click', this.handleLogout);
      this.addListEvents();
    });
  }

  signUser = (login) => {
    const dateObj = new Date();
    let listUsers = this.state.users;
    let user = listUsers.filter((u) => {
      let loginUser = u.login.toLowerCase();
      return loginUser === login.toLowerCase();
    });
    if (user.length <= 0) {
      const newUser = {
        id: dateObj.getTime(),
        login,
        date: dateObj.toISOString(),
      };
      this.setState({
        users: this.state.users.concat(
          newUser
        ),
        user: newUser,
      });
    } else {
      this.setState({
        user: user[0]
      });
    }
  }

  handleLogout = event => {
    event.preventDefault();
    this.setState({
      isLogged: false,
      user: {},
      btnShowLoginText: 'Login',
    });
    this.formLogin.current && this.formLogin.current.addEventListener('submit', this.handleLogin);
  }

  handleDonate = (event) => {
    event.preventDefault();
    const dateObj = new Date();
    this.setState({
      loading: true,
      loaderText: 'donating',
    });
    asyncCall().then(() => {
      this.setState({
        initialDonations: this.state.initialDonations.concat({
          id: dateObj.getTime(),
          idAnimal: this.state.card.id,
          idUser: this.state.user.id,
          amount: parseInt(event.target[0].value),
          date: dateObj.toISOString()
        }),
        loading: false,
        showModal: false,
        donatedCard: this.state.card
      });
      event.target[0].value = '';
    });
  }

  paginate = (array, page_size, page_number) => {
    --page_number;
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }

  compareNames = (a, b) => {
    return a.petName > b.petName ? 1 : b.petName > a.petName ? -1 : 0;
  }

  compareDates = (a, b) => {
    const aDate = new Date(a.dataPerdido.year, a.dataPerdido.month - 1, a.dataPerdido.day);
    const bDate = new Date(b.dataPerdido.year, b.dataPerdido.month -1, b.dataPerdido.day);
    return aDate > bDate ? -1 : bDate > aDate ? 1 : 0;
  }

  nextPage = event => {
    event.preventDefault();
    const totalPages = (parseInt(this.state.totalCards / 6));
    const newValue = (this.state.page + 1);
    if (newValue > totalPages) {
      this.btnNext.current.setAttribute('disabled','disabled');
      this.btnPrev.current.removeAttribute('disabled');
    }
    this.setState({
      loading: true,
      donatedCard: {},
      loaderText: 'loading',
    });
    asyncCall().then(() => {
      this.setState({ 
        loading: false,
        page: newValue,
      });
      this.addListEvents();
    });
  }

  prevPage = event => {
    event.preventDefault();
    const totalPages = (parseInt(this.state.totalCards / 6));
    const newValue = (this.state.page - 1);
    if (newValue <= totalPages) {
      this.btnNext.current.removeAttribute('disabled');
      this.btnPrev.current.setAttribute('disabled','disabled');
    }
    this.setState({
      loading: true,
      donatedCard: {},
      loaderText: 'loading',
    });
    asyncCall().then(() => {
      this.setState({ 
        loading: false,
        page: newValue,
      });
    });
  }

  openModal = (card) => {
    this.setState({
      loading: true,
      loaderText: 'loading',
    });
    asyncCall().then(() => {
      this.setState({ 
        loading: false,
        showModal: true,
        card
      });
      this.formModalRef.current.addEventListener('submit', this.handleDonate);
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { isLogged, page, orderField, initialCards, route, btnShowLoginText, loading, showModal, initialDonations, user, card, donatedCard, loaderText } = this.state;
    initialCards && (orderField === 'dateLost') ? initialCards.sort(this.compareDates) : initialCards.sort(this.compareNames);
    let cardsToShow = initialCards && this.paginate(
      initialCards.filter((card) => {
        let petName = card.petName.toLowerCase();
        let searchFieldValue = this.state.searchFilter;
        return petName.includes(searchFieldValue.toLowerCase());
      }), 
      6, 
      page
    );
    const totalPages = (parseInt(cardsToShow.length / 6));
    if (totalPages === 0 && route === 'list-cards') {
      this.btnNext.current && this.btnNext.current.setAttribute('disabled','disabled');
    } else {
      this.btnNext.current && this.btnNext.current.removeAttribute('disabled');
    }

    return (
      <React.Fragment>
        { loading &&
          <div className="loader-container">
            <div className="loader"></div>
            <div className="loader-text">{loaderText}</div>
          </div>
        }
        <div className="App">
          <Modal show={showModal} handleClose={this.closeModal}>
            <p><span className="bold">{card.petName} -- #{card.id}</span></p>
            <p>Owner: <span className="bold">{card.owner}</span></p>
            <p>Locality: <span className="bold">{card.locality}</span></p>
            <p>Phone: <span className="bold">{card.ownerNumber}</span></p>
            <form ref={this.formModalRef} className="form-donate">
              <input type="text" pattern="(?:[1-9]|0[1-9]|10)" required="required" title="Valor should only numbers from 1 up to 10." placeholder="Valor" maxLength="2" />
              <button className="radius">Donate</button>
            </form>
          </Modal>

          <header className="App-header">
            <div className="logo">
              <span ref={this.homeLink}><FontAwesomeIcon icon={faPaw} /> Lost Pets</span>
            </div>
            { isLogged && user && 
              <div className="welcome">{`Welcome, ${user.login}`}</div>
            }
            <button ref={this.btnShowLogin} type="button" className="radius">
              {btnShowLoginText}
            </button>
            { isLogged && user && 
              <button ref={this.btnLogout} type="button" className="radius">
                Logout
              </button>
            }
          </header>

          <div className="App-content">
          { route === 'list-cards' &&
            <React.Fragment>
              <header className="content-header">
                <div>Lost and Found Pets</div>
              </header>
              <header className="content-filter">
                <label htmlFor="region">Region </label>
                <input id="region" type="text" ref={this.inputSearch} />
                <label htmlFor="order"> Order </label>
                <select id="order" ref={this.selectOrder}>
                  <option value="dateLost">Date lost</option>
                  <option value="petsName">Pets Name</option>
                </select>
              </header>
              <div className="content-list">
                <ListCards 
                  cards={cardsToShow}
                  donatedCard={donatedCard}
                  isLogged={isLogged}
                  openModal={this.openModal}
                  donations={initialDonations}
                />
              </div>
            </React.Fragment>
          }

          { route === 'login' &&
            <React.Fragment>
              <Login 
                isLogged={isLogged}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                formRef={this.formLogin}
                inputUserRef={this.inputUser}
                donations={initialDonations}
                user={user}
                cards={cards}
              />
            </React.Fragment>
          }
          </div>

          { route === 'list-cards' &&
            <Pagination
              btnPrevRef={this.btnPrev}
              btnNextRef={this.btnNext}
              page={page}
              totalPages={totalPages}
            />
          }

          <div className="App-footer">
            <div className="copyright">&copy; 2019</div>
            <div className="socialMedia">
              <a href="https://www.facebook.com/dengun" target="_blank" rel="noopener noreferrer" class="facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://twitter.com/dengun" target="_blank" rel="noopener noreferrer" class="facebook">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://www.linkedin.com/company/dengun---new-era-technologies" target="_blank" rel="noopener noreferrer" class="facebook">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://www.instagram.com/dengun/" target="_blank" rel="noopener noreferrer" class="facebook">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
          
        </div>
      </React.Fragment>
    );
  }
}

function asyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 1000));
}
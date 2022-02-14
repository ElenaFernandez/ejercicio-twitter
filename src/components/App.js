import { useState } from 'react';
import '../styles/App.scss';
import adalabLogo from '../images/adalab-logo.png';
import callToApi from '../services/api';
import ls from '../services/localStorage';
import { useEffect } from 'react';
import MainHeader from './MainHeader';
import HeaderMenuItem from './HeaderMenuItem';
import Tweets from './Tweets';

function App() {
  const [composeIsOpen, setComposeIsOpen] = useState(false);
  const [composeText, setComposeText] = useState(ls.get('composeText', ''));
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    callToApi().then((data) => {
      setTweets(data);
    });
  }, []);

  useEffect(() => {
    ls.set('composeText', composeText);
  }, [composeText]);

  const handleTogleCompose = () => {
    setComposeIsOpen(!composeIsOpen);
  };
  const handleComposeText = (event) => {
    setComposeText(event.currentTarget.value);
  };
  const handleComposeSubmit = (event) => {
    event.preventDefault();
    tweets.unshift({
      id: '25200115',
      user: 'Adalab',
      username: 'Adalab_digital',
      date: '31 enero 2021',
      text: composeText,
      comments: 0,
      retweets: 0,
      likes: 0,
    });
    setTweets([...tweets]);
    setComposeIsOpen(false);
    setComposeText('');
  };
  const renderHeader = () => {
    return (
      <header className="header">
        <nav className="menu">
          <ul className="menu__items">
            <HeaderMenuItem
              text="Ir al inicio"
              href="/home"
              liClass="twitter"
            />
            <HeaderMenuItem text="Ir al inicio" href="/home" liClass="home" />
            <HeaderMenuItem text="Buscar" href="/search" liClass="search" />
            <HeaderMenuItem text="Perfil" href="/profile" liClass="profile" />

            <li className="menu__item menu__item--tweet">
              <button
                className="menu__link"
                title="Twittear"
                onClick={handleTogleCompose}
              >
                <span className="text">Twittear</span>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    );
  };

  const renderTweets = () => {
    return tweets.map((tweet) => {
      return <Tweets key={tweet.id} tweet={tweet} />;
    });
  };

  const renderComposeModal = () => {
    const isButtonDisabled = composeText.length === 0;
    if (composeIsOpen === true) {
      return (
        <div className="compose__modal-overlay">
          <form onSubmit={handleComposeSubmit}>
            <div className="compose__modal-wrapper">
              <div className="compose__modal-header">
                <button
                  className="compose__modal-close-btn"
                  onClick={handleTogleCompose}
                >
                  Cerrar
                </button>
              </div>
              <div className="compose__modal-content">
                <img
                  className="compose__profile-logo"
                  src={adalabLogo}
                  alt="Logo de Adalab"
                />
                <textarea
                  className="compose__profile-textarea"
                  placeholder="¿Qué está pasando?"
                  onChange={handleComposeText}
                  value={composeText}
                />
              </div>
              <div className="compose__modal-footer">
                <button
                  className="compose__modal-tweet-btn"
                  disabled={isButtonDisabled}
                >
                  Twittear
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  };
  return (
    <div className="page">
      {renderHeader()};
      <main className="main">
        <MainHeader />
        <ul> {renderTweets()}</ul>
        {renderComposeModal()}
      </main>
    </div>
  );
}

export default App;

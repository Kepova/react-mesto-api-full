import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import DeletePopup from './DeletePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { register, login, getUserData } from '../utils/mestoAuth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopup, setIsDeleteCardPopup] = useState(null);
  const [isRegisterResponsePopup, setIsRegisterResponsePopup] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  // Получение данных
  useEffect(() => {
    if (loggedIn) {
      history.push('/');
      Promise.all([api.getUser(), api.getInitialCards()])
        .then(([userData, res]) => {
          // установка данных пользователя
          setCurrentUser(userData);
          //начальные карточки
          const cardsData = res.map((card) => {
            return {
              name: card.name,
              link: card.link,
              likes: card.likes,
              _id: card._id,
              owner: {
                _id: card.owner._id
              }
            };
          })
          setCards(cardsData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  //Проверка токена
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getUserData(jwt)
        .then((response) => {
          if (response) {
            setUserEmail(response.data.email);
            setLoggedIn(true);
          }
        })
        .catch((err => {
          console.log(err);
        }))
    }
  }

  // Регистрация
  const handleRegister = ({ email, password }) => {
    register({ email, password })
      .then((data) => {
        if (data) {
          setIsRegisterResponsePopup('ok');
          history.push('/sign-in');
        }
      })
      .catch((err => {
        console.log(err);
        setIsRegisterResponsePopup('fail');
      }))
  }

  //Авторизация
  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err => {
        console.log(err);
        setIsRegisterResponsePopup('fail');
      }))
  }

  // Выход из аккаунта
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  //Лайк карточки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Удаление карточки
  const handleCardDeleteClick = (card) => {
    setIsDeleteCardPopup(card);
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Добавление карточки
  const handleAddPlaceSubmit = (card) => {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
  };

  // Изменение аватара
  const handleUpdateAvatar = (dataEditAvatar) => {
    api.changeAvatar(dataEditAvatar.avatar)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
  };

  // Редактирование данных профиля
  const handleUpdateUser = (dataEditUser) => {
    api.editProfile(dataEditUser.name, dataEditUser.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
  };

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopup(null);
    setIsRegisterResponsePopup('');
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header userEmail={userEmail} onSignOut={handleSignOut} />

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDeletePopup={handleCardDeleteClick}
          />
          <Route path="/sign-up">
            <Register loggedIn={loggedIn} onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login loggedIn={loggedIn} onLogin={handleLogin} />
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          loggedIn={loggedIn} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          loggedIn={loggedIn} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          loggedIn={loggedIn} />
        <ImagePopup card={selectedCard}
          onClose={closeAllPopups} />
        <DeletePopup card={isDeleteCardPopup}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          loggedIn={loggedIn} />
        <InfoTooltip isOpen={isRegisterResponsePopup}
          onClose={closeAllPopups} />

      </div >
    </ CurrentUserContext.Provider>
  )
};

export default App;

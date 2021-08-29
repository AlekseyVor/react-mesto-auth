import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';
import {  Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';
import PopupWithForm from './PopupWithForm'


function App() {

  
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: ''})
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegisterOk, setIsRegisterOk] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect( () => {
    handleTokenCheck();
  }, [])
  
  React.useEffect( () => {
    Promise.all([api.getInitialCards(),api.getUserInfo()])
    .then(([cards, user]) => {
      setCards(cards);
      setCurrentUser(user);
    })
    .catch((err) => {console.log(err)})
}, [])



  function handleTokenCheck() {
    if(localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((res) => {
        setUserEmail(res.data.email);
        setLoggedIn(true);
        setIsLoading(false);
      })
      .catch((err) => {console.log(err)})
    } else {
      setLoggedIn(false);
      setIsLoading(false)
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
}

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
}

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
}
function handleCardClick(card) {
  setSelectedCard(card);
}

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsRegisterPopupOpen(false);
  }

  function handleUpdateUser(data) {
    api.patchUserInfo(data)
    .then((res) => { 
        setCurrentUser(res);
        closeAllPopups();
    })
    .catch((err) => {console.log(err)})
  }

  function handleUpdateAvatar(data) {
    api.patchUserAvatar(data.avatar)
    .then((res) => { 
        setCurrentUser(res);
        closeAllPopups();
    })
    .catch((err) => {console.log(err)})
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.updateLike(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
} 

function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
    });
}

function handleAddPlace(card) {
    api.postNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
        })
    .catch((err) => {console.log(err)})
}

function handleRegister(data) {

  auth.register(data.password, data.email)
        .then((res) => {
            if(!res.hasOwnProperty('error')){
                history.push('/sign-in');
                setIsRegisterOk(false);
                setIsRegisterPopupOpen(true);
            } else {
              setIsRegisterOk(true);
              setIsRegisterPopupOpen(true);
            }
        })
        .catch((res) => {
            console.log(res);
        })
  
}

function handleLogin(data) {
  auth.authorize(data.password, data.email)
        .then((res) => {
            if(res.hasOwnProperty('token')) {
              
                localStorage.setItem('jwt', res.token);
                setUserEmail(data.email);
                setLoggedIn(true);
                history.push('/');
            }
            }
          )
          .catch(err => console.log(err));
  
}

function handleExit() {
  setLoggedIn(false);
}

  return (
    
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
    <Header isLoggedIn={loggedIn} email={userEmail} onExit={handleExit}/>
    <Switch>
    <Route exact path="/sign-in">
    <Login onLogin={handleLogin}/>
    </Route>
    <Route exact path="/sign-up">
    <Register onRegister={handleRegister}/>
    </Route>
    <Route path="/mesto-react">
    <Redirect to="/"/>
    </Route>
    <ProtectedRoute exact path="/" isLoadingRes={isLoading} isLoggedIn={loggedIn} >
    <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
    </ProtectedRoute>
    </Switch>
    <Footer/>
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}  onUpdateUser={handleUpdateUser}/>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
    <PopupWithForm title="Вы уверены?" id="delete" name="place-remove" isOpen={false} onClose={closeAllPopups} buttonText="Да">
    </PopupWithForm>
    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeAllPopups} isSuccess={isRegisterOk}/>
    </CurrentUserContext.Provider>
    </div>
    
  );
}

export default App;



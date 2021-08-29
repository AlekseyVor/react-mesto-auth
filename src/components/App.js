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
import DeletePopup from './DeletePopup';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../auth.js';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
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

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setIsDeletePopupOpen(!isDeletePopupOpen)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
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

function handleRegister(status) {
  setIsRegisterOk(status);
  setIsRegisterPopupOpen(true);
}

function handleLogin(status) {
  handleTokenCheck();
  setLoggedIn(status);
}

function handleExit() {
  setLoggedIn(false);
}

  return (
    
    <div className="page">
    <BrowserRouter>
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
    <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDeleteClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
    </ProtectedRoute>
    </Switch>
    <Footer/>
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}  onUpdateUser={handleUpdateUser}/>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
    <DeletePopup isOpen={isDeletePopupOpen} onClose={closeAllPopups}/>
    <ImagePopup card={selectedCard} onClose={closeAllPopups} onCardDelete={handleCardDelete}/>
    <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeAllPopups} isSuccess={isRegisterOk}/>
    </CurrentUserContext.Provider>
    </BrowserRouter>
    </div>
    
  );
}

export default App;



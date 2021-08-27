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


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser,setCurrentUser] = React.useState({name: '', about: '', avatar: ''})
  const [cards,setCards] = React.useState([])

  React.useEffect( () => {
    Promise.all([api.getInitialCards(),api.getUserInfo()])
    .then(([cards, user]) => {
      setCards(cards);
      setCurrentUser(user);
    })
    .catch((err) => {console.log(err)})
}, [])

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
    console.log(card);
    // api.deleteCard(card._id)
    // .then(() => {
    //    setCards((state) => state.filter((item) => item._id !== card._id))
    //});
}

function handleAddPlace(card) {
    api.postNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
        })
    .catch((err) => {console.log(err)})
}

  return (
    
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
    <Header/>
    <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDeleteClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
    <Footer/>
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}  onUpdateUser={handleUpdateUser}/>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
    <DeletePopup isOpen={isDeletePopupOpen} onClose={closeAllPopups}/>
    <ImagePopup card={selectedCard} onClose={closeAllPopups} onCardDelete={handleCardDelete}/>
    </CurrentUserContext.Provider>
    </div>
    
  );
}

export default App;



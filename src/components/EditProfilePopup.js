import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {

    const user = React.useContext(CurrentUserContext);
    
    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    React.useEffect(() => {
        setName(user.name);
        setAbout(user.about);
    }, [user, props.isOpen])

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
        name,
        about: about,
        });
    } 

    return (
    <div className={`popup__overlay ${props.isOpen ? 'popup_opened' : ''}`} id="profile">
    <div className="popup__container popup__container_theme_white">
        <h2 className="popup__title">Редактировать профиль</h2>
        <form className="form profile-editor" name="profile-editor" onSubmit={handleSubmit}> 
        <input value={name} onChange={handleChangeName} type="text" minLength="2" maxLength="40" className="popup__input popup__input_name" placeholder="Имя" id="name" required/>
        <span className="popup__input-error" id="name-error"></span>
        <input value={about} onChange={handleChangeAbout} type="text" minLength="2" maxLength="200" className="popup__input popup__input_job" placeholder="Профессия" id="about" required/>
        <span className="popup__input-error" id="about-error"></span>
        <button type="submit" className="popup__submit">Сохранить</button>
        </form>
        <button type="button" className="popup__close" onClick={props.onClose}></button>
    </div>
    </div>
    )
    }
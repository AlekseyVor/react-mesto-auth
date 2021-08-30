import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

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

        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} id="profile" title="Редактировать профиль" name="profile-editor" buttonText="Сохранить">
            <input value={name} onChange={handleChangeName} type="text" minLength="2" maxLength="40" className="popup__input popup__input_name" placeholder="Имя" id="name" required />
            <span className="popup__input-error" id="name-error"></span>
            <input value={about} onChange={handleChangeAbout} type="text" minLength="2" maxLength="200" className="popup__input popup__input_job" placeholder="Профессия" id="about" required />
            <span className="popup__input-error" id="about-error"></span>
        </PopupWithForm>


    )
}
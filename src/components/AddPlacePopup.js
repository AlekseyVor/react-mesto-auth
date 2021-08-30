import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {

    const [name, setPlaceName] = React.useState('');
    const [link, setPlaceLink] = React.useState('');

    React.useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [props.isOpen])

    function handleChangeLink(e) {
        setPlaceLink(e.target.value);
    }

    function handleChangeName(e) {
        setPlaceName(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name,
            link: link,
        });
    }

    return (

        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} id="newplace" title="Новое место" name="place-editor" buttonText="Создать">
            <input value={name} onChange={handleChangeName} name="name" type="text" minLength="2" maxLength="30" className="popup__input popup__input_place" placeholder="Название" id="place" required />
            <span className="popup__input-error" id="place-error"></span>
            <input value={link} onChange={handleChangeLink} name="link" type="url" className="popup__input popup__input_url" placeholder="Ссылка на картинку" id="url" required />
            <span className="popup__input-error" id="url-error"></span>
        </PopupWithForm>

    )
}
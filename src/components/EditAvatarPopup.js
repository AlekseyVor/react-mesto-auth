import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (

        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} id="avatar" title="Обновить аватар" name="avatar-editor" buttonText="Сохранить">
            <input ref={avatarRef} type="url" className="popup__input popup__input_url" placeholder="Ссылка на картинку" id="url-avatar" required />
            <span className="popup__input-error" id="url-avatar-error"></span>
        </PopupWithForm>

    )
}
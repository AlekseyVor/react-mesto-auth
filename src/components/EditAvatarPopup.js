import React from 'react';

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
    <div className={`popup__overlay ${props.isOpen ? 'popup_opened' : ''}`} id="avatar">
    <div className="popup__container popup__container_theme_white">
        <h2 className="popup__title">Обновить аватар</h2>
        <form className="form avatar-editor" name="avatar-editor" onSubmit={handleSubmit}> 
        <input ref={avatarRef} type="url" className="popup__input popup__input_url" placeholder="Ссылка на картинку" id="url-avatar" required/>
        <span className="popup__input-error" id="url-avatar-error"></span>
        <button type="submit" className="popup__submit">Сохранить</button>
        </form>
        <button type="button" className="popup__close" onClick={props.onClose}></button>
    </div>
    </div>
    )
    }
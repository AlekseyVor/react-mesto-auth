export default function PopupWithForm(props) {

    return (
    <div className={`popup__overlay ${props.isOpen ? 'popup_opened' : ''}`} id={props.id}>
    <div className="popup__container popup__container_theme_white">
        <h2 className="popup__title">{props.title}</h2>
        <form className={`form ${props.name}`} name={`${props.name}`}> 
        {props.children}
        <button type="submit" className="popup__submit">{props.buttonText}</button>
        </form>
        <button type="button" className="popup__close" onClick={props.onClose}></button>
    </div>
    </div>
    )
    }

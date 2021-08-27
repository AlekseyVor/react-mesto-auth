export default function DeletePopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        console.log(props.card);
        // props.onCardDelete()
    } 

    return (
    <div className={`popup__overlay ${props.isOpen ? 'popup_opened' : ''}`} id="delete">
    <div className="popup__container popup__container_theme_white">
        <h2 className="popup__title">Вы уверены?</h2>
        <form className="form place-remove" name="place-remove" onSubmit={handleSubmit}> 
        <button type="submit" className="popup__submit">Да</button>
        </form>
        <button type="button" className="popup__close" onClick={props.onClose}></button>
    </div>
    </div>
    )
    }
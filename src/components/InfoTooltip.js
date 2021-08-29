import errorPhoto from '../images/error.png';
import successPhoto from '../images/success.png';

export default function InfoTooltip(props) {
    return(
    <div className={`popup__overlay ${props.isOpen ? 'popup_opened' : ''}`} id="tooltip">
            <div className="popup__container popup__container_theme_white">
                <img src={!props.isSuccess ? successPhoto : errorPhoto} alt="result" className="popup__tooltip-img"/>
                <p className="popup__text">{!props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                <button type="button" className="popup__close" onClick={props.onClose}></button>
            </div>
    </div>
    )
}
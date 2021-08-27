export default function ImagePopup(props) {
   const isEmpty = Object.keys(props.card).length === 0;
   return(<>
      <div className={`popup__overlay popup__overlay_photo ${!isEmpty ? 'popup_opened' : ''}`} id="photo">
            <div className="popup__container popup__container_theme_transparent">
               <img className="popup__img" alt={props.card.name}
               src={props.card.link}/>
               <h2 className="popup__title-img">{props.card.name}</h2>
               <button type="button" className="popup__close" onClick={props.onClose}></button>
            </div>
      </div>
   </>)
}
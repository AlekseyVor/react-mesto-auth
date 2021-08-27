import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
        const user = React.useContext(CurrentUserContext);
        const isOwn = props.card.owner._id === user._id;
        const cardDeleteButtonClassName = (`place__delete ${isOwn ? 'place__delete_active' : ''}`);
        const isLiked = props.card.likes.some(i => i._id === user._id);
        const cardLikeButtonClassName = (`place__like ${isLiked ? 'place__like_active' : ''}`);

        function handleClick() {
        props.onCardClick(props.card);
        } 
        function handleLikeClick() {
        props.onCardLike(props.card)
        }

        function handleDeleteClick() {
        props.onCardDelete(props.card)
        }
    
        return (
            <div className="place">
                    <img src={props.card.link} alt={props.card.name} className="place__image" onClick={handleClick}/>
                    <div className="place__header">
                        <h2 className="place__title">{props.card.name}</h2>
                        <div>
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                        <p className="place__likes">{props.card.likes.length}</p>
                        </div>
                    </div>
                    <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            </div>
        )
}
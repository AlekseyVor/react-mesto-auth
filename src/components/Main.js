import Card from './Card';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {

    const user = React.useContext(CurrentUserContext);


    return(
    <main>
        <section className="profile">
            <button type="button" className="profile__avatar-edit" onClick={props.onEditAvatar}><img src={user.avatar} alt={user.name} className="profile__avatar"/></button>
            <div className="profile__info">
                <h1 className="profile__name" id="username">{user.name}</h1>
                <button type="button" className="profile__user-edit" onClick={props.onEditProfile}></button>
                <p className="profile__job" id="userjob">{user.about}</p>
            </div>
            <button type="button" className="profile__place-edit" onClick={props.onAddPlace}></button>
        </section>
        <section className="places">
        {props.cards.map( (item)  => { 
                    return (<Card  key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)
        })}
        </section>
    </main>
    )
}






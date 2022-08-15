import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDeletePopup }) {
    const { name, about, avatar, _id } = useContext(CurrentUserContext);

    const cardsElements = cards.map((card) => (
        <Card card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeletePopup={onCardDeletePopup}
            key={card._id} />
    ));

    return (
        <main className="content">
            <section className="profile">
                <a href="#" className="profile__avatar-container" onClick={onEditAvatar}>
                    <img src={avatar} alt="Аватарка" className="profile__avatar" />
                </a>
                <div className="profile__info">
                    <h1 className="profile__title">{name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                    <p className="profile__subtitle">{about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cardsElements}
            </section>
        </main>
    );
}

export default Main;

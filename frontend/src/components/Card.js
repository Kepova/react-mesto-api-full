import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDeletePopup }) {
    const currentUser = useContext(CurrentUserContext);

    const handleClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClickCard = () => {
        onCardDeletePopup(card);
    }

    // Отображение кнопки удаления карточки
    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = `element__delete-button ${isOwn ? 'element__delete-button_active' : 'element__delete-button_hidden'}`;

    // Отображение кнопки лайка
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

    return (
        <div className="element">
            <img src={card.link} alt={card.name} className="element__img" onClick={handleClick} />
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-container">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <span className="element__like-count">{card.likes.length}</span>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClickCard}></button>
        </div>);
}

export default Card;
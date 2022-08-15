import PopupWithForm from './PopupWithForm';

function DeletePopup({ card, onClose, onCardDelete, loggedIn }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm title={'Вы уверены?'}
            name={'delete-card'}
            nameButton={'Да'}
            isOpen={card?.name}
            onClose={onClose}
            onSubmit={handleSubmit}
            loggedIn={loggedIn}>
        </PopupWithForm>
    )
};

export default DeletePopup;
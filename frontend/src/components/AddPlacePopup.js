import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, loggedIn }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function changeNameCard(e) {
        setName(e.target.value);
    }

    function changeLinkCard(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm title={'Новое место'}
            name={'add'}
            nameButton={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            loggedIn={loggedIn}>
            <fieldset className="popup__info">
                <div className="popup__input-container">
                    <input type="text" name="title" id="popup__input-title" className="popup__input popup__input_info_title"
                        placeholder="Название" required minLength="2" maxLength="30" value={name || ''} onChange={changeNameCard} />
                    <div className="popup__error-container">
                        <span className="popup__input-title-error popup__error"></span>
                    </div>
                </div>
                <div className="popup__input-container">
                    <input type="url" name="link" id="popup__input-img-src" className="popup__input popup__input_info_img-src"
                        placeholder="Ссылка на картинку" required value={link || ''} onChange={changeLinkCard} />
                    <div className="popup__error-container">
                        <span className="popup__input-img-src-error popup__error"></span>
                    </div>
                </div>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
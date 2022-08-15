import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loggedIn }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    function changeNameProfile(e) {
        setName(e.target.value);
    }

    function changeProfessionProfile(e) {
        setDescription(e.target.value);
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title={'Редактировать профиль'}
            name={'edit'}
            nameButton={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            loggedIn={loggedIn}>
            <fieldset className="popup__info">
                <div className="popup__input-container">
                    <input type="text" name="name" id="popup__input-name" className="popup__input popup__input_info_name"
                        placeholder="Имя" required minLength="2" maxLength="40" value={name || ''} onChange={changeNameProfile} />
                    <div className="popup__error-container">
                        <span className="popup__input-name-error popup__error"></span>
                    </div>
                </div>
                <div className="popup__input-container">
                    <input type="text" name="profession" id="popup__input-profession"
                        className="popup__input popup__input_info_profession" placeholder="Профессия" required minLength="2"
                        maxLength="200" value={description || ''} onChange={changeProfessionProfile} />
                    <div className="popup__error-container">
                        <span className="popup__input-profession-error popup__error"></span>
                    </div>
                </div>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
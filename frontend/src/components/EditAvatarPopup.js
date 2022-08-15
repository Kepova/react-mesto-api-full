import { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loggedIn }) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    };

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm title={'Обновить аватар'}
            name={'avatar'}
            nameButton={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            loggedIn={loggedIn}>
            <fieldset className="popup__info">
                <div className="popup__input-container">
                    <input type="url" name="avatar" id="popup__input-avatar-src" className="popup__input"
                        placeholder="Ссылка на новый аватар" required ref={avatarRef} />
                    <div className="popup__error-container">
                        <span className="popup__input-avatar-src-error popup__error"></span>
                    </div>
                </div>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
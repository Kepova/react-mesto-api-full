import registerOk from '../images/register_ok.svg';
import registerFail from '../images/register_fail.svg';


function InfoTooltip({ isOpen, onClose }) {
    return (
        <div className={`popup popup_for_register-response ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <img src={`${isOpen == 'ok' ? registerOk : registerFail} `} alt={`${isOpen == 'ok' ? 'Успешная регистрация' : 'Ошибка регистрации'}`} className="popup__img-register-response" />
                <h2 className="popup__register-response-title">{`${isOpen == 'ok' ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так!
Попробуйте ещё раз.`}`}</h2>
                <button type="button" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function Register(props) {
    const [formUserData, setFormUserData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormUserData((data) => ({
            ...data,
            [name]: value
        }))
    }

    const handleRegister = (e) => {
        e.preventDefault();
        props.onRegister({ email: formUserData.email, password: formUserData.password });
    };

    return (
        <PopupWithForm title={'Регистрация'}
            name={'register'}
            nameButton={'Зарегистрироваться'}
            loggedIn={props.loggedIn}
            onSubmit={handleRegister}
        >

            <fieldset className="popup__login">
                <div className="popup__input-container">
                    <input type="email" name="email" id="popup__input_info_email" className="popup__input-login popup__input_info_email"
                        placeholder="E-mail" required minLength="2" maxLength="30" value={formUserData.email || ''} onChange={handleChange} />
                    <div className="popup__error-container">
                        <span className="popup__input_info_email-error popup__error"></span>
                    </div>
                </div>
                <div className="popup__input-container">
                    <input type="password" name="password" id="popup__input-password" className="popup__input-login popup__input_info_password"
                        placeholder="Пароль" required value={formUserData.password || ''} onChange={handleChange} />
                    <div className="popup__error-container">
                        <span className="popup__input-password-error popup__error"></span>
                    </div>
                </div>
            </fieldset>

        </PopupWithForm>
    );
}

export default Register;
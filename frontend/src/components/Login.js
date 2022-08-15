import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function Login(props) {
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

    const handleLogin = (e) => {
        e.preventDefault();
        if (!formUserData.email || !formUserData.password) {
            return
        }
        props.onLogin({ email: formUserData.email, password: formUserData.password })
    };

    return (
        <PopupWithForm title={'Вход'}
            name={'login'}
            nameButton={'Войти'}
            loggedIn={props.loggedIn}
            onSubmit={handleLogin}
            isOpen={false}
        >
            <fieldset className="popup__login">
                <div className="popup__input-container">
                    <input type="email" name="email" id="popup__input-login-email" className="popup__input-login popup__input_info_email"
                        placeholder="E-mail" required minLength="2" maxLength="30" value={formUserData.email || ''} onChange={handleChange} />
                    <div className="popup__error-container">
                        <span className="ppopup__input-login-email-error popup__error"></span>
                    </div>
                </div>
                <div className="popup__input-container">
                    <input type="password" name="password" id="popup__input-login-password" className="popup__input-login popup__input_info_password"
                        placeholder="Пароль" required value={formUserData.password || ''} onChange={handleChange} />
                    <div className="popup__error-container">
                        <span className="popup__input-login-password-error popup__error"></span>
                    </div>
                </div>
            </fieldset>
        </PopupWithForm>
    );
}

export default Login;
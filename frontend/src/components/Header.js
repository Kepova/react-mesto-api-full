import logo from '../images/logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

function Header({ userEmail, onSignOut }) {

    const handleClickOut = () => {
        onSignOut();
    };

    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="logo" />
            <Switch>
                <Route exact path="/">
                    <div className='header__user-status'>
                        <p className='header__email-user'>{userEmail}</p>
                        <Link to='/sign-in' className='header__link' onClick={handleClickOut}>Выйти</Link>
                    </div>
                </Route>
                <Route path="/sign-up">
                    <Link to='/sign-in' className='header__link'>Войти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link to='/sign-up' className='header__link'>Регистрация</Link>
                </Route>
            </Switch>
        </header>

    );
}

export default Header;
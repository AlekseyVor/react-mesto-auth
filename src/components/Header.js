import React from 'react';
import logoHeaderPath from '../images/header-logo.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';

export default function Header(props) {
        const location = useLocation();
        const history = useHistory();

        function signOut() {
                localStorage.removeItem('jwt');
                props.onExit();
                history.push('/sign-in');
                
        }

return (
<header className="header">
        <img src={logoHeaderPath} alt="Лого" className="header__logo"/>
        {props.isLoggedIn 
        ? <div className="header__user"><p className="header__email">{props.email}</p><Link to="/sign-in" className="header__exit" onClick={signOut}>Выйти</Link></div>
        : <Link  to={location.pathname === '/sign-up' ? '/sign-in' : '/sign-up'} className="header__link">{location.pathname === '/sign-up' ? 'Войти' : 'Регистрация'}</Link>
        }
        
</header>
)
}
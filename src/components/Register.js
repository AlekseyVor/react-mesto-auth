import React from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onRegister({
            email: email,
            password: password
        })

    } 


    return (
        
        <div className="register">
        <h2 className="register__title">Регистрация</h2>
        <form className="form register__form" onSubmit={handleSubmit}>
        <input value={email} onChange={handleChangeEmail} type="e-mail" minLength="2" maxLength="40" className="register__input register__input_email" placeholder="Email" id="email" required/>
        <input value={password} onChange={handleChangePassword} type="password" minLength="2" maxLength="40" className="register__input register__input_password" placeholder="Пароль" id="password" required/>
        <button type="submit" className="register__button">Зарегистрироваться</button>
        </form>
        <p className="register__text">Уже зарегистрированы? <span><Link to="/sign-in" className="register__link">Войти</Link></span></p>
        </div>
    )
    }
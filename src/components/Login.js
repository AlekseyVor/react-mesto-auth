import React from 'react';

export default function Login(props) {
    

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
        props.onLogin({
            email: email,
            password: password
        })
    } 
    
    
    
    return (
        <div className="login">
        <h2 className="login__title">Вход</h2>
        <form className="form login__form" onSubmit={handleSubmit}>
        <input value={email} onChange={handleChangeEmail} type="e-mail" minLength="2" maxLength="40" className="login__input login__input_email" placeholder="Email" id="email" required/>
        <input value={password} onChange={handleChangePassword} type="password" minLength="2" maxLength="40" className="login__input login__input_password" placeholder="Пароль" id="password" required/>
        <button className="login__button">Войти</button>
        </form>
        </div>

    )
    }
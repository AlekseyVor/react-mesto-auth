import logoHeaderPath from '../images/header-logo.svg';

export default function Header() {
return (
<header className="header">
        <img src={logoHeaderPath} alt="Лого" className="header__logo"/>
</header>
)
}
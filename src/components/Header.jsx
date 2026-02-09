import { Link } from "react-router-dom";

function Header(){
    return (
        <header>
            <img src="src\assets\react.svg" alt="" />
            <nav>
                <Link to="/">Home</Link>
                <Link to="/prices">Prices</Link>
                <Link to="/services">Services</Link>
                <Link to="/contacts">Contacts</Link>
                <Link to="/other">Other</Link>
            </nav>
        </header>
    );
}

export default Header;
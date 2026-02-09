import { Outlet } from "react-router-dom";
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

function Footer(){
    return (
        <footer>
            <p>© 2024 Scrap Metal Recycling</p>
            <p>Contacts: +7 (812) 123-45-67</p>
            <p>Email: info@scrapmetalrecycling.ru</p>
        </footer>
    );
}

function Layout(){
    return (
        <div className="layout">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
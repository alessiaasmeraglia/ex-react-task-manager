import { NavLink } from 'react-router-dom';

function Navbar() {
    function getLinkClass({ isActive }) {
        return isActive ? 'nav-link active' : 'nav-link';
    }

    return (
        <nav className="navbar">
            <NavLink
                to="/"
                end
                className={getLinkClass}
            >
                Lista dei task
            </NavLink>

            <NavLink
                to="/add-task"
                className={getLinkClass}
            >
                Aggiungi task
            </NavLink>
        </nav>
    );
}

export default Navbar;
import '../views/Nav.scss';
import { Link, NavLink } from 'react-router-dom';


const Nav = () => {
    return (
        <div className="topnav">
            <NavLink className={({isActive}) => isActive ? "active1" : undefined} to="/">Home</NavLink>
            <NavLink className={({isActive}) => isActive ? "active1" : undefined} to="/timer">TImer Apps</NavLink>
            <NavLink className={({isActive}) => isActive ? "active1" : undefined} to="/todo">Todo Apps</NavLink>
            <NavLink className={({isActive}) => isActive ? "active1" : undefined} to="/blog">Blog Apps</NavLink>
            <NavLink className={({isActive}) => isActive ? "active1" : undefined} to="/secret">Secret</NavLink>
        </div>
    );
}

export default Nav;
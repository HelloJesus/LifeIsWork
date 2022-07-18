import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li className={classes.item}><NavLink to="/profile" className={navData => navData.isActive ? classes.active : ''}>Profile</NavLink></li>
        <li className={classes.item}><NavLink to="/dialogs" className={navData => navData.isActive ? classes.active : ''}>Messages</NavLink></li>
        <li className={classes.item}><NavLink to="/news" className={navData => navData.isActive ? classes.active : ''}>News</NavLink></li>
        <li className={classes.item}><NavLink to="/users" className={navData => navData.isActive ? classes.active : ''}>Users</NavLink></li>
        {/* <li className={classes.item}><a href="#" className={navData => navData.isActive ? classes.active : ''}>Logout</a></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;  
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <img src="https://i.pinimg.com/550x/97/c0/f6/97c0f6a134b5803bc95e3ca243338960.jpg" />
      <div className={classes.loginBlock}>
        {props.isAuth ? (<div>{props.login} - <button onClick={props.logout}>Logout</button></div>) :
          <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  );
}

export default Header;
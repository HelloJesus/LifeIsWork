import { NavLink } from "react-router-dom";
import classes from './DialogItem.module.css';

const DialogItem = (props) => {
  return (
    <div className={classes.dialog + ' ' + classes.active}>
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </div>
  );
}

export default DialogItem;
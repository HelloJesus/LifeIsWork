import classes from './Message.module.css';

const Message = (props) => {
  return (
    <div>
      <div className={classes.message}>{props.message}</div>
    </div>
  );
}

export default Message;
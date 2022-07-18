import classes from './Post.module.css';

const Post = (props) => {
  return (
    <div className={classes.item}>
      <img className={classes.item_img} src="https://cdn-icons-png.flaticon.com/512/147/147142.png" />
      {props.message}
      <div>
        <span>Like</span> {props.likesCount}
      </div>
    </div>
  );
}

export default Post;
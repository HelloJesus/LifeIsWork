import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, Formik, Form } from "formik"
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  postMe: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('')
})

const MyPosts = (props) => {

  // отрисовываем посты
  let postsElements = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount} key={post.id} />)

  // добавляем пост
  let addPost = (values) => {
    props.addPost(values);
  }

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        < Formik
          initialValues={{
            postMe: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log(values);
            addPost(values.postMe)
          }}
        >
          {({ errors }) => (
            <Form>
              <Field
                component={"textarea"}
                id={"postMe"}
                name={"postMe"}
                type={"text"}
              />
              {errors.postMe ? (<p>{errors.postMe}</p>) : null}
              <div>
                <button type="submit">Add post</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={classes.posts}>
        {postsElements}
      </div>


    </div>
  );
}

export default MyPosts;
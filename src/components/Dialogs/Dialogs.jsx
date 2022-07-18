import { Navigate } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem'
import classes from './Dialogs.module.css'
import Message from './Message/Message'
import { Field, Formik, Form } from "formik"
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  message: Yup.string()
    .min(1, 'Too Short!')
    .max(20, 'Too Long!')
    .required('')
})

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogElements = state.dialogs.
    map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />)

  let messageElements = state.messages.
    map(text => <Message message={text.message} key={text.id} />)

  let onSendMessageClick = (values) => {
    props.sendMessage(values);
  }

  if (props.isAuth === false) return <Navigate to={"/login/"} />

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogElements}
      </div>
      <div className={classes.messages}>
        <div>{messageElements}</div>
        <div>
          <Formik
            initialValues={{
              message: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              // console.log(values);
              onSendMessageClick(values.message)
            }}
          >
            {({ errors }) => (
              <Form>
                <div>
                  {/* <textarea value={state.newMessageBody}
                  onChange={onNewMessageChange}
                  placeholder="Enter your message"></textarea> */}
                  <Field
                    component="textarea"
                    name="message"
                    id="message"
                    placeholder="Enter your message" />
                  {errors.message ? (<div>{errors.message}</div>) : null}
                </div>

                <div><button type="submit">Send message</button></div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

    </div >
  );
}

export default Dialogs;
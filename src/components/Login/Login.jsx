import { connect } from "react-redux";
import { Field, Formik, Form, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { login } from "../../redux/auth-reducer"
import { Navigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required')
    .matches(/(^[aA-zZ]{3,})/, 'Login must be English symbols'),
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
})

const LoginForm = (props) => {

  return (
    <div>
      < Formik
        initialValues={{
          login: '',
          password: '',
          rememberMe: false
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, onSubmitProps) => {
          onSubmitProps.setSubmitting(true);
          props.login(values.login, values.password, values.rememberMe, onSubmitProps.setStatus, onSubmitProps.setSubmitting)
        }}
      >
        {({ errors, touched, status, isSubmitting }) => (

          <Form>
            <div>
              <label htmlFor="login">Login</label>
              <Field
                placeholder={"Login"}
                id={"login"}
                name={"login"}
                type={"text"}
              />

            </div>
            <ErrorMessage name="login" />
            {/* {errors.login && touched.login ? (<p>{errors.login}</p>) : null} */}
            <div>
              <label htmlFor="password">Password</label>
              <Field
                placeholder={"Password"}
                id={"password"}
                name={"password"}
                type={"password"}
              />
              {/* {errors.password && touched.password ? (<p>{errors.password}</p>) : null} */}
            </div>
            <ErrorMessage name="password" />
            <div>
              <Field
                type={"checkbox"}
                id={"remembeMe"}
                name={"rememberMe"}
              />remember me
            </div>
            {/* {!status ?  null : status.error} */}
            <div>
              <button type="submit" disabled={isSubmitting}>Login</button>
            </div>
            {status && <div>{status}</div>}

          </Form>
        )}
      </Formik>
    </div>
  )
}

const Login = (props) => {
  // Перенаправление на другую страницу реализовано через хук useNavigate
  // Решить вопрос с ошибкой через хук
  // let navigate = useNavigate();
  if (props.isAuth) {
    // navigate("/profile")
    return <Navigate to={"/profile"} />
  }

  return <div>
    <h1>Login</h1>
    <LoginForm {...props} />
  </div>
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)
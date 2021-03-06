import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA, data: { userId, email, login, isAuth }
})

export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.setAuthUserData()
  if (response.resultCode === 0) {
    let { id, login, email } = response.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}

export const login = (email, password, rememberMe, setStatus, setSubmitting) =>
  async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.resultCode === 0) {
      dispatch(getAuthUserData())
    }
    else {
      setStatus(response.messages)
    }
    setSubmitting(false)
  }

export const logout = () =>
  async (dispatch) => {
    let response = await authAPI.logout()
    if (response.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
  }


export default authReducer;
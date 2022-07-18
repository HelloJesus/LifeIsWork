import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IN_FOLLOWING_PROGRESS = "TOGGLE_IN_FOLLOWING_PROGRESS";

let initialState = {
  users: [
    //   {
    //     id: 1, photoUrl: 'https://avatarfiles.alphacoders.com/578/thumb-57843.jpg',
    //     followed: true, fullname: 'Nikita', status: 'I am a man', location: { city: 'Kiev', country: 'Ukraine' }
    //   },
    //   {
    //     id: 2, photoUrl: 'https://avatarfiles.alphacoders.com/578/thumb-57843.jpg',
    //     followed: false, fullname: 'Valeria', status: 'I am from Belarus', location: { city: 'Minsk', country: 'Belarus' }
    //   },
    //   {
    //     id: 3, photoUrl: 'https://avatarfiles.alphacoders.com/578/thumb-57843.jpg',
    //     followed: false, ullname: 'Dmitry', status: 'This is my frist status', location: { city: 'Warsaw', country: 'Poland' }
    //   }
  ],
  pageSize: 5,
  totalUsersCount: 22,
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
        // users: state.users.map(user => {
        //   if (user.id === action.userId) {
        //     return { ...user, followed: true }
        //   }
        //   return user;
        // })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
        // users: state.users.map(user => {
        //   if (user.id === action.userId) {
        //     return { ...user, followed: false }
        //   }
        //   return user;
        // })
      }
    case SET_USERS:
      return { ...state, users: action.users }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }
    case TOGGLE_IN_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    default:
      return state;
  }

};

export const followSucces = (userId) => ({ type: FOLLOW, userId })
export const unfollowSucces = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalCountUsers = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IN_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (page, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true))
  let response = await usersAPI.getUsers(page, pageSize)
  dispatch(toggleIsFetching(false))
  dispatch(setUsers(response.items))
  dispatch(setTotalCountUsers(response.totalCount))
}


const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId))
  let response = await apiMethod(userId)
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow, followSucces)
}

export const unfollow = (userId) => async (dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.unfollow, unfollowSucces)
}


export default usersReducer;
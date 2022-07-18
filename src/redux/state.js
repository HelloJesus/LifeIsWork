import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar";


let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hello', likesCount: 5 },
        { id: 2, message: 'My first post', likesCount: 8 },
        { id: 3, message: 'My second post', likesCount: 11 }
      ],
      newPostText: ''
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: 'Andrey' },
        { id: 2, name: 'Katya' },
        { id: 3, name: 'Nikita' },
        { id: 4, name: 'Sveta' }
      ],
      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Have a good day' },
        { id: 3, message: 'How are you?' }
      ],
      newMessageBody: ''
    },
    sidebar: {}
  },

  _callSubscriber() {
    console.log(1);
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
   
  }

}

export default store;
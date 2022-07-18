const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.values;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }]
      };

    default:
      return state;
  }

}

export const sendMessageCreator = (values) => ({ type: SEND_MESSAGE, values });

export default dialogsReducer;
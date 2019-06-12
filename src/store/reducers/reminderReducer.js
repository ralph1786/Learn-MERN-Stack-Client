const initialState = {
  reminders: []
};

const remindersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_REMINDERS":
      return {
        ...state,
        reminders: action.payload
      };
    case "ADD_REMINDER":
      return {
        ...state,
        reminders: [action.payload, ...state.reminders]
      };
    case "COMPLETE_REMINDER":
      return state.reminders.map(reminder => {
        if (reminder._id === action.payload._id) {
          return {
            ...state,
            ...action.payload
          };
        } else {
          return state;
        }
      });
    case "REMOVE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.filter(
          reminder => reminder._id !== action.payload
        )
      };
    default:
      return state;
  }
};

export default remindersReducer;

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import remindersReducer from "./reducers/reminderReducer";
import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";

const middleware = [thunk];

const rootReducer = combineReducers({
  reminders: remindersReducer,
  auth: authReducer,
  error: errorReducer
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnError } from "./errorActions";

const getAllReminders = listReminders => {
  return {
    type: "GET_ALL_REMINDERS",
    payload: listReminders
  };
};

const addReminder = reminder => {
  return {
    type: "ADD_REMINDER",
    payload: reminder
  };
};

const toggleReminderComplete = reminder => {
  return {
    type: "COMPLETE_REMINDER",
    payload: reminder
  };
};

const removeReminder = id => {
  return {
    type: "REMOVE_REMINDER",
    payload: id
  };
};

export const fetchAllReminder = () => {
  return dispatch => {
    axios
      .get("/api/reminder")
      .then(res => dispatch(getAllReminders(res.data)))
      .catch(err => {
        dispatch(returnError(err.response.data, err.response.status));
      });
  };
};

export const createReminder = reminder => {
  return (dispatch, getState) => {
    axios
      .post("/api/reminder", { title: reminder }, tokenConfig(getState))
      .then(res => dispatch(addReminder(res.data)))
      .catch(err => {
        dispatch(returnError(err.response.data, err.response.status));
      });
  };
};

export const updateReminder = (completed, id, author) => {
  return (dispatch, getState) => {
    console.log(completed, id, author);
    axios
      .put(
        `/api/reminder/${id}`,
        { completed: completed, author: author },
        tokenConfig(getState)
      )
      .then(res => {
        dispatch(toggleReminderComplete(res.data));
      })
      .catch(err => console.log(err));
  };
};

export const deleteReminder = id => {
  return (dispatch, getState) => {
    axios
      .delete(`/api/reminder/${id}`, tokenConfig(getState))
      .then(res => {
        if (res.data.message) {
          dispatch(removeReminder(id));
        }
      })
      .catch(err => {
        dispatch(returnError(err.response.data, err.response.status));
      });
  };
};

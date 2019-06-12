//Return errors
export const returnError = (message, status, id = null) => {
  return {
    type: "GET_ERRORS",
    payload: {
      message: message,
      status: status,
      id: id
    }
  };
};

//Clear errors
export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS"
  };
};

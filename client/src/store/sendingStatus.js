const IS_SENDING = "IS_SENDING";

export const setIsSending = (sendingStatus) => {
  return {
    type: IS_SENDING,
    sendingStatus
  };
};

const reducer = (state = false, action) => {
  switch (action.type) {
    case IS_SENDING: {
      return action.sendingStatus;
    }
    default:
      return state;
  }
};

export default reducer;

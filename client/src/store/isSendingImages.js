const IS_SENDING_IMGS = "IS_SENDING_IMGS";

export const sendingImgs = (sendingStatus) => {
  return {
    type: IS_SENDING_IMGS,
    sendingStatus
  };
};

const reducer = (state = false, action) => {
  switch (action.type) {
    case IS_SENDING_IMGS:
      return action.sendingStatus;
    default:
      return state;
  }
};

export default reducer;

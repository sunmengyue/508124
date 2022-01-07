const UPLOAD_IMAGES = "UPLOAD_IMAGES";

export const setImageUrls = (imageUrls) => {
  return {
    type: UPLOAD_IMAGES,
    imageUrls
  };
};

const reducer = (state = [], action) => {
  switch(action.type) {
    case UPLOAD_IMAGES:
      return action.imageUrls;
    default:
      return state;
  }
};

export default reducer;
import { DISPLAY_DETAILS } from "../types/MovieManagementTypes";

const initialState = {
  movieInfo: {
    movieId: "",
    movieName: "",
    alias: "",
    imageUrl: "",
    trailer: "",
    description: "",
    releaseDate: "",
    groupCode: "",
    rating: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_DETAILS: {
      state.movieInfo = action.values;
      return { ...state };
    }
    default:
  }
  return { ...state };
};

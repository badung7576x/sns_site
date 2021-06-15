import { SET_USER, LOG_OUT, SET_ERRORS } from "../types";

const initialState = {
  authenticated: false,
  error: null,
  credentials: {},
  follower: [],
  following: [],
  likes: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
      };
    case LOG_OUT:
      return {
        authenticated: false,
      };
    case SET_ERRORS:
      return {
        error: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;

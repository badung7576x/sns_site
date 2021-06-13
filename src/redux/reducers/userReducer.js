import {
  SET_USER,
  LIKE_POST,
  UNLIKE_POST,
  LOG_OUT,
} from '../types';

const initialState = {
  authenticated: false,
  credentials: {},
  follower: [],
  following: [],
  likes: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload
      };
    case LOG_OUT:
        return {
          authenticated: false,
        };
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userId: state.credentials.userId,
            postId: action.payload.postId
          }
        ]
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        )
      };
    default:
      return state;
  }
}

export default userReducer

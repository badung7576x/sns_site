import {
  SET_POSTS,
  LIKE_POST,
  COMMENT_POST,
  DELETE_POST,
  SET_POST,
  LOADING_USERS
} from '../types';

const initialState = {
  posts: [],
  users: [],
};

const dataReducer = (state = initialState, action) => {
  let index = -1;
  if (action?.payload?.postId) {
    index = state.posts.findIndex(
      (post) => post.id === action.payload.postId
    );
  }
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case LOADING_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload
      };
    case LIKE_POST:
      if(index !== -1) {
        state.posts[index].post.likes = action.payload.data.likes;
      }
      return {
        ...state
      };
    case DELETE_POST:
      if(index !== -1) {
        state.posts.splice(index, 1);
      }
      return {
        ...state
      };
    case COMMENT_POST:
      if(index !== -1) {
        state.posts[index].comments = action.payload.data.comments;
      }
      return {
        ...state
      };
    default:
      return state;
  }
}

export default dataReducer;

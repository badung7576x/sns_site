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
      let index = state.posts.findIndex(
        (post) => post.id === action.payload.postId
      );
      if(index !== -1) {
        state.posts[index].post.likes = action.payload.data.likes;
      }
      return {
        ...state
      };
    case DELETE_POST:
      index = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(index, 1);
      return {
        ...state
      };
    case COMMENT_POST:
      let index2 = state.posts.findIndex(
        (post) => post.id === action.payload.postId
      );
      if(index2 !== -1) {
        state.posts[index2].comments = action.payload.data.comments;
      }
      return {
        ...state
      };
    default:
      return state;
  }
}

export default dataReducer;

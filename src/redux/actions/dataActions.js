import {
  SET_POSTS,
  LOADING_USERS,
  LIKE_POST,
  COMMENT_POST, 
  DELETE_POST
} from '../types';

import FirebaseService from '../../services/firebaseService';

// Get all posts
export const getPosts = () => async (dispatch) => {
  const posts = await FirebaseService.getAllDocuments('posts', 'post')
  dispatch({type: SET_POSTS, payload: posts})
};

// Get all users
export const getUsers = () => async (dispatch) => {
  const users = await FirebaseService.getAllDocuments('users', 'user')
  dispatch({type: LOADING_USERS, payload: users})
};

// Like a post
export const likePost = (postId, data) => async (dispatch) => {
  await FirebaseService.updateDocument('posts', postId, data)
  dispatch({type: LIKE_POST, payload: {postId: postId, data}})
};

// Like a post
export const commentPost = (postId, data) => async (dispatch) => {
  await FirebaseService.updateDocument('posts', postId, data)
  dispatch({type: COMMENT_POST, payload: {postId: postId, data}})
};

// Delete a post
export const deletePost = (postId) => async (dispatch) => {
  await FirebaseService.deleteDocument('posts', postId)
  dispatch({type: DELETE_POST, payload: {postId: postId}})
};


import {
  SET_POSTS,
  LOADING_USERS
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

// export const getPost = (postId) => (dispatch) => {
//   axios
//     .get(`/post/${postId}`)
//     .then((res) => {
//       dispatch({
//         type: SET_POST,
//         payload: res.data
//       });
//     })
//     .catch((err) => console.log(err));
// };
// // Post a post
// export const postPost = (newPost) => (dispatch) => {
//   dispatch({ type: LOADING_UI });
//   axios
//     .post('/post', newPost)
//     .then((res) => {
//       dispatch({
//         type: POST_POST,
//         payload: res.data
//       });
//       dispatch(clearErrors());
//     })
//     .catch((err) => {
//       dispatch({
//         type: SET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };
// // Like a post
// export const likePost = (postId) => (dispatch) => {
//   axios
//     .get(`/post/${postId}/like`)
//     .then((res) => {
//       dispatch({
//         type: LIKE_POST,
//         payload: res.data
//       });
//     })
//     .catch((err) => console.log(err));
// };
// // Unlike a post
// export const unlikePost = (postId) => (dispatch) => {
//   axios
//     .get(`/post/${postId}/unlike`)
//     .then((res) => {
//       dispatch({
//         type: UNLIKE_POST,
//         payload: res.data
//       });
//     })
//     .catch((err) => console.log(err));
// };
// // Submit a comment
// export const submitComment = (postId, commentData) => (dispatch) => {
//   axios
//     .post(`/post/${postId}/comment`, commentData)
//     .then((res) => {
//       dispatch({
//         type: SUBMIT_COMMENT,
//         payload: res.data
//       });
//       dispatch(clearErrors());
//     })
//     .catch((err) => {
//       dispatch({
//         type: SET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };
// export const deletePost = (postId) => (dispatch) => {
//   axios
//     .delete(`/post/${postId}`)
//     .then(() => {
//       dispatch({ type: DELETE_POST, payload: postId });
//     })
//     .catch((err) => console.log(err));
// };

// export const getUserData = (userId) => (dispatch) => {
//   dispatch({ type: LOADING_DATA });
//   axios
//     .get(`/user/${userId}`)
//     .then((res) => {
//       dispatch({
//         type: SET_POSTS,
//         payload: res.data.posts
//       });
//     })
//     .catch(() => {
//       dispatch({
//         type: SET_POSTS,
//         payload: null
//       });
//     });
// };

// export const clearErrors = () => (dispatch) => {
//   dispatch({ type: CLEAR_ERRORS });
// };

import {
  SET_USER,
  LOG_OUT
} from '../types';

import FirebaseService from '../../services/firebaseService';

export const loginUser = (userCredentials, history) => async (dispatch) => {
  const user = await FirebaseService.signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
  localStorage.setItem('userId', user.uid)
  dispatch(getUserData(user.uid))
  history.push('/')
};

export const registerUser = (userCredentials, history) => async (dispatch) => {
  const user = await FirebaseService.createAccountWithEmailAndPassword(userCredentials.email, userCredentials.password);
  const userData = {
    userId: user.uid,
    nickname: userCredentials.nickname,
    email: userCredentials.email,
    avatar: '',
    createdAt: new Date().toISOString(),
  };
  FirebaseService.setDocumentToCollection('users', user.uid, userData)
  localStorage.setItem('userId', user.uid)
  dispatch(getUserData(user.uid))
  history.push('/')
};



export const getUserData = (userId) => async (dispatch) => {
  const userData = await FirebaseService.getDocument('users', userId)
  dispatch({type: SET_USER, payload: {credentials: userData}});
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userId')
  console.log('AAA')
  dispatch({type: LOG_OUT})
};

// export const uploadImage = (formData) => (dispatch) => {
//   axios
//     .post('/user/image', formData)
//     .then(() => {
//       dispatch(getUserData());
//     })
//     .catch((err) => console.log(err));
// };

// export const editUserDetails = (userDetails) => (dispatch) => {
//   axios
//     .post('/user', userDetails)
//     .then(() => {
//       dispatch(getUserData());
//     })
//     .catch((err) => console.log(err));
// };

import {
  SET_USER,
  LOG_OUT,
  SET_ERRORS
} from '../types';

import FirebaseService from '../../services/firebaseService';

export const loginUser = (userCredentials, history) => async (dispatch) => {
  const res = await FirebaseService.signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
  if(!res.error) {
    localStorage.setItem('userId', res.user.uid)
    dispatch(getUserData(res.user.uid))
    history.push('/')
  } else {
    dispatch({type: SET_ERRORS, payload: res.message})
  }
  
};

export const registerUser = (userCredentials, history) => async (dispatch) => {
  const res = await FirebaseService.createAccountWithEmailAndPassword(userCredentials.email, userCredentials.password);
  if(res.error) {
    dispatch({type: SET_ERRORS, payload: res.message})
  } else {
    const userData = {
      userId: res.user.uid,
      nickname: userCredentials.nickname,
      email: userCredentials.email,
      avatar: '',
      createdAt: new Date().toISOString(),
    };
    FirebaseService.setDocumentToCollection('users', res.user.uid, userData)
    localStorage.setItem('userId', res.user.uid)
    dispatch(getUserData(res.user.uid))
    history.push('/')
  }
};



export const getUserData = (userId) => async (dispatch) => {
  const userData = await FirebaseService.getDocument('users', userId)
  dispatch({type: SET_USER, payload: {credentials: userData}});
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userId')
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

export const updateInfo = async (userDetails) => {
  try {
      const userId = localStorage.getItem('userId');
      const userInfo = await FirebaseService.getDocument('users', userId);
      const updatedObj = { ...userInfo, nickname: userDetails.nickname, jiko: userDetails.jiko };
      if (userInfo != null) {
          await FirebaseService.updateDocument('users', userId, updatedObj);
      }
  } catch (err) {
      console.log(err);
  }
};

export const updateAvatar = async (img) => {
  try {
      const imgUrl = await FirebaseService.uploadImage(img);
      const userId = localStorage.getItem('userId');
      const userInfo = await FirebaseService.getDocument('users', userId);
      if (userInfo != null) {
          await FirebaseService.updateDocument('users', userId, { ...userInfo, avatar: imgUrl });
      }
  } catch (err) {
      console.log(err);
  }
};

export const writePost = async (content, img) => {
  try {
      const imgUrl = await FirebaseService.uploadImage(img);
      const data = {...content, image: imgUrl};
      console.log(data);
      await FirebaseService.addDocumentToCollection("posts", data);
  } catch (err) {
      console.log(err);
  }
};



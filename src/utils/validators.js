const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string == null) return true;
  if (string.trim() === '') return true;
  else return false;
};

exports.validateRegisterData = (data) => {
  let errors = {};

  if (isEmpty(data.nickname)) errors.nickname = 'ニックネームが必要です';

  if (isEmpty(data.email)) {
    errors.email = 'メールアドレスが必要です';
  } else if (!isEmail(data.email)) {
    errors.email = 'メールアドレスが無効です';
  }

  if (isEmpty(data.password)) errors.password = 'パスワードが必要です';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'パスワードが一致しません';

    return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'メールアドレスが必要です';
  } else if (!isEmail(data.email)) {
    errors.email = 'メールアドレスが無効です';
  }
  if (isEmpty(data.password)) errors.password = 'パスワードが必要です';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.birthday.trim())) userDetails.birthday = data.birthday;

  return userDetails;
};

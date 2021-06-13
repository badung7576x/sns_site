import { React, useState } from 'react'
import "./register.css";
import { NavLink, useHistory } from "react-router-dom";
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { validateRegisterData } from '../../utils/validators'
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/userActions';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'blue',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'blue',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray',
      },
      '&:hover fieldset': {
        borderColor: 'gray',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'gray',
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  },
  registerBtn: {
    marginTop: '10px',
    height: '50px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#1775ee',
    color: 'white',
    fontSize: '20px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '10px 40px',
  }
}));

const Register = (props) => {
  const classes = useStyles();

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [errors, setErrors] = useState([])

  const history = useHistory()

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCrediential = {
      nickname: nickname,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    const res = validateRegisterData(userCrediential)
    if(res.valid) {
      dispatch(registerUser(userCrediential, history))
    } else {
      setErrors(res.errors)
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <NavLink exact to="/">
          <div className="logo">
            <img src="assets/logo.jpg" alt="logo"/>
          </div>
          <h3 className="title">Hedspi SNS</h3>
        </NavLink>
        <form noValidate onSubmit={handleSubmit}>
          <div className="registerBox">
            <CssTextField
              id="nickname"
              type="text"
              label="ニックネーム"
              variant="outlined"
              className={classes.margin}
              helperText={errors.nickname}
              error={errors.nickname ? true : false}
              value={nickname}
              onChange={e => setNickname(e.target.value)}
            />
            <CssTextField
              id="email"
              type="email"
              label="メールアドレス"
              variant="outlined"
              className={classes.margin}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <CssTextField
              id="password"
              type="password"
              label="パスワード"
              variant="outlined"
              className={classes.margin}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <CssTextField
              id="confirm-password"
              type="password"
              label="パスワード(確認)"
              variant="outlined"
              className={classes.margin}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.registerBtn}
              disabled={user.loading}
            > {user.loading ? (
                <CircularProgress size={30} className={classes.progress} />
              ) : '登録'}
            </Button>
            <span className="hasAccount">
              既にアカウントをお待っている方は
              <NavLink exact to='/login'>こちら</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register

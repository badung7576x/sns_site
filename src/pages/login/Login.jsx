import { React, useState } from 'react'
import "./login.css";
import { NavLink, useHistory } from "react-router-dom";
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { validateLoginData } from '../../utils/validators'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import { SET_ERRORS } from '../../redux/types';

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
  loginButton: {
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

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const error = useSelector(state => state.user.error)
  const dispatch = useDispatch()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const userCrediential = {
      email: email,
      password: password,
    };
    const res = validateLoginData(userCrediential)
    if(res.valid) {
      dispatch(loginUser(userCrediential, history))
    } else {
      setErrors(res.errors)
      setLoading(false)
    }
  };

  const onChangeInput = (e) => {
    setLoading(false)
    setErrors([])
    if(e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
    dispatch({type: SET_ERRORS, payload: null})
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <NavLink exact to="/">
          <div className="logo">
            <img src="assets/logo.jpg" alt="logo"/>
          </div>
          <h3 className="title">Hedspi SNS</h3>
        </NavLink>
        <form noValidate onSubmit={handleSubmit}>
          <div className="loginBox">
            {error && (<div className='error'>{error}</div>)}
            <CssTextField
              name="email"
              type="email"
              label="メールアドレス"
              variant="outlined"
              className={classes.margin}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={email}
              onChange={onChangeInput}
            />
            <CssTextField
              name="password"
              type="password"
              label="パスワード"
              variant="outlined"
              className={classes.margin}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={password}
              onChange={onChangeInput}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.loginButton}
              disabled={loading}
            > {loading ? (
                <CircularProgress size={30} className={classes.progress} />
              ) : 'ログイン'}
            </Button>
            <span className="hasAccount">
              アカウントをお待ちでない場合はこちらから
              <NavLink exact to="/register">申し込み</NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

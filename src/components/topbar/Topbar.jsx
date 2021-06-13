import {React, useState} from 'react'
import "./topbar.css";
import { Home, Group, AccountCircle } from "@material-ui/icons";
import {Menu, MenuItem } from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

const Topbar = (props) => {
  const user = useSelector(state => state.user)
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
    setAnchorEl(null);
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <NavLink exact to="/">
          <img src="assets/logo.jpg" alt="logo"/>
          <span>Hedspi SNS</span>
        </NavLink>
      </div>
      <div className="topbarCenter">
        <div className="topbarIcons">
          <NavLink exact to="/">
            <Home />
          </NavLink>
          <NavLink exact to="/users">
            <Group />
          </NavLink>
          <NavLink exact to="/profile">
            <AccountCircle />
          </NavLink>
        </div>
      </div>
      <div className="topbarRight">
        { user.authenticated ? (
          <div>
            <div className="avatarBox" onClick={handleClick}>
              <img src={user.credentials.avatar || 'assets/no_avatar.png'} alt="" className="avatar"/>
              <span className="name">{user.credentials.nickname}さん</span>
            </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
            </Menu>
          </div>
           ) : (
          <div className="btnBox">
            <NavLink exact to="/login">ログイン</NavLink>
            <NavLink exact to="/register">新規登録</NavLink>
          </div>
        )} 
      </div>
    </div>
  );
}

export default Topbar;

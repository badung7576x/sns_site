import "./topbar.css";
import { Home, Group, AccountCircle } from "@material-ui/icons";
import {
  NavLink
} from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <img src="assets/logo.jpg"/>
        <span>Hedspi SNS</span>
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
        <div className="avatarBox">
          <img src="/assets/person/1.jpeg" alt="" className="avatar"/>
          <span className="name">バズン</span>
        </div>
      </div>
    </div>
  );
}

import "./topbar.css";
import { Home, Group, AccountCircle } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <img src="assets/logo.jpg"/>
        <span>Hedspi SNS</span>
      </div>
      <div className="topbarCenter">
        <div className="topbarIcons">
          <div className="active">
            <Home />
          </div>
          <div>
            <Group />
          </div>
          <div>
            <AccountCircle />
          </div>
        </div>
      </div>
      <div className="topbarRight">
        {/* <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div> */}
        <div className="avatarBox">
          <img src="/assets/person/1.jpeg" alt="" className="avatar"/>
          <span className="name">バズン</span>
        </div>
      </div>
    </div>
  );
}

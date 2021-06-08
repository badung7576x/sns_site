import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Jikoshoukai from "../../components/jikoshoukai/Jikoshoukai";
import { Edit } from "@material-ui/icons";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        {/* <Sidebar /> */}
        <div style={{flex: 3}}></div>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="assets/person/7.jpeg"
                alt=""
              />
              <div className="profileInfo">
                <h4 className="profileInfoName">ニックネーム</h4>
                <Edit />
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Jikoshoukai />
            <Feed />
            {/* <Rightbar profile/> */}
          </div>
        </div>
        <div style={{flex: 3}}></div>
      </div>
      
    </>
  );
}

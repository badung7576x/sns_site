import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Jikoshoukai from "../../components/jikoshoukai/Jikoshoukai";
import { Edit } from "@material-ui/icons";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector(state => state.user)
  const posts = useSelector((state) => state.data.posts);
  const myPost = posts.filter(post => post.post.userId === user.credentials?.userId)

  return (
    <div>
      { user.authenticated && (<>
        <Topbar />
        <div className="profile">
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
                  src={user.credentials?.avatar  || 'assets/no_avatar.png'}
                  alt=""
                />
                <div className="profileInfo">
                  <h4 className="profileInfoName">{user.credentials?.nickname}</h4>
                  <Edit />
                </div>
              </div>
            </div>
            <div className="profileRightBottom">
              <Jikoshoukai content={user.credentials?.jiko} />
              <Feed posts={myPost}/>
            </div>
          </div>
          <div style={{flex: 3}}></div>
        </div>
      </>)}
    </div>
  );
}

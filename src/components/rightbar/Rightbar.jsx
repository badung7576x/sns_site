import "./rightbar.css";
import NewFriend from "../newFriend/NewFriend";
import { useSelector } from "react-redux";

export default function Rightbar({ profile }) {
  const me = useSelector(state => state.user.credentials)
  let users = useSelector(state => state.data.users)
  if(me) {
    users = users.filter(user => user.id !== me.userId) 
  }
  

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <h4 className="rightbarTitle">おすすめユーザ</h4>
        <ul className="rightbarFriendList">
          {users ? users.map((u) => (
            <NewFriend key={u.userId} user={u.user} />
          )) : ''}
        </ul> 
      </div>
    </div>
  );
}

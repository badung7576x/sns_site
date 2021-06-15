import "./newFriend.css";
import { PersonAdd } from "@material-ui/icons";


export default function NewFriend({user}) {

  return (
    <li className="sidebarFriend">
      <div className="sidebarUser">
        <img className="sidebarFriendImg" src={user?.avatar  || 'assets/no_avatar.png'} alt="" />
        <span className="sidebarFriendName">{user.nickname}</span>
      </div>
      <PersonAdd />
    </li>
  );
}

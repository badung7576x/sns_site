import "./newFriend.css";
import { PersonAdd } from "@material-ui/icons";

export default function NewFriend({user}) {
  return (
    <li className="sidebarFriend">
      <div className="sidebarUser">
        <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
      </div>
      <PersonAdd />
    </li>
  );
}

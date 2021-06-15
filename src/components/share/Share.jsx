import "./share.css";
import { useSelector } from "react-redux";

export default function Share({showModal, content}) {
  const user = useSelector(state => state.user)

  const focusInput = () =>  {
    showModal()
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.credentials?.avatar  || 'assets/no_avatar.png'} alt="" />
          <input
            placeholder="何をしている？"
            className="shareInput"
            readOnly value = {content}
            onClick={focusInput}
          />
        </div>
      </div>
    </div>
  );
}

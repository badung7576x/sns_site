import "./share.css";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

export default function Share({showModal, content}) {

  const focusInput = () =>  {
    showModal()
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
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

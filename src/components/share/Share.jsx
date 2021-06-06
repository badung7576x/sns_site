import "./share.css";

export default function Share({showModal}) {

  const focusInput = () =>  {
    // showModal()
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder="何をしている？"
            className="shareInput"
            onFocus={focusInput}
          />
        </div>
      </div>
    </div>
  );
}

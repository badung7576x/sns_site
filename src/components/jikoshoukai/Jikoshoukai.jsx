import "./jikoshoukai.css";

export default function Jikoshoukai({content}) {
  return (
    <div className="jiko">
      <div className="jikoWrapper">
        <div className="card">
          <h4>自己紹介</h4>
          <hr />
          <div className="content">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

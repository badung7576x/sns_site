import "./register.css";

export default function Register() {
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="logo">
          <img src="assets/logo.jpg" />
        </div>
        <h3 className="title">Hedspi SNSサイト</h3>

        <div className="registerBox">
          <input placeholder="ニックネーム" className="input-form" />
          <input placeholder="メールアドレス" className="input-form" />
          <input placeholder="パスワード" className="input-form" />
          <input placeholder="パスワード(確認)" className="input-form" />

          <button className="registerButton">登録</button>

          <span className="hasAccount">
            既にアカウントをお待っている方は
            <a href="#">こちら</a>
          </span>
        </div>
      </div>
    </div>
  );
}

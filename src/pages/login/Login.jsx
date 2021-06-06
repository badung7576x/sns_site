import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="logo">
          <img src="assets/logo.jpg" />
        </div>
        <h3 className="title">Hedspi SNSサイト</h3>

        <div className="loginBox">
          <input placeholder="メールアドレス" className="input-form" />
          <input placeholder="パスワード" className="input-form" />

          <button className="loginButton">ログイン</button>

          <span className="hasAccount">
            アカウントをお待ちでない場合はこちらから
            <a href="#">申し込み</a>
          </span>
        </div>
      </div>
    </div>
  );
}

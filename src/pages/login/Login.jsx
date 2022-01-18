import "./login.css"

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social App</h3>
          <span className="loginDesc">
            Connect with dogs ant the world arround you on Social App
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input type="Email" className="loginInput" placeholder="Email" />
            <input type="Password" className="loginInput" placeholder="Password" />
            <button className="loginButton">Log in</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">Create a new account</button>
          </div>
        </div>
      </div>
    </div>
  )
}

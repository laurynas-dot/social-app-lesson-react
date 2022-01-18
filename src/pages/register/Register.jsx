import "./register.css"

export default function Register() {
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
            <input type="Username" className="loginInput" placeholder="Username" />
            <input type="Email" className="loginInput" placeholder="Email" />
            <input type="Password" className="loginInput" placeholder="Password" />
            <input type="Repeat Password" className="loginInput" placeholder="Repeat Password" />
            <button className="loginButton">Sign up</button>
            <button className="loginRegisterButton">
              Log into Account
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

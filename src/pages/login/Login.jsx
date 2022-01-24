import { useRef } from "react";
import "./login.css"

export default function Login() {
  const email = useRef();
  const password = useRef();
  const handleClick = (e) => {
    e.preventDefault();
  }

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
            <form className="loginBox" onSubmit={handleClick}>
              <input type="Email" type="email" className="loginInput" 
                placeholder="Email" ref={email} required />
              <input type="Password" type="password" className="loginInput" 
                placeholder="Password" ref={password} required minLength="6" />
              <button className="loginButton">Log in</button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">Create a new account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

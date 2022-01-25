import { useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
const email = useRef();
  const password = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({email: email.current.value, password: password.current.value}, dispatch);
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
              <button className="loginButton" type="submit" disabled={isFetching}>
                {isFetching ? <CircularProgress color="white"/> : "Log In"}
              </button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton" type="submit" disabled={isFetching}>
                {isFetching ? <CircularProgress color="white"/> : "Create a new account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useRef } from "react";
import "./register.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
      await axios.post("auth/register", user);
      navigate("/login");
      } catch (e) {
        console.log(e);
      }
    }
  };

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
          <form className="loginBox" onSubmit={handleClick}>
            <input type="Username" required ref={username} className="loginInput" placeholder="Username" />
            <input type="Email" type="email" required ref={email} className="loginInput" placeholder="Email" />
            <input type="Password" type="password" minLength="6" required ref={password} className="loginInput" placeholder="Password" />
            <input type="Repeat Password" type="password" required ref={passwordAgain} className="loginInput" placeholder="Repeat Password" />
            <button className="loginButton" type="submit" >Sign up</button>
            <button className="loginRegisterButton">
              Log into Account
              </button>
          </form>
        </div>
      </div>
    </div>
  )
}

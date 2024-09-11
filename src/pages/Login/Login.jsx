import "./Login.css";
import assets from "../../assets/assets";
import { useState } from "react";
import { signup } from "../../config/firebase";
const Login = () => {
  const [currentState, setCurrentState] = useState("Sign-Up");
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="login">
      <img src={assets?.logo_big} alt="" className="logo" />
      <form className="login-form">
        <h2>{currentState}</h2>
        {currentState === "Sign-Up" && (
          <input
            value={userName}
            
            type="text"
            placeholder="UserName"
            required
            className="form-input"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="form-input"
        />
        <input
          type="password"
          placeholder="password"
          required
          className="form-input"
        />
        <button className="sign-up" type="submit">
          {currentState === "Sign-Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-term">
          <input type="checkbox" />
          <p> Agree to the terms of use and privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currentState === "Sign-Up" ? (
            <p className="login-toggle">
              Already have an account{" "}
              <span onClick={() => setCurrentState("Login")}> Click here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create your account now{" "}
              <span onClick={() => setCurrentState("Sign-Up")}>
                {" "}
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;

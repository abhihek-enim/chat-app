import "./Login.css";
import assests from "../../assets/assets";
import { useContext, useState } from "react";
import { signUp, login, resetPassword } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currState, setCurrState] = useState("Sign Up");
  const { showLoader, hideLoader } = useContext(AppContext);
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState == "Sign Up") {
      showLoader();
      signUp(userName, email, password);
      hideLoader();
    } else {
      showLoader();
      login(email, password);
      hideLoader();
    }
  };
  return (
    <div className="login">
      <img src={assests?.logo_big} alt="logo_big" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState == "Sign Up" && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            required
            placeholder="username"
            className="form-input"
          />
        )}

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          placeholder="email"
          className="form-input"
        />
        <input
          onChange={(e) => setPassword(e?.target?.value)}
          value={password}
          type="password"
          required
          placeholder="password"
          className="form-input"
        />
        <button type="submit">{currState}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy. </p>
        </div>
        <div className="login-forgot">
          {currState == "Sign Up" ? (
            <p className="login-toggle">
              Already have an account{" "}
              <span onClick={() => setCurrState("Login")}>Click here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an Account{" "}
              <span onClick={() => setCurrState("Sign Up")}>Sign Up</span>
            </p>
          )}
          {
            currState=="Login"?<p className="login-toggle">
            Forgot Password{" "}
            <span onClick={() => resetPassword(email)}>Reset Here</span>
          </p>:null
          }
        </div>
      </form>
    </div>
  );
};

export default Login;

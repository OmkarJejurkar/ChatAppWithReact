import { useEffect, useState } from "react";
import LoginError from "./LoginError";
import styles from "./LoginPage.module.css";
function LoginPage(props) {
  function authenticate(e) {
    console.log(e.target.userName.value, e.target.password.value);
    e.preventDefault();
    props.authenticateUser(e.target.userName.value, e.target.password.value);
  }

  return (
    <center>
      <div className={styles.login_form}>
        <img
          src="src/assets/img/icon.png"
          style={{ height: "80px", width: "110px", marginTop: "40px" }}
        />
        <form onSubmit={authenticate} className={styles.formContent}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="username"
              id="userName"
              style={{ width: "299px" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="password"
              id="password"
            />
          </div>

          {props.loginState == "loggedInFailed" && <LoginError></LoginError>}

          <button type="submit" className={`btn btn-primary ${styles.btn}`}>
            Login
          </button>

          <button
            type="button"
            className={`btn btn-secondary ${styles.btn}`}
            onClick={props.signUpClicked}
          >
            SignUp
          </button>
        </form>
      </div>
    </center>
  );
}
export default LoginPage;

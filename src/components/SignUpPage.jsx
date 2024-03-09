import { useState } from "react";
import SignUpError from "./SignUpError";
import styles from "./SignUpPage.module.css";
import { GiCrossMark } from "react-icons/gi";

function SignUpPage(props) {
  let [validationAlert, setValidationAlert] = useState(false);
  function registerUser(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const username = e.target.userName.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    if (!passwordRegex.test(password)) {
      setValidationAlert(true);
      return;
    }

    // Confirm password matching
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match.");
      return;
    }

    props.registerUser(name, email, username, password);
  }
  return (
    //     <div className={styles.signUpForm}>

    //     </div>
    // ----
    <center>
      <div class="card" style={{ width: "24rem", marginTop: "70px" }}>
        <div class="card-body">
          {validationAlert && (
            <div class="alert alert-danger" role="alert">
              "Password must have at least 8 characters, including 1 number, 1
              uppercase letter, and 1 lowercase letter."
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                onClick={() => setValidationAlert(false)}
                style={{ cursor: "pointer" }}
              >
                <GiCrossMark />
              </span>
            </div>
          )}
          <h5 class="card-title">
            {props.signUpState == "signedUp" && (
              <div
                class="alert alert-success"
                role="alert"
                style={{ fontFamily: "sans-serif" }}
              >
                Signed Up Successfully !!!
              </div>
            )}
            <img
              src="src/assets/img/icon.png"
              style={{
                height: "60px",
                width: "90px",
                marginTop: "40px",
                marginBottom: "30px",
              }}
            />
            <h4>Sign Up</h4>
          </h5>
          <p class="card-text">
            <form onSubmit={registerUser}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  id="name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  id="email"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="userName"
                  id="userName"
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
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                />
              </div>
              {props.signUpState == "signUpFailed" && (
                <SignUpError></SignUpError>
              )}
              <button type="submit" className={`btn btn-primary ${styles.btn}`}>
                Sign Up
              </button>

              <button
                type="button"
                className={`btn btn-secondary ${styles.btn}`}
                onClick={props.loginClicked}
              >
                Login
              </button>
            </form>
          </p>
        </div>
      </div>
    </center>
  );
}

export default SignUpPage;

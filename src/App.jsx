import { useContext, useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import { connect } from "./components/StompCode";
import global from "global";
window.global = global;

function App() {
  let [loginState, setLoginState] = useState("");
  let [signUpState, setSignUpState] = useState("notSignedUp");
  let [choice, setChoice] = useState("loginPage");
  let [msgArrived, setMsgArrived] = useState(false);

  function onMessageReceived(msg) {
    console.log("------------------------inside on message recieved");
    setMsgArrived((prevState) => !prevState);
  }

  function authenticateUser(username, password) {
    let data = { userName: username, password: password };
    fetch("http://localhost:8081/authenticateUser", {
      method: "POST",
      mode: "cors", // Add this line to allow cross-origin requests
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Login successful!");
          setLoginState(data.userName);
          console.log(data.userName);
          connect(onMessageReceived);
        } else {
          console.error("Login failed");
          setLoginState("loggedInFailed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function registerUser(name, email, userName, password) {
    let data = {
      name: name,
      email: email,
      userName: userName,
      password: password,
    };
    fetch("http://localhost:8081/register", {
      method: "POST",
      mode: "cors", // Add this line to allow cross-origin requests
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setSignUpState("signedUp");
          console.log("Registration successful!");
        } else {
          setSignUpState("signUpFailed");
          console.log("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function signUpClicked() {
    setChoice("signUpPage");
  }

  function loginClicked() {
    setChoice("loginPage");
  }

  return (
    <>
      {choice === "loginPage" ? (
        loginState == "" || loginState == "loggedInFailed" ? (
          <LoginPage
            authenticateUser={authenticateUser}
            signUpClicked={signUpClicked}
            loginState={loginState}
          ></LoginPage>
        ) : (
          <HomePage loginState={loginState} msgArrived={msgArrived}></HomePage>
        )
      ) : (
        <SignUpPage
          loginClicked={loginClicked}
          registerUser={registerUser}
          signUpState={signUpState}
        ></SignUpPage>
      )}
    </>
  );
}

export default App;

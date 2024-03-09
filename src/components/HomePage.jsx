import Header from "./Header";
import SideBar from "./SideBar";
import styles from "./HomePage.module.css";
import { useState } from "react";
import ProfileContent from "./ProfileContent";
import MessageContent from "./MessageContent";

function HomePage(props) {
  let [menu, setMenu] = useState("profile");
  let [searchedUserList, setSearchedUserList] = useState([]);
  function changeMenu(e) {
    setMenu(e);
  }

  function fetchSearchedUser(searchName) {
    console.log("inside search user " + searchName);
    if (
      searchedUserList.includes(searchName) ||
      searchName == props.loginState
    ) {
      return;
    }
    var url = "http://localhost:8081/getUserByUserName/" + searchName;
    console.log(url);
    fetch(url, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Return the JSON-parsed response
        } else {
          throw new Error("No such user with userName : " + searchName);
        }
      })
      .then((data) => {
        setSearchedUserList((prevList) => {
          return [data.userName, ...prevList];
        });
        console.log(data.userName);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error occurred: " + error.message);
      });
  }

  return (
    <div className={styles.container}>
      <SideBar
        menu={menu}
        setMenu={changeMenu}
        loginState={props.loginState}
      ></SideBar>
      <div className={styles.innerContainer}>
        <Header></Header>
        {/* <ProfileContent></ProfileContent> */}
        <MessageContent
          submitForm={fetchSearchedUser}
          searchedUserList={searchedUserList}
          loginState={props.loginState}
          msgArrived={props.msgArrived}
        ></MessageContent>
      </div>
    </div>
  );
}

export default HomePage;

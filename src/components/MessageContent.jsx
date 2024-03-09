import { useState } from "react";
import styles from "./MessageContent.module.css";
import { MdChat } from "react-icons/md";
import MessageModel from "./MessageModel";
import { FaSearch } from "react-icons/fa";
import { sendMessage } from "./StompCode";

function MessageContent(props) {
  let [whoseMessage, setWhoseMessage] = useState("");
  let [chatList, setChatList] = useState([
    { content: "hiiii" },
    { content: "hello" },
  ]);

  function submitMyForm(e) {
    e.preventDefault();
    props.submitForm(e.target.searchName.value);
    e.target.searchName.value = "";
  }

  function closeModel() {
    setWhoseMessage("");
  }

  function sendMsg(msg) {
    console.log("#########################" + props.loginState);
    sendMessage(msg, props.loginState, whoseMessage);
  }

  return (
    <div className={styles.container}>
      <div
        className="card"
        style={{ width: "31rem", marginLeft: "309px", marginTop: "16px" }}
      >
        <div className="card-body">
          <h5 className="card-title">
            <form onSubmit={submitMyForm}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="search any one here"
                id="searchName"
              />
              <button type="submit" className={styles.searchBtn}>
                <FaSearch />
              </button>
            </form>
          </h5>
          <p className="card-text">
            <ul className="list-group list-group-flush ">
              {props.searchedUserList.length != 0
                ? props.searchedUserList.map((userName) => (
                    <li
                      className={`list-group-item ${styles.searchedName}`}
                      onClick={() => setWhoseMessage(userName)}
                    >
                      {userName}
                      <MdChat className={styles.chatIcon} />
                    </li>
                  ))
                : null}
            </ul>
          </p>
        </div>
      </div>

      {/* 
        <div className={styles.content}>
          <>
            
           
          </>
        </div>
      </div> */}
      {whoseMessage != "" ? (
        <MessageModel
          name={whoseMessage}
          chatList={chatList}
          closeModel={closeModel}
          sendMessage={sendMsg}
          loginState={props.loginState}
          onMessageReceived={props.onMessageReceived}
          msgArrived={props.msgArrived}
        ></MessageModel>
      ) : null}
    </div>
  );
}

export default MessageContent;

import { useEffect, useState } from "react";
import styles from "./MessageModel.module.css";
import { GiCrossMark } from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";
import MsgButton from "./MsgButton";
import { AiOutlineSend } from "react-icons/ai";

function MessageModel(props) {
  console.log("message model painted");
  let [myChats, setMyChats] = useState([]);
  // let [showButtons, setShowButtons] = useState(false);

  function getMessagesFromServer() {
    console.log(props.loginState, props.name);
    let data = {
      senderName: props.name,
      recieverName: props.loginState,
    };
    console.log("inside get messages from server");

    fetch("http://localhost:8081/getMessages", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setMyChats(data);
      });
  }

  function sendMessage(e) {
    console.log(props.msgArrived);
    e.preventDefault();
    props.sendMessage(e.target.message.value);
    e.target.message.value = "";
  }

  function deleteMessage(id) {
    let url = "http://localhost:8081/deleteMessageById/" + id;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!" + id);
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      body: "",
      headers: { "Content-Type": "application/json" },
    }).then((response) => getMessagesFromServer());
  }

  function setReaction(messageId, reactionId) {
    let url =
      "http://localhost:8081/setReaction/" + messageId + "/" + reactionId;
    console.log("---------------------------------------------" + url);
    fetch(url, {
      method: "PUT",
      mode: "cors",
      body: "",
      headers: { "Content-Type": "application/json" },
    }).then((response) => getMessagesFromServer());
  }

  useEffect(() => {
    // Call the API function when component is rendered
    getMessagesFromServer();
  }, [props.name, props.msgArrived]);

  return (
    // <div className={styles.container}>
    <>
      <div
        className="card"
        style={{ marginTop: "10px", width: "484px", marginLeft: "10px" }}
      >
        <div className={`card-body ${styles.body}`}>
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={props.closeModel}
            style={{
              cursor: "pointer",
            }}
          >
            <GiCrossMark />
          </span>
          <h5 className={`card-title ${styles.title}`}>
            <RiUserFill />
            {props.name}
          </h5>
          {myChats.map((chat) => (
            <p
              className="card-text"
              style={{
                textAlign: chat.senderName === props.name ? "left" : "right",
              }}
            >
              {/* <button
                className="btn btn-info"
                style={{ borderRadius: "20px" }}
                onMouseEnter={() => setShowButtons(true)}
                onMouseLeave={() => setShowButtons(false)}
              >
                {chat.content}
                {showButtons && (
                  <div className="position-absolute" style={{}}>
                    <button className="btn btn-primary me-2">Button 1</button>
                    <button className="btn btn-secondary">Button 2</button>
                  </div>
                )}
              </button>

              <br />
              <div className={styles.msgTime}>{chat.hr + " :" + chat.min}</div> */}
              <MsgButton
                chat={chat}
                deleteMessage={deleteMessage}
                setReaction={setReaction}
              ></MsgButton>
            </p>
          ))}
        </div>
        <div class="card-footer text-center">
          <form onSubmit={sendMessage}>
            <input type="text" id="message" />
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginLeft: "10px" }}
              value="send"
            >
              <AiOutlineSend />
            </button>
          </form>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default MessageModel;

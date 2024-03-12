// import { useState } from "react";
// import { MdDeleteOutline } from "react-icons/md";
// import { FaShare } from "react-icons/fa";
// import styles from "./MsgButton.module.css";
// import { FcEmptyTrash } from "react-icons/fc";
// import { FcRedo } from "react-icons/fc";
// function MsgButton(props) {
//   let [showButtons, setShowButtons] = useState(false);
//   return (
//     <>
//       <button
//         className="btn btn-info"
//         style={{ borderRadius: "20px" }}
//         onMouseEnter={() => setShowButtons(true)}
//         onMouseLeave={() => setShowButtons(false)}
//       >
//         {props.chat.content}
//         {showButtons && (
//           <div
//             className="position-absolute row"
//             style={{
//               height: "10px",
//               width: "fit-content",
//             }}
//           >
//             <button className={`${styles.option1} col-6`}>
//               <FcRedo />
//             </button>
//             <button className={`${styles.option2} col-6`}>
//               <FcEmptyTrash />
//             </button>
//           </div>
//         )}
//       </button>

//       <br />
//       <div /*className={styles.msgTime}*/>
//         {props.chat.hr + " :" + props.chat.min}
//       </div>
//     </>
//   );
// }

// export default MsgButton;
import { useState } from "react";
import styles from "./MsgButton.module.css";
import { FcEmptyTrash } from "react-icons/fc";
import { FcRedo } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import { BiLaugh } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faFaceGrinTears,
  faThumbsUp,
  faFaceSadTear,
  faHandsClapping,
} from "@fortawesome/free-solid-svg-icons";

function MsgButton(props) {
  let [showButtons, setShowButtons] = useState(false);

  return (
    <div
      className="position-relative"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <button className="btn btn-info" style={{ borderRadius: "20px" }}>
        {props.chat.content}

        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-light">
          {props.chat.reaction == 1 && (
            <FontAwesomeIcon
              icon={faHeart}
              beat
              style={{ color: "#fd1d0d" }}
              size="xl"
            />
          )}
          {props.chat.reaction == 2 && (
            <FontAwesomeIcon
              icon={faFaceGrinTears}
              beat
              style={{ color: "#f0244c" }}
              size="xl"
            />
          )}
          {props.chat.reaction == 3 && (
            <FontAwesomeIcon
              icon={faThumbsUp}
              bounce
              style={{ color: "#01f94b" }}
              size="xl"
            />
          )}
          {props.chat.reaction == 4 && (
            <FontAwesomeIcon
              icon={faFaceSadTear}
              size="xl"
              style={{ color: "#0992fb" }}
            />
          )}
          {props.chat.reaction == 5 && (
            <FontAwesomeIcon
              icon={faHandsClapping}
              style={{ color: "#a105f5" }}
              size="xl"
            />
          )}
        </span>
      </button>

      {showButtons && (
        <div
          className={`position-absolute row ${styles.buttonContainer}`}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            left: "100%",
          }}
        >
          <button className={`${styles.option1} col-6`}>
            <FcRedo />
          </button>
          <button
            className={`${styles.option2} col-6`}
            id={props.chat.id}
            onClick={(e) => props.deleteMessage(e.currentTarget.id)}
          >
            <FcEmptyTrash
              id={props.chat.id}
              onClick={(e) => props.deleteMessage(e.currentTarget.id)}
            />
          </button>

          <button className={`${styles.option1} `}>
            <FontAwesomeIcon
              icon={faHeart}
              beat
              style={{ color: "#fd1d0d" }}
              size="xl"
              onClick={(e) => props.setReaction(props.chat.id, 1)}
            />
          </button>

          <button className={`${styles.option1} `}>
            <FontAwesomeIcon
              icon={faFaceGrinTears}
              beat
              style={{ color: "#f0244c" }}
              size="xl"
              onClick={(e) => props.setReaction(props.chat.id, 2)}
            />
          </button>

          <button className={`${styles.option1} `}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              bounce
              style={{ color: "#01f94b" }}
              size="xl"
              onClick={(e) => props.setReaction(props.chat.id, 3)}
            />
          </button>

          <button className={`${styles.option1} `}>
            <FontAwesomeIcon
              icon={faFaceSadTear}
              size="xl"
              style={{ color: "#0992fb" }}
              onClick={(e) => props.setReaction(props.chat.id, 4)}
            />
          </button>

          <button className={`${styles.option1} `}>
            <FontAwesomeIcon
              icon={faHandsClapping}
              style={{ color: "#a105f5" }}
              size="xl"
              onClick={(e) => props.setReaction(props.chat.id, 5)}
            />
          </button>
        </div>
      )}

      <div /*className={styles.msgTime}*/>
        {props.chat.hr + " :" + props.chat.min}
      </div>
    </div>
  );
}

export default MsgButton;

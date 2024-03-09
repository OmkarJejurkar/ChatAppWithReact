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
          <button className={`${styles.option2} col-6`}>
            <FcEmptyTrash />
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

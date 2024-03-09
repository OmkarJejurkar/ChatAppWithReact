import styles from "./SideBar.module.css";
import { FcApproval } from "react-icons/fc";
function SideBar(props) {
  return (
    <div className={styles.sideBar}>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light"
        style={{ width: "280px", height: "704px" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-4">
            {props.loginState}
            <FcApproval />
          </span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a
              href="#"
              className={
                props.menu == "profile" ? "nav-link active" : "nav-link"
              }
              onClick={(e) => props.setMenu("profile")}
              aria-current="page"
            >
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref=""></use>
              </svg>
              profile
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => props.setMenu("message")}
              className={
                props.menu == "message" ? "nav-link active" : "nav-link"
              }
            >
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg>
              message
            </a>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
}

export default SideBar;

import styles from "./LoginError.module.css";

function LoginError() {
  return (
    <div
      className={`alert alert-danger ${styles.msg}`}
      role="alert"
      style={{ padding: "0px" }}
    >
      Invalid username or password !!!
    </div>
  );
}

export default LoginError;

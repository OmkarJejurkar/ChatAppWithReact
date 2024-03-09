import styles from "./SignUpError.module.css";
function SignUpError() {
  return (
    <div className={styles.container}>
      <div class="alert alert-danger" role="alert">
        Registration failed ! some error occured May be user name not available
      </div>
    </div>
  );
}

export default SignUpError;

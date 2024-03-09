import styles from "./ProfileContent.module.css";

function ProfileContent() {
  return (
    <div className={styles.container}>
      <div class={`card ${styles.myCard}`}>
        <div class="card-body">
          <p class="card-text">
            <form>
              <label>UserName : </label>
              <input type="text" value="omkar" />
              <br />

              <label>email : </label>
              <br />
              <input type="text" value="omkar" />

              <label>password : </label>
              <br />
              <input type="password" value="omkar" />
            </form>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;

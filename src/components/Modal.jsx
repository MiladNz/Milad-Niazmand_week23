import styles from "./Modal.module.css";
function Modal({ confirmHandler, cancelHandler }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <img src="/Close.png" alt="close icon" />
        <p>آیا از حذف این محصول مطمئن هستید ؟</p>
        <div className={styles.btns}>
          <button onClick={confirmHandler}>حذف</button>
          <button onClick={cancelHandler}>لغو</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

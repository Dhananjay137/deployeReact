import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.lineP}>Loading...</p>
    </div>
  ); 
}
export default Loading
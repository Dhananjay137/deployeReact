import { useNavigate } from "react-router-dom"
import styles from "./OrderEmpty.module.css"

const OrderEmpty = () => {

  const navigate = useNavigate()

  const handleOnButton = () => {
    navigate("/")
  }
  return <>
    <div className={styles.box}>
  <h2>You have no orders yet. Start shopping and place your first order!</h2>
  <button className={styles.orderBtn} onClick={handleOnButton}>View Products</button>
  </div>
  </>
}
export default OrderEmpty
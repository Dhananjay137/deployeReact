import { useNavigate } from "react-router-dom";
import styles from "./CartEmpty.module.css"
const CartEmpty = () => {
  const navigate = useNavigate()
  const handleOnButton = () => {
    navigate("/")
  }
  return <>
  <div className={styles.box}>
  <h2>Your Cart is empty. Start shopping now!</h2>
  <button className={styles.cartBtn} onClick={handleOnButton}>Shop Now</button>
  </div>
  
  </>
}
export default CartEmpty;
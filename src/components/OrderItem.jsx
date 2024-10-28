import { useSelector } from "react-redux";
import { IoLocationSharp } from "react-icons/io5";

const OrderItem = ({order}) => {
  const {userDetails}=useSelector(state => state.customer)
  return <>
      <div className="item-card">
      <img
        src={order.imagePath}
        alt="image"
        className="item-image"
      />
      <p>Name: {order.productName}</p>
      <p>Prize: ${order.amount}</p>
      <p>Ordered Quantity: {order.quantity}</p>
      <p>Color: {order.color}</p>
      <p>Descrption: {order.description}</p>
      <p>Paid Amount: ${order.quantity * order.amount}</p>
      
      <strong style={{color: "green",marginTop: "7px"}}>Orders will be delivered within 2-3 days.</strong>
      <p style={{color: "rgb(8, 18, 43)"}}><IoLocationSharp color="rgb(8, 18, 43)"/>{userDetails.address}</p>
      </div>
  </>
}
export default OrderItem;
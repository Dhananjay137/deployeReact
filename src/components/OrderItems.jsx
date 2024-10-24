import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByUserId } from "../store/order";
import OrderItem from "./OrderItem";
import { useNavigate } from "react-router-dom";
import OrderEmpty from "./OrderEmpty";
import { fetchAction } from "../store/fetch";
import Loading from "./Loading";

const OrderItems = () => {
  const dispatch = useDispatch()
  const { orderList } = useSelector((state) => state.order);
  const {userDetails} = useSelector((state) => state.customer)
  const { isUpdating } = useSelector(state => state.fetch)
  const navigate = useNavigate()
  
  useEffect(() => { // checking 
    if(!userDetails){
      navigate("/login")
    }
    else{
      dispatch(fetchAction.setUpdating(true))
      dispatch(getAllOrderByUserId(userDetails.userId))
      .finally(() => {
        dispatch(fetchAction.setUpdating(false))
      })
      
    }
  },[])
  return (<>
  {isUpdating ? <Loading/> : 
  <>
  {orderList.length === 0 ? (
    <OrderEmpty/>
  ) : (
    <div className="item-list">
      {orderList.map((order) => (
        <OrderItem key={order.orderId} order={order} />
      ))}
    </div>
  )}
</>}
    
    </>
  );
};
export default OrderItems;
